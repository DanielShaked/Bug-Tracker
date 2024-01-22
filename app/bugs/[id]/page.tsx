import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import BugStatusBadge from '@/app/components/BugStatusBadge'
import ReactMarkdown from 'react-markdown'


interface Props {
    params: { id: string }
}

const BugDetailPage = async ({ params }: Props) => {
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
        <div>
            <Heading>{bug.title}</Heading>
            <Flex my='2' className='space-x-3'>
                <BugStatusBadge status={bug.status}></BugStatusBadge>
                <Text>{bug.updatedAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkdown>{bug.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default BugDetailPage
