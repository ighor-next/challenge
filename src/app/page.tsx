import AddNewtaskButton from "@/components/AddNewtaskButton";
import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <main className="bg-zinc-50 min-h-screen py-10 px-20 sm:py-5 sm:px-10">
      <AddNewtaskButton />
      <Tasks />
    </main>
  );
}
