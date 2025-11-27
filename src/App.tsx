import TaskInput from "./components/TaskInput";
import TaskSection from "./components/TaskSection";
import useTasks from "./hooks/useTasks";
import type { Category } from "./type";
import { useMemo } from "react";

const CATEGORY_META: Record<Category, { id: Category; title: string; subtitle: string; gradient: string }> = {
  today: { id: "today", title: "Today", subtitle: "Hot and now", gradient: "from-pink-400 to-rose-500" },
  tomorrow: { id: "tomorrow", title: "Tomorrow", subtitle: "Plan ahead", gradient: "from-sky-400 to-amber-300" },
  upcoming: { id: "upcoming", title: "Upcoming", subtitle: "Future tasks", gradient: "from-violet-400 to-indigo-500" },
  completed: { id: "completed", title: "Completed", subtitle: "Nice work ✅", gradient: "from-green-400 to-emerald-500" },
};

export default function App() {
  const { tasks, add, update, remove, moveToCategory } = useTasks();

  const grouped = useMemo(() => ({
    today: tasks.filter(t => t.category === "today" && !t.completed),
    tomorrow: tasks.filter(t => t.category === "tomorrow" && !t.completed),
    upcoming: tasks
      .filter(t => t.category === "upcoming" && !t.completed)
      .sort((a, b) => (a.dueDate && b.dueDate ? a.dueDate.getTime() - b.dueDate.getTime() : 0)),
    completed: tasks.filter(t => t.completed),
  }), [tasks]);

  return (
    <div className="relative min-h-screen p-6 sm:p-12 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text leading-tight">
            ToDo Tasks
          </h1>
        </header>

        <div className="card-glass rounded-2xl p-5 shadow-soft-glow mb-6">
          <TaskInput
            onAdd={(text, category, dueDate) => add(text, category, dueDate)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TaskSection
              meta={CATEGORY_META.completed}
              tasks={grouped.completed}
              onToggle={(id, completed) => update(id, { completed })}
              onDelete={remove}
              onChangeCategory={moveToCategory}
            />
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TaskSection
              meta={CATEGORY_META.today}
              tasks={grouped.today}
              onToggle={(id, completed) => update(id, { completed })}
              onDelete={remove}
              onChangeCategory={moveToCategory}
            />
            <TaskSection
              meta={CATEGORY_META.tomorrow}
              tasks={grouped.tomorrow}
              onToggle={(id, completed) => update(id, { completed })}
              onDelete={remove}
              onChangeCategory={moveToCategory}
            />
            <TaskSection
              meta={CATEGORY_META.upcoming}
              tasks={grouped.upcoming}
              onToggle={(id, completed) => update(id, { completed })}
              onDelete={remove}
              onChangeCategory={moveToCategory}
            />
          </div>
        </div>

        <footer className="mt-10 text-center text-sm text-slate-500">
          Tasks persist locally until you clear site data.
        </footer>
      </div>
    </div>
  );
}
