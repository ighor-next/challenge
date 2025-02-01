import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params

  await prisma.task.delete({
    where: { id },
  })

  return NextResponse.json({ status: 200 })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params
  const { name, description } = await request.json()

  const updatedItem = await prisma.task.update({
    where: { id },
    data: {
      name,
      description,
    },
  })

  return NextResponse.json(updatedItem, { status: 200 })
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params
  const { status } = await request.json()

  const updatedItem = await prisma.task.update({
    where: { id },
    data: {
      status
    },
  })

  return NextResponse.json(updatedItem, { status: 200 })
}
