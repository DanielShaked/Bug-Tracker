import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Flex, Grid } from '@radix-ui/themes'
import EditBugButton from './EditBugButton'
import BugDetails from './BugDetails'
import DeleteBugButton from './DeleteBugButton'

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
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className='md:col-span-4'>
                <BugDetails bug={bug} />
            </Box>
            <Flex direction='column' gap='4' >
                <EditBugButton bugId={bug.id} />
                <DeleteBugButton bugId={bug.id} />
            </Flex>
        </Grid >
    )
}

export default BugDetailPage
