import { useState, useEffect } from "react";
import {
  FaArrowRotateLeft,
  FaArrowRotateRight,
  FaCircleCheck,
  FaCirclePlus,
  FaEllipsis,
  FaEraser,
  FaMoon,
  FaPencil,
  FaSun,
  FaTrash,
} from "react-icons/fa6";
import IconButton from "./components/icon-btn";
import useTodo, { type Todo } from "./hooks/use-todo";
import { useInput } from "./hooks/use-input";

function App() {
  const {
    todos,
    theme,
    addTodo,
    removeTodo,
    completeTodo,
    startEdit,
    finishEdit,
    clearCompleted,
    undo,
    redo,
    canUndo,
    canRedo,
    toggleTheme,
  } = useTodo();

  const input = useInput("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progress = todos.length ? (completedCount / todos.length) * 100 : 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const handleAddTodo = () => {
    if (!input.value.trim()) return;
    addTodo(input.value.trim());
    input.reset();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-theme transition-colors duration-300 ease-in-out">
        <div className="w-full max-w-md p-4 md:p-6 mx-4 shadow-lg rounded-xl bg-card">
          <div className="flex items-center justify-between my-4">
            <h3 className="text-xl md:text-2xl font-bold text-theme">
              Todo List
            </h3>
            <div className="relative flex items-center gap-1 ">
              <IconButton
                icon={FaEllipsis}
                onClick={() => setShowMenu(!showMenu)}
                className={`transition-transform duration-300 ${
                  showMenu ? "rotate-90 bg-[var(--color-hover)]" : "rotate-0"
                }`}
              />
              <div
                className={`absolute bottom-0 right-full flex items-center gap-2 overflow-hidden bg-card transition-[width] duration-300 ease-in`}
                style={{
                  width: showMenu ? "120px" : "0px",
                }}
              >
                <IconButton
                  icon={FaArrowRotateLeft}
                  onClick={() => undo()}
                  disabled={!canUndo}
                  tooltip="Undo Ctrl+Z"
                />
                <IconButton
                  icon={FaArrowRotateRight}
                  onClick={() => redo()}
                  disabled={!canRedo}
                  tooltip="Redo Ctrl+Y"
                />
                <IconButton
                  icon={FaEraser}
                  onClick={() => clearCompleted()}
                  tooltip="Remove completed tasks"
                />
              </div>
              <IconButton
                icon={theme === "dark" ? FaMoon : FaSun}
                onClick={() => toggleTheme()}
                className="mr-2"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-6 shadow-md rounded-2xl px-4 py-2 bg-card">
            <input
              type="text"
              {...input.bind}
              autoFocus
              maxLength={60}
              className="flex-1 w-full sm:w-auto focus:outline-none text-sm md:text-md bg-transparent text-theme"
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              placeholder="Type something..."
            />
            <IconButton
              icon={FaCirclePlus}
              onClick={handleAddTodo}
              className="-mr-2"
            />
          </div>
          <div
            className="mt-6 mx-auto rounded-full h-1 bg-gray-200 dark:bg-gray-700"
            style={{ width: "90%" }}
          >
            <div
              className="h-1 rounded-full progress-bar transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="w-full mt-6 md:mt-10 max-h-[340px] sm:max-h-[250px] flex justify-center overflow-x-hidden overflow-y-auto scrollbar-custom scrollbar-gutter-stable">
            <ul className="flex flex-col gap-4 w-full ">
              {todos.map((todo: Todo) => (
                <li
                  key={todo.id}
                  className="flex items-center border-b border-theme rounded-xl hover:scale-102 transition-all duration-200 ease-in-out"
                >
                  <IconButton
                    icon={FaCircleCheck}
                    onClick={() => completeTodo(todo.id)}
                    completed={todo.completed}
                  />
                  {todo.editing ? (
                    <input
                      type="text"
                      defaultValue={todo.text}
                      onBlur={(e) => finishEdit(todo.id, e.target.value.trim())}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        finishEdit(todo.id, e.currentTarget.value.trim())
                      }
                      className="flex-1 focus:outline-none bg-transparent text-theme text-sm md:text-md"
                      maxLength={60}
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`${
                        todo.completed ? "line-through" : ""
                      } flex-1 truncate text-theme text-sm md:text-md`}
                    >
                      {todo.text.length > 40
                        ? todo.text.slice(0, 40) + "..."
                        : todo.text}
                    </span>
                  )}
                  <IconButton
                    icon={FaPencil}
                    onClick={() => !todo.completed && startEdit(todo.id)}
                    disabled={todo.completed}
                  />
                  <IconButton
                    icon={FaTrash}
                    onClick={() => removeTodo(todo.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
