import { BugStatusBadge } from '@/app/components'
import { Bug } from '@prisma/client'
import { Box, Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const BugDetails = ({ bug }: { bug: Bug }) => {
    return (
        <>
            <Heading>{bug.title}</Heading>
            <Flex my='2' className='space-x-3'>
                <BugStatusBadge status={bug.status}></BugStatusBadge>
                <Text>{bug.updatedAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full' mt='4'>
                <ReactMarkdown>{bug.description}</ReactMarkdown>
            </Card>
        </>

    )
}

export default BugDetails