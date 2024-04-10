import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
    open: number,
    inProgress: number,
    closed: number
}
const BugSummary = ({ open, inProgress, closed }: Props) => {
    const containers: {
        label: string,
        value: number,
        status: Status
    }[] = [
            { label: 'Open Bugs', value: open, status: 'OPEN' },
            { label: 'In-progress Bugs', value: inProgress, status: 'IN_PROGRESS' },
            { label: 'Closed Bugs', value: closed, status: 'CLOSED' },
        ]

    return (
        <Flex gap='4'>
            {containers.map(container => {
                return <Card key={container.label}>
                    <Flex direction='column' gap='1'>
                        <Link className='text-sm font-medium' href={`/bug/list?status=${container.value}`}>{container.label}</Link>
                        <Text size='5' className='font-bold'>{container.value}</Text>
                    </Flex>
                </Card>
            })}

        </Flex>
    )
}

export default BugSummary