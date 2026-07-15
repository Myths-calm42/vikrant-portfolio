export const categoryLabels = {
  "genai": "Generative AI",
  "medical-ai": "Medical AI / Computer Vision",
  "data-analytics": "Data Analytics",
  "web-dev": "Web Development",
};

// PLACEHOLDER CONTENT — replace summaries/links with your real details.
export const projects = [
  {
    slug: "mistral-story-lora",
    title: "QLoRA Fine-Tuning of Mistral-7B for Story Continuation",
    category: "genai",
    summary:
      "Fine-tuned Mistral-7B-Instruct-v0.3 on WritingPrompts using QLoRA, published as an open model and reusable training pipeline.",
    stack: ["PyTorch", "PEFT/QLoRA", "Hugging Face", "Mistral-7B"],
    github: "https://github.com/Myths-calm42/QLoRA-Finetune-Story-continuation-llm",
    demoOnRequest: true,
    featured: true,
  },
  {
    slug: "storygenai",
    title: "StoryGenAI — Long-Context Story Continuation (RAG)",
    category: "genai",
    summary:
      "Modular RAG pipeline for long-form story continuation: FAISS retrieval, BGE embeddings, Qwen2.5-7B-Instruct generation, Streamlit UI.",
    stack: ["RAG", "FAISS", "BAAI/bge-small-en-v1.5", "Qwen2.5-7B", "Streamlit"],
    featured: true,
    github:"https://github.com/Myths-calm42/StoryGen-RAG",
    demoOnRequest: true,
    
  },
  {
    slug: "busi-breast-ultrasound",
    title: "BUSI Breast Ultrasound Classification (MoE)",
    category: "medical-ai",
    summary:
      "Mixture-of-Experts architecture combining CNN branches and transfer learning for breast ultrasound image classification, part of ANRF/DST-funded research.",
    stack: ["TensorFlow/PyTorch", "MoE", "Transfer Learning", "Medical Imaging", "Hybrid Architechture"],
    featured: true,
  },
  {
    slug: "lung-cancer-detection",
    title: "Lung Cancer Classification Using Transfer-Learning",
    category: "medical-ai",
    summary:
      "Designed a lung cancer detection system using CT scan images, integrating image preprocessing, transfer learning, hybrid CNN architectures, and performance evaluation for accurate classification of Normal, Benign, and Malignant cases",
    stack: ["TensorFlow", "OpenCV", "CLAHE", "GLCM", "Transfer Learning", "CNN", "Grad-CAM"],
    github:"https://github.com/Myths-calm42/Lung-Cancer-Classification-Using-Transfer-Learning",
  },
  
  {
    slug: "stock-market-prediction",
    title: "Stock Market Prediction Dashboard",
    category: "data-analytics",
    summary:
      "LSTM-based time-series forecasting with an interactive analytics dashboard for stock price trends.",
    stack: ["LSTM", "Python", "Pandas", "Dashboarding"],
  },
  
  {
    slug: "placement-portal",
    title: "Training & Placement Portal",
    category: "web-dev",
    summary:
      "React-based placement portal for managing student and recruiter workflows, deployed on Vercel.",
    stack: ["React", "Vercel"],
    live: "https://tpc-cse-aus.vercel.app/",
    featured: true,
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio Website (this site)",
    category: "web-dev",
    summary:
      "Next.js + Tailwind CSS v4 portfolio with a research-engineer-style information architecture.",
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4"],
    github: "https://github.com/Myths-calm42/vikrant-portfolio",
  },
   {
    slug: "CPU-Simulator",
    title: "Multicore SMP CPU Scheduling Simulator",
    category: "other",
    summary:
      "Simulation of Multicore Symmetric Multiprocessing (SMP) CPU Scheduling algorithms.",
    stack: ["C++", "FCFS", "SJF", "Priority Scheduling", "Round Robin"],
    github: "https://github.com/Myths-calm42/Multicore-SMP-CPU-Scheduling",
  },
];
