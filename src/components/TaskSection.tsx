import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import type { Task, Category } from "../type";

interface TaskSectionProps {
  meta: { id: Category; title: string; subtitle: string; gradient: string };
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onChangeCategory: (id: string, category: Category, dueDate?: Date) => void;
}

export default function TaskSection({ meta, tasks, onToggle, onDelete, onChangeCategory }: TaskSectionProps) {
  const safeTasks = tasks.filter(t => t && typeof t.completed === "boolean");

  return (
    <section aria-labelledby={`${meta.id}-title`} className="rounded-2xl overflow-visible">
      <div className={`p-4 rounded-2xl bg-linear-to-br ${meta.gradient} text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 id={`${meta.id}-title`} className="text-lg font-bold">{meta.title}</h3>
            <p className="text-xs opacity-90">{meta.subtitle}</p>
          </div>
          <div className="text-xs opacity-80">{safeTasks.length}</div>
        </div>
      </div>

      <div className="card-glass rounded-b-2xl p-3 mt-3 min-h-[120px]">
        <AnimatePresence initial={false}>
          {safeTasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-6 text-center text-sm text-slate-500"
            >
              No tasks here — add one!
            </motion.div>
          ) : (
            safeTasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, height: 0, margin: 0, padding: 0 }}
                layout
                className="mb-2 last:mb-0"
              >
                <TaskItem
                  task={task}
                  onToggle={() => onToggle(task.id, !task.completed)}
                  onDelete={() => onDelete(task.id)}
                  onChangeCategory={(cat, dueDate) => onChangeCategory(task.id, cat, dueDate)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
