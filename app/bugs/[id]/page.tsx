import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import BugStatusBadge from '@/app/components/BugStatusBadge'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props {
    params: { id: string }
}

const BugDetailPage = async ({ params }: Props) => {

    await delay(2000)

    if (typeof +params.id !== 'number')
        notFound()

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
                <Heading>{bug.title}</Heading>
                <Flex my='2' className='space-x-3'>
                    <BugStatusBadge status={bug.status}></BugStatusBadge>
                    <Text>{bug.updatedAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt='4'>
                    <ReactMarkdown>{bug.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/bugs/${bug.id}/edit`}>Edit Bug</Link>

                </Button>
            </Box>
        </Grid >
    )
}

export default BugDetailPage
