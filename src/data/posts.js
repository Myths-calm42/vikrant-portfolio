// Body blocks: { type: "h2" | "p" | "quote", text }
// Inline markdown supported in text: **bold**, `code`, [link text](url)

export const posts = [
  {
    slug: "qlora-mistral-finetuning",
    title: "What I Learned Fine-Tuning Mistral-7B with QLoRA",
    date: "May 2026 - June 2026",
    excerpt:
      "Rank-16 adapters, 0.19% of parameters trained, perplexity dropped 44% — what actually mattered was the prompt template surviving into inference.",
    body: [
      { type: "p", text: "Full fine-tuning a 7-billion parameter model isn't something you do on a single consumer or lab-shared GPU — the optimizer states alone won't fit. QLoRA is what makes it possible: quantize the base model to 4-bit, freeze it, and train small low-rank adapter matrices on top. You get most of the benefit of fine-tuning at a fraction of the memory cost. I used this approach to adapt Mistral-7B-Instruct for long-form story continuation, and a few things stood out along the way." },

      { type: "h2", text: "Why story continuation, and why QLoRA" },
      { type: "p", text: "Base instruction-tuned models are good at following commands but tend to wrap up narrative text quickly — they default to conclusions rather than continuing a scene. I wanted a model that could pick up an existing story fragment and extend it in a consistent voice and pacing, which meant training on narrative text specifically rather than instruction-response pairs." },
      { type: "p", text: "QLoRA was the practical choice: it let me fine-tune Mistral-7B on a single RTX A4000 (16GB VRAM) without needing multi-GPU infrastructure, and because only the adapter weights are trained, the resulting artifact is small enough to publish and reuse independently of the base model." },

      { type: "h2", text: "Setup" },
      { type: "p", text: "I trained on [WritingPrompts](https://huggingface.co/datasets/euclaise/writingprompts), sampling and cleaning ~2,850 training examples and 150 validation examples from the full corpus, capped at 3,000 examples with stories truncated to 400 words during preprocessing." },
      { type: "p", text: "For the LoRA configuration: rank 16, alpha 32, targeting the attention projections (`q_proj`, `k_proj`, `v_proj`, `o_proj`) with 0.05 dropout, on top of a 4-bit NF4-quantized base model. That works out to roughly 13.6M trainable parameters — about **0.19%** of the model's 7.26B total. Training ran for 2 epochs (714 steps) and took 1 hour 29 minutes on the A4000." },

      { type: "h2", text: "What actually mattered in practice" },
      { type: "p", text: "**Quantization plus adapters, not either alone.** Loading the base model in 4-bit (via bitsandbytes) cuts memory enough that training becomes feasible on a single GPU. The LoRA adapters then get the actual gradient updates — you're not backpropagating through the frozen 4-bit weights in the traditional sense, which is the whole trick." },
      { type: "p", text: "**The prompt template becomes load-bearing.** This was the most instructive failure of the whole project. After merging the adapter into the base weights, I tested the model with a bare prompt — no `### Instruction:` / `### Prompt:` / `### Story:` structure — and generation degenerated into repeated `###` tokens instead of producing text. The model had learned that template as a structural signal so strongly during training that leaving it out effectively confused the model about what task it was doing. The fix was straightforward once diagnosed: always wrap inference prompts in the exact template used during training." },
      { type: "p", text: "**Data artifacts survive fine-tuning.** WritingPrompts uses Penn Treebank-style quotation marks (backtick-backtick / single-quote-single-quote instead of standard double quotes), and the fine-tuned model faithfully reproduced that formatting quirk in its own output. Not a bug exactly, but a reminder that whatever's odd about your training data will show up in generation — worth documenting as a known limitation rather than silently patching over it." },

      { type: "h2", text: "Results" },
      { type: "p", text: "Perplexity on the validation set dropped from **15.19 (base model)** to **8.47 (fine-tuned)** — a ~44% reduction. Qualitatively, the difference is easy to see. Given the prompt \"The last human on Earth received a knock on the door,\" the base model produced a generic, loosely-connected continuation. The fine-tuned model (temperature 0.7) stayed in scene and voice:" },
      { type: "quote", text: "The last man on earth sat alone in his living room. He had watched as all of his neighbors left and disappeared, leaving him behind. The only sound was that of the wind, which seemed to grow louder each day... Startled, he jumped from his chair and went to see who it might be. It took everything within him not to cry out when he saw her standing there. She was young, and beautiful... 'Who are you?' He asked. 'I am your wife.'" },

      { type: "h2", text: "What I'd tell someone starting this" },
      { type: "p", text: "Get one training run through to completion early, even with a small subset of data, before tuning anything. It's easy to spend a long time adjusting settings for a run that has a basic bug in the data pipeline. And once training is done, don't assume the merged model behaves like a normal instruct model at inference time — verify the prompt format transferred correctly before drawing any conclusions about quality." },
      { type: "p", text: "The adapter and training pipeline are on [Hugging Face](https://huggingface.co/Mythscalm42/mistral-story-lora) and [GitHub](https://github.com/Myths-calm42/QLoRA-Finetune-Story-continuation-llm) if you want to look at the actual configuration." },
    ],
  },
  {
    slug: "storygenai-rag-pipeline",
    title: "Building a RAG Pipeline for Long-Context Story Continuation",
    date: "May 2026 - July 2026",
    excerpt:
      "Why StoryGenAI treats a story as its own retrieval corpus instead of leaning on context length, and what 'memory' honestly does and doesn't mean here.",
    body: [
      { type: "p", text: "My QLoRA project showed one way to adapt an LLM for story continuation — by changing the model's weights. StoryGenAI takes the opposite approach: keep an off-the-shelf instruct model completely frozen, and instead give it the right context at the right time, retrieved from the story itself. Same underlying goal — generate a coherent next chapter — solved with a different technique. I wanted both projects to exist side by side deliberately, since fine-tuning and RAG are the two core levers Gen AI work actually reaches for, and I'd rather demonstrate real fluency in both than depth in only one." },

      { type: "h2", text: "The problem with just relying on context length" },
      { type: "p", text: "A long story — many chapters in — has more established characters, locations, and plot threads than fits comfortably in a prompt, and even when it technically fits, models don't attend to everything in a long context equally well. StoryGenAI's answer is to not depend on the raw context window at all. Instead, it treats the story itself as a small retrieval corpus, plus a separate, explicit memory of what's happened so far." },

      { type: "h2", text: "How it works" },
      { type: "p", text: "The pipeline is a straightforward RAG setup with one addition. Given an uploaded story (TXT or PDF), it gets chunked into overlapping, paragraph-respecting segments, embedded with `BAAI/bge-small-en-v1.5`, and indexed in a FAISS vector store. When you ask for the next chapter, the system retrieves the most relevant prior chunks by semantic similarity to the instruction, then assembles a prompt out of four pieces: a system prompt, a running story summary, tracked memory (characters, locations, objects, relationships, events), and the retrieved passages. An instruct model — Qwen2.5-7B or Mistral-7B, selectable from a dropdown — generates the chapter from that." },
      { type: "p", text: "The addition is what happens after generation: a second LLM call reads the newly generated chapter and extracts what changed — new or updated characters, locations, objects, events — and updates the running summary, in a single pass. That updated memory feeds into the next chapter's prompt. It's what keeps a character's established relationship or a location's earlier description from getting lost or contradicted three chapters later, in a way that retrieval over raw text alone wouldn't guarantee." },

      { type: "h2", text: "Being honest about what \"memory\" means here" },
      { type: "p", text: "I want to be specific about this because it's easy to oversell: the memory module is an LLM-based extraction pipeline, not a knowledge graph or a formal NER system. It works well at portfolio scale — tracking a reasonable number of characters and events across a handful of chapters — but it doesn't do validation, deduplication, or conflict resolution the way a production system would need to. Calling it a **lightweight persistent memory store** rather than a knowledge graph is the more accurate description, and it's the one I use." },
      { type: "p", text: "Similarly, the Character Cards and Story Timeline views in the UI aren't separate backend features — they're just two different renderings of the same memory data the extraction pass already produces. No fine-tuning happens anywhere in this project; every improvement in output quality comes from retrieval and prompt construction alone, which is the point of contrast with the QLoRA project." },

      { type: "h2", text: "Evaluating something that resists a single number" },
      { type: "p", text: "RAG consistency is hard to reduce to one metric the way perplexity works for language modeling. Rather than force a number, the evaluation tab runs the same generation instruction with and without retrieval, side by side, so the difference is something you read and judge directly rather than something a score claims to capture. It's a qualitative approach, and I think that's the honest one for what this is actually measuring." },

      { type: "h2", text: "Deployment reality" },
      { type: "p", text: "The live demo runs via Google Colab with a free T4 GPU, tunneled out with pyngrok — which means the link is session-based, not permanently live. A 7B model with 4-bit quantization needs CUDA, which rules out free CPU-only hosting tiers, and the GPU-backed free tiers (like Hugging Face Spaces' ZeroGPU) require a paid plan to hold a model persistently. The honest fix, which I haven't built yet, is re-architecting the generator around a smaller GGUF-quantized model via `llama-cpp-python`, which could run on a free CPU tier. That's on the list, not done — I'd rather say so than imply this is deployed when it isn't." },

      { type: "h2", text: "A few things I'd pass on to anyone building something similar" },
      { type: "p", text: "Missing `bitsandbytes` or a CPU-only PyTorch build fails silently or falls back to CPU rather than raising an obvious error — worth checking `torch.cuda.is_available()` before debugging anything else. Streamlit's dev-mode file watcher will also scan unrelated submodules inside `transformers` and print harmless `torchvision` warnings that have nothing to do with your actual code. And more than once, an import error I was chasing turned out to be a file that saved as empty during an editor paste — worth ruling out before assuming the bug is in the logic." },
      { type: "p", text: "Code, architecture notes, and the sample story used for testing are on [GitHub](https://github.com/Myths-calm42/StoryGenAI) if you want to see the actual implementation." },
    ],
  },
];
