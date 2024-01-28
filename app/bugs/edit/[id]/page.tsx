import React from 'react'
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';


const BugForm = dynamic(
    () => import('@/app/bugs/_components/BugForm'),
    {
        ssr: false,
        loading: () => <p>Loading...</p>
    }
)

interface Props {
    params: { id: string }
}

const EditBugPage = async ({ params }: Props) => {
    const bug = await prisma.bug.findUnique({
        where: {
            id: +params.id
        }
    })

    if (!bug)
        notFound()

    return (
        <BugForm bug={bug} />
    )
}

export default EditBugPage