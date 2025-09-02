import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  text: string;
  editing: boolean;
  completed: boolean;
}

interface State {
  todos: Todo[];
  past: Todo[][];
  future: Todo[][];
  theme: "light" | "dark";
}

const init = (): State => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");
  const theme = (localStorage.getItem("theme") as "light" | "dark") || "light";

  return { todos, past: [], future: [], theme };
};

type Action =
  | { type: "ADD"; payload: string }
  | { type: "REMOVE"; payload: string }
  | { type: "COMPLETE"; payload: string }
  | { type: "START_EDIT"; payload: string }
  | { type: "FINISH_EDIT"; payload: { id: string; text: string } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "TOGGLE_THEME" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv4(),
            text: action.payload,
            editing: false,
            completed: false,
          },
        ],
        past: [...state.past, state.todos],
        future: [],
      };
    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
        past: [...state.past, state.todos],
        future: [],
      };
    case "COMPLETE":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
        past: [...state.past, state.todos],
        future: [],
      };
    case "START_EDIT":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, editing: true } : t
        ),
        past: [...state.past, state.todos],
        future: [],
      };
    case "FINISH_EDIT":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id
            ? { ...t, text: action.payload.text, editing: false }
            : t
        ),
        past: [...state.past, state.todos],
        future: [],
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((t) => t.completed !== true),
        past: [...state.past, state.todos],
        future: [],
      };
    case "UNDO": {
      if (state.past.length === 0) return state;
      const prev = state.past[state.past.length - 1]; //state.past.at(-1)
      return {
        ...state,
        todos: prev,
        past: state.past.slice(0, -1),
        future: [state.todos, ...state.future],
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...state,
        todos: next,
        past: [...state.past, state.todos],
        future: state.future.slice(1),
      };
    }
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

const useTodo = () => {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  return {
    todos: state.todos,
    theme: state.theme,
    addTodo: (text: string) => dispatch({ type: "ADD", payload: text }),
    removeTodo: (id: string) => dispatch({ type: "REMOVE", payload: id }),
    completeTodo: (id: string) => dispatch({ type: "COMPLETE", payload: id }),
    startEdit: (id: string) => dispatch({ type: "START_EDIT", payload: id }),
    finishEdit: (id: string, text: string) =>
      dispatch({ type: "FINISH_EDIT", payload: { id, text } }),
    clearCompleted: () => dispatch({ type: "CLEAR_COMPLETED" }),
    undo: () => dispatch({ type: "UNDO" }),
    redo: () => dispatch({ type: "REDO" }),
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),
  };
};

export default useTodo;
