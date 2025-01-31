import TaskList from "@/components/TaskList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-20 gap-16 sm:p-20">
      <TaskList />
    </div>
  );
}
