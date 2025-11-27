
export type Category = "today" | "tomorrow" | "upcoming" | "completed";

export interface Task {
  id: string;
  text: string;
  category: Category;
  completed: boolean;
  createdAt: number;
  dueDate?: Date; 
}
