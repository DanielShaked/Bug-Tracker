import React, { cache } from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Flex, Grid } from '@radix-ui/themes'
import EditBugButton from './EditBugButton'
import BugDetails from './BugDetails'
import DeleteBugButton from './DeleteBugButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
    params: { id: string }
}

const fetchBug = cache(async (bugId: number) => await prisma.bug.findUnique(({ where: { id: bugId } })))

const BugDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)

    const bug = await fetchBug(+params.id)

    if (!bug)
        notFound()

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className='md:col-span-4'>
                <BugDetails bug={bug} />
            </Box>
            {session && <Box>
                <Flex direction='column' gap='4' >
                    <AssigneeSelect bug={bug} />
                    <EditBugButton bugId={bug.id} />
                    <DeleteBugButton bugId={bug.id} />
                </Flex>
            </Box>}
        </Grid >
    )
}

export async function generateMetaData({ params }: Props) {
    const bug = await fetchBug(+params.id)

    return {
        title: bug?.title,
        description: `Details of bug ${bug?.title}`
    }
}


export default BugDetailPage
