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
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [exapandStatus, setExpandStatus] = useState("PENDING");

  async function setTask(
    id: number,
    title: string,
    description: string,
    status: keyof TaskStatus
  ) {
    // Edit task
    if (id) {
      await db.update({
        id,
        title,
        description,
        status,
      });
    }
    // Add task
    else {
      await db.add({
        title,
        description,
        status,
      });
    }
    setShowForm(false);
    updateTasks();
  }

  function confirmRemove(id: number) {
    setCanDelete(true);
    setDeleteId(id);
  }

  async function doRemove() {
    setCanDelete(false);
    if (deleteId) {
      await db.remove(deleteId);
      updateTasks();
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    setTask(
      Number(values.id),
      String(values.title),
      String(values.description),
      String(values.status)
    );
  }

  function openForm() {
    setEditTask(null);
    setShowForm(true);
  }

  function getByStatus(status: keyof TaskStatus): Task[] {
    if (tasks.length === 0) return [];
    return tasks.filter((task) => task.status === status);
  }

  async function updateTasks() {
    const [error, response] = await db.getAll();
    if (error) throw new Error(`Error fetching tasks: ${error.message}`);
    setTasks([...response]);
  }

  useEffect(() => {
    setKeys(db.getKeys());
    updateTasks();
  }, []);

  return (
    <div className="fixed inset-0 flex md:items-center md:justify-center bg-zinc-50">
      <div className="max-w-[1200px] flex flex-col min-h-[100vh] md:min-h-[80vh] w-full p-6 px-8 bg-white rounded-xl shadow">
        <div className="flex justify-between">
          <div className="text-3xl font-bold uppercase">📝 Tarefas</div>
          <button
            onClick={() => openForm()}
            className="items-center justify-center hidden h-10 gap-2 px-4 transition-all bg-blue-400 rounded cursor-pointer hover:bg-blue-500 md:flex"
          >
            <div className="font-semibold text-white uppercase">Adicionar</div>
            <IconPlus className="size-6 fill-white" />
          </button>
        </div>
        <button
          onClick={() => openForm()}
          className="fixed z-10 flex items-center justify-center bg-blue-400 rounded-full md:hidden bottom-10 right-10 size-12"
        >
          <IconPlus className="size-10 fill-white" />
        </button>
        {showForm && (
          <CardForm
            task={editTask}
            status={keys}
            onSubmit={onSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
        <div className="flex flex-col gap-2 p-2 mt-4 grow md:flex-row">
          {Object.keys(keys)?.map((key, index) => (
            <div
              key={index}
              className={`md:flex-1 flex flex-col bg-zinc-100 rounded ${
                exapandStatus == key ? "flex-1" : ""
              }`}
            >
              <button
                onClick={() => setExpandStatus(key)}
                className="p-2 px-4 text-lg font-semibold"
              >
                {keys[key]} ({getByStatus(key).length})
              </button>
              <div
                className={`grow relative ${
                  exapandStatus == key ? "" : "hidden"
                } md:block`}
              >
                <div className="absolute inset-0 flex flex-col gap-2 p-4 overflow-auto">
                  {getByStatus(key).length > 0 &&
                    getByStatus(key).map((task, index) => (
                      <Card
                        task={task}
                        key={index}
                        onDelete={confirmRemove}
                        onEdit={() => {
                          setEditTask({ ...task });
                          setShowForm(true);
                        }}
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
