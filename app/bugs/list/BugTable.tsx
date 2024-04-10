import { BugStatusBadge } from '@/app/components'
import { Bug, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table, TableCell } from '@radix-ui/themes'
import Link from 'next/link'
import NextLink from 'next/link'

import React from 'react'

export interface BugQuery {
    status: Status;
    orderBy: keyof Bug;
    page: string;
}

interface Props {
    searchParams: BugQuery,
    bugs: Bug[]
}

const BugTable = ({ searchParams, bugs }: Props) => {

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map((column) =>
                        <Table.ColumnHeaderCell key={column.value}
                            className={column.className}
                        >
                            <NextLink href={{
                                query: { ...searchParams, orderBy: column.value }
                            }}>{column.label}</NextLink>
                            {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
                        </Table.ColumnHeaderCell>
                    )}
                </Table.Row>
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
    )
}

const columns: {
    label: string;
    value: keyof Bug;
    className?: string;
}[] = [
        { label: 'Bug', value: 'title' },
        { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ]

export const columnNames = columns.map((column) => column.value)

export default BugTable