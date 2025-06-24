
# 📝 Task Board - Lightweight Project Management Tool

A sleek, minimal, Trello-inspired task management board built with **Nextjs**, **Zustand**, **React DnD**, and **Tailwind CSS**. Supports drag-and-drop functionality, task editing, and persistent state — all in a smooth dark UI.

## 🚀 Features

- 🔁 **Multi-column Layout** — Includes customizable task columns like `Backlog`, `In Progress`, `Review`, `Done`, etc.
- 🎯 **Task Creation & Editing** — Add or edit tasks using a form with validation (Yup + React Hook Form).
- ✏️ **Inline Controls** — Mini task cards with dropdown menu for editing or deleting.
- 📦 **Persistent State** — Uses Zustand + middleware to persist tasks via `localStorage`.
- 🧲 **Drag & Drop** — Move tasks between columns using `react-dnd`.
- 💅 **Dark Mode UI** — Styled with Tailwind CSS for a clean and accessible interface.

## 🧰 Tech Stack

- **Nextjs** with functional components
- **Zustand** (with `persist` middleware)
- **React DnD** (`react-dnd-html5-backend`)
- **React Hook Form** + **Yup**
- **Tailwind CSS**
- **TypeScript**

## 📂 Project Structure

```


├── layout/
│   ├── task.tsx     # Drop target for columns
│   ├── card.tsx       # Individual draggable task card
│   ├── form.tsx       # Controlled form for adding/editing tasks
│   └── ...
├── helpers/
│   └── store.ts           # Zustand store (persisted)
│   └── validation.ts      # Yup schema + types


````

## 📦 Getting Started

```bash
# 1. Clone the repository
git clone 
cd task-management

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
````

## ✨ Planned Improvements

* ✅ Reordering tasks within the same column
* 🔁 Sync with a backend (Supabase)
* 🔔 Toast notifications (e.g., task added, edited, deleted)
* 🌈 Theme toggle (light/dark)

## 📸 Demo Preview

> Coming soon — GIF or video walkthrough

## 🙌 Credits

* Inspired by [Frontend Task]([https://lucide.dev/](https://task-mgt-phi.vercel.app/))
* Icons from [Lucide](https://lucide.dev/)
* Styling via [Tailwind CSS](https://tailwindcss.com/)

# task-manager
