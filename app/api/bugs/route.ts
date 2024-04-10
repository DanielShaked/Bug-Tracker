import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { bugSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";


export async function POST(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (!session)
        return NextResponse.json({}, { status: 401 })

    const body = await request.json()
    const validation = bugSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format()), { status: 400 }


    const newBug = await prisma.bug.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newBug, { status: 201 })

}