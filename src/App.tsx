import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "./lib/db";
import * as db from "./lib/db";

function App() {
  const [keys, setKeys] = useState<TaskStatus>({});
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string, description: string) {
    db.add({
      title,
      description,
      status: "PENDING",
    });
    setTasks([...db.getAll()]);
  }

  useEffect(() => {
    setKeys(db.getKeys());
    setTasks([...db.getAll()]);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-50">
      <div className="max-w-[1200px] min-h-[100vh] md:min-h-[80vh] w-full p-6 px-8 bg-white rounded-xl shadow">
        <div className="text-3xl font-bold uppercase">Tarefas</div>
        <div className="flex gap-2 mt-4">
          {Object.keys(keys)?.map((key, index) => (
            <div key={index} className="flex-1 border rounded p-1 px-2">
              <div>{keys[key]}</div>
              <div>
                {tasks
                  .filter((task) => task.status === key)
                  .map((task, index) => (
                    <div key={index} className="flex-1 border rounded p-1 px-2">
                      <div>{task.title}</div>
                      <div>{task.description}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
