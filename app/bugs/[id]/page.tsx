import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Grid } from '@radix-ui/themes'
import EditBugButton from './EditBugButton'
import BugDetails from './BugDetails'

interface Props {
    params: { id: string }
}

const BugDetailPage = async ({ params }: Props) => {

    const bug = await prisma.bug.findUnique({
        where: {
            id: +params.id
        }
    })

    if (!bug)
        notFound()

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
            <Box>
                <BugDetails bug={bug} />
            </Box>
            <EditBugButton bugId={bug.id} />
        </Grid >
    )
}

export default BugDetailPage
