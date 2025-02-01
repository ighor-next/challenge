import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

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
