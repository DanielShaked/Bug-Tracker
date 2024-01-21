import React from 'react'
import { Button, Table, TableCell, TableHeader } from '@radix-ui/themes'
import BugToolbar from './BugToolbar'
import prisma from '@/prisma/client'
import BugStatusBadge from '../components/BugStatusBadge'
import delay from 'delay'
import Link from 'next/link'

const BugsPage = async () => {
    const bugs = await prisma.bug.findMany({})
    await delay(2000)

    return (
        <div>
            <BugToolbar />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.ColumnHeaderCell>Bug</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                </Table.Header>
                <Table.Body>{bugs.map(bug => {
                    return (
                        <Table.Row key={bug.id}>
                            <TableCell>
                                <Link href={`/bugs/${bug.id}`}>
                                    {bug.title}
                                </Link>
                                <div className='block md:hidden'>{bug.status}</div>
                            </TableCell>
                            <TableCell className='hidden md:table-cell'>
                                <BugStatusBadge status={bug.status} />
                            </TableCell>
                            <TableCell className='hidden md:table-cell'>{bug.createdAt.toDateString()}</TableCell>
                        </Table.Row>)
                })}</Table.Body>
            </Table.Root>
        </div>
    )
}

export default BugsPage