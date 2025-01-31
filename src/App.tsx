import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "./lib/db";
import * as db from "./lib/db";
import Card from "./components/card";
import ConfirmDelete from "./components/confirmDelete";
import CardForm from "./components/cardForm";
import IconPlus from "./components/icons/plus";

function App() {
  const [keys, setKeys] = useState<TaskStatus>({});
  const [tasks, setTasks] = useState<Task[]>([]);
  const [canDelete, setCanDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [showForm, setShowForm] = useState(true);

  function addTask(title: string, description: string) {
    db.add({
      title,
      description,
      status: "PENDING",
    });
    setShowForm(false);
    setTasks([...db.getAll()]);
  }

  function confirmRemove(id: number) {
    setCanDelete(true);
    setDeleteId(id);
  }

  function doRemove() {
    setCanDelete(false);
    if (deleteId) {
      db.remove(deleteId);
      setTasks([...db.getAll()]);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    addTask(String(values.title), String(values.description));
  }

  useEffect(() => {
    setKeys(db.getKeys());
    setTasks([...db.getAll()]);
  }, []);

  return (
    <div className="fixed inset-0 flex md:items-center md:justify-center bg-zinc-50">
      <div className="max-w-[1200px] flex flex-col min-h-[100vh] md:min-h-[80vh] w-full p-6 px-8 bg-white rounded-xl shadow">
        <div className="flex justify-between">
          <div className="text-3xl font-bold uppercase">📝 Tarefas</div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-400 transition-all hover:bg-blue-500 hidden md:flex cursor-pointer h-10 px-4 gap-2 rounded justify-center items-center"
          >
            <div className="uppercase font-semibold text-white">Adicionar</div>
            <IconPlus className="size-6 fill-white" />
          </button>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-400 z-10 fixed md:hidden bottom-10 right-10 size-12 rounded-full flex justify-center items-center"
        >
          <IconPlus className="size-10 fill-white" />
        </button>
        {showForm && (
          <CardForm onSubmit={onSubmit} onCancel={() => setShowForm(false)} />
        )}
        <div className="flex grow gap-2 mt-4 p-2 flex-col md:flex-row">
          {Object.keys(keys)?.map((key, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col bg-zinc-100 rounded"
            >
              <div className="text-lg font-semibold p-2 px-4">{keys[key]}</div>
              <div className="grow relative">
                <div className="absolute p-4 inset-0 overflow-auto flex flex-col gap-2">
                  {tasks
                    .filter((task) => task.status === key)
                    .map((task, index) => (
                      <Card
                        task={task}
                        key={index}
                        onDelete={confirmRemove}
                        onEdit={() => {}}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {canDelete && (
          <ConfirmDelete
            onConfirm={doRemove}
            onCancel={() => setCanDelete(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
