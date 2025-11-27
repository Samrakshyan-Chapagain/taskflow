import { useState } from "react";
import type { Task, Category } from "../type";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const add = (text: string, category: Category, dueDate?: Date) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      category,
      completed: category === "completed",
      createdAt: Date.now(),
      dueDate,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const update = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const remove = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveToCategory = (id: string, category: Category, dueDate?: Date) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              category,
              completed: category === "completed" ? true : t.completed,
              dueDate: category === "upcoming" ? dueDate : t.dueDate,
            }
          : t
      )
    );
  };

  return { tasks, add, update, remove, moveToCategory };
}
