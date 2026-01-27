# 📖 Bible Quiz for Kids: Josiah & Jeremiah

[![Brand](https://img.shields.io/badge/Brand-KikuAI-black?style=for-the-badge)](https://kikuai.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

An immersive, interactive biblical journey designed for children, featuring premium AI-generated illustrations, multi-language support, and a "juicy" user experience.

---

## ✨ Features

- **🎨 Premium AI Illustrations**: 28 bespoke "Nano Banana" watercolor-style illustrations that bring the stories of King Josiah and Prophet Jeremiah to life.
- **🌍 Multi-language Support**: Fully localized in **Ukrainian**, **Russian**, and **English**.
- **📜 Interactive Storytelling**: A blend of educational quiz mechanics and story-driven transitions.
- **🏆 Reward Gallery**: An interactive collection screen where kids can review and download the illustrations they've "unlocked" during the game.
- **🔊 Atmospheric Sound**: Integrated background music and synthesis-driven feedback for a complete sensory experience.

## 📸 Sneak Peek

<div align="center">
  <img src="public/illustrations/intro.png" width="45%" alt="Intro Screen" />
  <img src="public/illustrations/q1.png" width="45%" alt="Josiah Coronation" />
</div>
<div align="center">
  <img src="public/illustrations/q5.png" width="45%" alt="Temple Repair" />
  <img src="public/illustrations/t14.png" width="45%" alt="Jeremiah's Vision" />
</div>

---

## 🛠️ Tech Stack

- **Core**: [Next.js 16](https://nextjs.org) (App Router), [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/) for animations.
- **Assets**: Custom AI-generated illustrations using **Nano Banana Pro**.
- **Deployment**: [GitHub Pages](https://pages.github.com).

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kiku-jw/bible-quiz-kids.git
   cd bible-quiz-kids
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Architecture

- `lib/quiz-data.ts`: Central hub for quiz content, localizations, and image mappings.
- `components/quiz/`: Heart of the application, containing `StoryScreen`, `QuestionCard`, and `CompletionScreen`.
- `public/illustrations/`: Optimized WEBP/PNG assets for high-fidelity visuals.

---

<div align="center">
  <p>Built with ❤️ by <b>KikuAI</b></p>
  <a href="https://kikuai.dev">
    <img src="https://kikuai.dev/logo.png" width="100" alt="KikuAI Logo" onerror="this.src='https://via.placeholder.com/100?text=KikuAI'"/>
  </a>
</div>
