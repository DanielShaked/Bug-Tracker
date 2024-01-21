import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
    params: { id: string }
}

const BugDetailPage = async ({ params }: Props) => {
    if (typeof params.id !== 'number')
        notFound()

    const bug = await prisma.bug.findUnique({
        where: {
            id: +params.id
        }
    })

    if (!bug)
        notFound()

    return (
        <div>
            <p>{bug.title}</p>
            <p>{bug.description}</p>
            <p>{bug.status}</p>
            <p>{bug.updatedAt.toDateString()}</p>
        </div>
    )
}

export default BugDetailPage