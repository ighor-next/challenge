import { NextResponse } from "next/server";
import { TasksService } from "../tasks.service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const task = TasksService.getTaskById(params.id);
  if (!task)
    return NextResponse.json(
      { error: "Tarefa não encontrada" },
      { status: 404 }
    );

  return NextResponse.json(task);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updatedTask = TasksService.updateTask(params.id, body);
    if (!updatedTask)
      return NextResponse.json(
        { error: "Tarefa não encontrada" },
        { status: 404 }
      );

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const success = TasksService.deleteTask(params.id);
  if (!success)
    return NextResponse.json(
      { error: "Tarefa não encontrada" },
      { status: 404 }
    );

  return NextResponse.json({ message: "Tarefa deletada" }, { status: 200 });
}
