import { useState } from "react";
import type { Category } from "../type";

interface TaskInputProps {
  onAdd: (text: string, category: Category, dueDate?: Date) => void;
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("today");
  const [dueDate, setDueDate] = useState<Date>();

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim(), category, dueDate);
    setText("");
    setDueDate(undefined);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <input
        type="text"
        placeholder="Write a task... e.g., 'Finish project'"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
      />

   <div className="relative w-52">
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value as Category)}
    className="
      w-full
      px-4 py-2
      rounded-3xl
      bg-white/90
      border border-gray-300
      text-gray-900 font-medium
      shadow-md
      focus:outline-none focus:ring-2 focus:ring-pink-400
      hover:bg-white
      transition-all
      cursor-pointer
      appearance-none
    "
  >
    <option value="today" className="bg-white text-gray-900">Today</option>
    <option value="tomorrow" className="bg-white text-gray-900">Tomorrow</option>
    <option value="upcoming" className="bg-white text-gray-900">Upcoming</option>
  </select>


  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

      {category === "upcoming" && (
        <input
          type="date"
          value={dueDate ? dueDate.toISOString().substring(0, 10) : ""}
          onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : undefined)}
          className="px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
        />
      )}

      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 rounded-xl bg-linear-to-r from-pink-400 to-rose-500 text-white font-semibold shadow-md hover:opacity-90 transition"
      >
        Add
      </button>
    </div>
  );
}
