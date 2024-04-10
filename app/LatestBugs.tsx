import Prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { BugStatusBadge } from './components'

const LatestBugs = async () => {
    const bugs = await Prisma.bug.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    })
    return (
        <Card>
            <Heading size='4' mb='5'>Latest Bugs</Heading>
            <Table.Root>
                <Table.Body>
                    {bugs.map((bug) => {
                        return <Table.Row key={bug.id}>
                            <Table.Cell>
                                <Flex justify='between'>
                                    <Flex direction='column' align='start' gap='2'>
                                        <Link href={`bugs/${bug.id}`}>{bug.title}</Link>
                                        <BugStatusBadge status={bug.status} />
                                    </Flex>
                                    {bug.assignedToUser && (
                                        <Avatar
                                            src={bug.assignedToUser.image!}
                                            fallback='?'
                                            size='2'
                                            radius='full'
                                        />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestBugs