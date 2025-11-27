import { useState } from "react";
import { motion } from "framer-motion";
import type { Task, Category } from "../type";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onChangeCategory: (category: Category, dueDate?: Date) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onChangeCategory }: TaskItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempDue, setTempDue] = useState<Date | undefined>();

  const CATEGORIES: Category[] = ["today", "tomorrow", "upcoming", "completed"];

  const handleMove = (cat: Category) => {
    if (cat === "upcoming") {
      setShowCalendar(true);
    } else {
      onChangeCategory(cat);
      setShowCalendar(false);
    }
    setShowMenu(false);
  };

  const handleCalendarConfirm = () => {
    onChangeCategory("upcoming", tempDue);
    setShowCalendar(false);
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between gap-3 p-3 rounded-xl shadow-sm border border-white/30 relative"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
        <button
          onClick={onToggle}
          className={`w-9 h-9 flex items-center justify-center rounded-lg border-2 ${
            task.completed ? "bg-white text-green-600 border-green-300" : "bg-white/40 border-white/30"
          } transition`}
        >
          {task.completed ? "✓" : ""}
        </button>

        <div className="flex flex-col">
          <div className={`${task.completed ? "line-through text-slate-400" : "text-slate-900 font-medium"} text-sm`}>
            {task.text}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Created: {new Date(task.createdAt).toLocaleString()}
          </div>
          {task.dueDate && (
            <div className="text-xs text-indigo-500 mt-0.5">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        <button
          onClick={() => setShowMenu((s) => !s)}
          className="px-2 py-1 rounded-lg border border-white/20 bg-white/60 text-xs"
        >
          Move
        </button>

        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg p-2 z-50"
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleMove(cat)}
                className="block w-full text-left text-sm px-2 py-1 rounded hover:bg-slate-50"
              >
                {cat[0].toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>
        )}

        {showCalendar && (
          <div className="absolute top-full left-0 mt-10 p-2 bg-white rounded-xl shadow-lg z-50 ">
            <input
              type="date"
              value={tempDue ? tempDue.toISOString().substring(0, 10) : ""}
              onChange={(e) => setTempDue(e.target.value ? new Date(e.target.value) : undefined)}
              className="px-2 py-1 border rounded"
            />
            <button
              onClick={handleCalendarConfirm}
              className="ml-2 px-3 py-1 bg-pink-400 text-white rounded hover:opacity-90 transition"
            >
              Confirm
            </button>
          </div>
        )}

        <button
          onClick={onDelete}
          className="px-2 py-1 rounded-lg border border-white/20 bg-white/40 text-xs"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
