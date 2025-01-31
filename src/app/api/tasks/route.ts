import { NextResponse } from "next/server";
import { TasksService } from "./tasks.service";

// GET todas as tarefas
export async function GET() {
  return NextResponse.json(TasksService.getTasks());
}

// POST criar nova tarefa
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTask = TasksService.createTask(body);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
