import AddNewtaskButton from "@/components/AddNewtaskButton";
import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <main className="bg-zinc-50 min-h-screen py-10 px-20">
      <AddNewtaskButton />
      <Tasks />
    </main>
  );
}
