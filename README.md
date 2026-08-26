# 🚀 Kavy Joshi — Developer Portfolio

> **A modern, interactive, and high-performance developer portfolio built with React, Three.js, Framer Motion, and Tailwind CSS.**  
> Showcasing Full-Stack Web Development, AI/ML Engineering projects, technical skills, and open-source contributions.

---

## 🌟 Live Demo

🔗 **Live Website**: [portfolio-three-pi-uiemppdnl3.vercel.app](https://portfolio-three-pi-uiemppdnl3.vercel.app)  
👤 **GitHub Profile**: [@Mr-joshi-24](https://github.com/Mr-joshi-24)

---

## ✨ Features & Highlights

- 🎨 **Sleek Cyberpunk/Midnight Theme**: Modern glassmorphism UI, custom glow effects, smooth gradients, and custom cursor animations.
- 🌌 **3D Canvas & Particle Effects**: Interactive background powered by `@react-three/fiber` and `@react-three/drei`.
- ⚡ **Lightning Fast Performance**: Built using **Vite** and optimized assets for rapid initial load times and high FPS transitions.
- 📱 **Fully Responsive Layout**: Seamless experience across mobile, tablet, and desktop viewports.
- 🎯 **Command Palette (`Ctrl + K` / `Cmd + K`)**: Quick keyboard navigation between sections, projects, and external links.
- 📊 **Real-time GitHub & LeetCode Stats**: Dynamic API fetching for GitHub contributions, language breakdowns, and repository activity.
- 💬 **Interactive Contact Form**: Integrated with `@emailjs/browser` for instant message delivery directly to inbox.
- 📄 **Resume Download Integration**: Direct access to PDF resume downloads from Hero, About, and Contact sections.

---

## 🛠️ Tech Stack

### **Frontend & UI**
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS, Vanilla CSS Design System
- **Animations**: Framer Motion, GSAP, Lenis (Smooth Scroll)
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **State Management**: Zustand
- **Icons**: React Icons (Feather Icons)

### **Integrations & Services**
- **Email Service**: EmailJS
- **Hosting & Deployment**: Vercel

---

## 📁 Featured Projects Showcase

### 1. 🎓 **EduTrack AI** — *AI-Powered Student Analytics & College Management*
- **Description**: Machine Learning-powered platform for performance prediction, student risk detection, attendance management, and academic analytics.
- **Tech**: React, FastAPI, SQLite, Python, Scikit-Learn, Pandas, Tailwind CSS
- **Links**: [GitHub Repo](https://github.com/Mr-joshi-24/Edutrack-AI) | [Live Demo](https://edutrack-ai-pink.vercel.app)

---

### 2. 🎙️ **SpeechSense AI** — *Full-Stack Speech Emotion Recognition Platform*
- **Description**: Enterprise-grade speech emotion classification system using a Time-Distributed CNN + LSTM model. Classifies audio into 7 emotional categories with native browser recording and real-time probability dashboards.
- **Tech**: React 18, Node.js, Express, MongoDB, Python, Flask, TensorFlow, Librosa
- **Links**: [GitHub Repo](https://github.com/Mr-joshi-24/SpeechSense-AI) | [Live Demo](https://speech-sense-ai.vercel.app)

---

### 3. ⚡ **Trackly** — *MERN Stack Productivity & Job CRM Suite*
- **Description**: Production-grade productivity suite for daily habit tracking with visual consistency grids, project task management, and job application CRM pipeline tracking.
- **Tech**: React 18, Node.js, Express.js, MongoDB, Mongoose, Vite
- **Links**: [GitHub Repo](https://github.com/Mr-joshi-24/Trackly)

---

### 4. 🏛️ **College Management System** — *Java Swing Desktop App*
- **Description**: Desktop application built with Java Swing, JDBC, and MySQL/MariaDB for managing student academic records, marks, and enrollments.
- **Tech**: Java, Java Swing, JDBC, MySQL
- **Links**: [GitHub Repo](https://github.com/Mr-joshi-24/-college-management-system-java)

---

### 5. 🎯 **Job Scout AI** — *AI Job Search & Career Scout*
- **Description**: AI-driven career scout platform that analyzes job postings, matches resume profiles, identifies skill gaps, and recommends tech opportunities.
- **Tech**: React, FastAPI, Python, NLP, Machine Learning
- **Links**: [GitHub Repo](https://github.com/Mr-joshi-24/JobScout-AI)

---

## 📂 Project Structure

```
portfolio/
├── public/
│   ├── Kavy_Joshi_Resume.pdf
│   ├── edutrack-preview1.png
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── 3d/           # Three.js Canvas & Particle components
│   │   ├── layout/       # Navbar, Footer
│   │   └── ui/           # GlassCard, Button, CommandPalette, CustomCursor, ScrollReveal
│   ├── data/
│   │   ├── projects.js   # Project definitions & metadata
│   │   ├── socialLinks.js# Social media links
│   │   └── stats.js      # GitHub & LeetCode statistics fallback & configuration
│   ├── hooks/
│   │   ├── useGitHubStats.js   # Custom hook fetching GitHub REST API
│   │   └── useMousePosition.js # Mouse tracker for cursor effects
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── FeaturedProject.jsx
│   │   ├── Projects.jsx
│   │   ├── GitHub.jsx
│   │   └── Contact.jsx
│   ├── store/
│   │   └── useStore.js   # Zustand global UI state
│   ├── styles/
│   │   └── index.css     # Global styles & design system tokens
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🛠️ Local Development & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mr-joshi-24/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 📬 Contact & Connect

- **Email**: [joshikavy35@gmail.com](mailto:joshikavy35@gmail.com)
- **LinkedIn**: [linkedin.com/in/kavy-joshi-352220317](https://linkedin.com/in/kavy-joshi-352220317)
- **GitHub**: [@Mr-joshi-24](https://github.com/Mr-joshi-24)
- **LeetCode**: [joshi_kavy](https://leetcode.com/u/joshi_kavy/)

---

⭐ **If you like this project, feel free to give it a star on [GitHub](https://github.com/Mr-joshi-24/portfolio)!**
