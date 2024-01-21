import React from 'react'
import { Button, Table, TableCell, TableHeader } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'
import BugStatusBadge from '../components/BugStatusBadge'

const BugsPage = async () => {
    const bugs = await prisma.bug.findMany({})

    return (
        <div>
            <h1>Bugs page</h1>
            <div className='mb-5'>
                <Button>
                    <Link href='/bugs/new'>Add Bug</Link>
                </Button>
            </div>
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
                                {bug.title}
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