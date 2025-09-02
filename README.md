# 📝 React Todo App

A modern, minimal, and responsive **Todo List application** built with React, TypeScript, and TailwindCSS.  
The app supports task management with **undo/redo functionality**, light/dark theme toggle, and persistent storage via `localStorage`.

---

## 🚀 Features

- ✅ Add, edit, complete, and delete todos
- 🔄 Undo & redo actions (Ctrl+Z / Ctrl+Y support)
- 🌗 Light/Dark mode toggle (saved to local storage)
- 📊 Progress bar showing completion rate
- 🎯 Keyboard shortcuts for fast productivity
- 💾 Data persistence using `localStorage`
- 📱 Fully responsive UI with TailwindCSS

---

## 🛠️ Tech Stack

- **React + TypeScript** – Component-based UI
- **TailwindCSS** – Utility-first styling
- **React Icons** – Beautiful icons
- **Tippy.js** – Tooltips for better UX
- **UUID** – Unique IDs for todos

---

## 📂 Project Structure

```plaintext
src/
├── App.tsx # Main application UI
├── components/
│ └── icon-btn.tsx  # Reusable IconButton with tooltip
├── hooks/
│ ├── use-input.tsx # Custom hook for input handling
│ └── use-todo.tsx # Custom hook for todo state + undo/redo logic
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vumnhg/crud-todo-list.git
cd crud-todo-list
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 🎮 Usage

- Add Todo: Type in the input field and press Enter or click ➕

- Edit Todo: Click ✏️ (only if not completed)

- Complete Todo: Click ✅

- Remove Todo: Click 🗑️

- Undo: Ctrl+Z or click ↩️

- Redo: Ctrl+Y or click ↪️

- Clear Completed: Click 🧽

- Toggle Theme: Click 🌞/🌙

### 📜 License

- This project is licensed under the MIT License.
- You are free to use, modify, and distribute it for personal or commercial projects.
