import TaskManager from "@/features/tasks/TaskManager";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 md:p-12">
      <TaskManager />
    </div>
  );
}
