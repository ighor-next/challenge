import { create } from "zustand";

interface Task {
  title: string;
  description: string;
  status: "not started" | "in progress" | "done";
  createAt: Date;
}

interface TasksStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set((state) => ({ ...state, tasks })),
}));

export default useTasksStore;
