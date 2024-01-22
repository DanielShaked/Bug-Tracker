import React from 'react'
import BugForm from '../../_components/BugForm'
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';

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