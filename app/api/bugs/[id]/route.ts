import { bugSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 })

    const body = await request.json()
    const validation = bugSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })


    const bug = await prisma.bug.findUnique({
        where: {
            id: +params.id
        }
    })

    if (!bug)
        return NextResponse.json({
            error: 'Invalid Bug'
        }, { status: 404 })

    const updatedBug = await prisma.bug.update({
        where: { id: bug.id },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedBug)
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 })

    const bug = await prisma.bug.findUnique({
        where: {
            id: +params.id
        }
    })

    if (!bug)
        return NextResponse.json({ error: 'Invalid bug' }, { status: 404 })

    await prisma.bug.delete({
        where: {
            id: +bug.id
        }
    })

    return NextResponse.json({})
}