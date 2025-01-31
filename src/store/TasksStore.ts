import { create } from "zustand";

export interface Task {
  title: string;
  description: string;
  status: "not started" | "in progress" | "done";
  createAt: Date;
  id: string;
}

interface Modal {
  title: string;
  description: string;
  subcomponent?: React.ReactNode;
}

interface TasksStore {
  tasks: Task[];
  modal: Modal | undefined;
  setTasks: (tasks: Task[]) => void;
  setModal: (modal: Modal | undefined) => void;
}

const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  modal: undefined,
  setTasks: (tasks: Task[]) => set((state) => ({ ...state, tasks })),
  setModal: (modal: Modal | undefined) => set((state) => ({ ...state, modal })),
}));

export default useTasksStore;
