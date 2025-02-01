import type { TaskStatus } from '@prisma/client'
import { NextResponse } from 'next/server'

import type { ITask } from '@/app/(panel)/types'
import prisma from '@/lib/prisma'

export async function GET() {
  const tasks = await prisma.task.findMany()

  const groupedTasks: Record<TaskStatus, ITask[]> = {
    PENDING: [],
    IN_PROGRESS: [],
    DONE: [],
  }

  tasks.forEach((task) => {
    const taskWithStringDate = {
      ...task,
      createdAt: task.createdAt.toISOString(),
    }

    if (task.status in groupedTasks) {
      groupedTasks[task.status as TaskStatus].push(taskWithStringDate)
    }
  })

  return NextResponse.json(groupedTasks)
}

export async function POST(request: Request) {
  const { name, description } = await request.json()

  const newItem = await prisma.task.create({
    data: {
      name,
      description,
    },
  })

  return NextResponse.json(newItem, { status: 201 })
}
