import prisma from '@/prisma/client'
import { Table, TableCell } from '@radix-ui/themes'
import { BugStatusBadge, Link } from '@/app/components'
import BugToolbar from './BugToolbar'
import NextLink from 'next/link'
import { Bug, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

interface Props {
    searchParams: { status: Status, orderBy: keyof Bug, page: 'string' }
}

const BugsPage = async ({ searchParams }: Props) => {


    const columns: {
        label: string;
        value: keyof Bug;
        className?: string;
    }[] = [
            { label: 'Bug', value: 'title' },
            { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
            { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
        ]


    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

    const orderBy =
        columns
            .map((column) => column.value)
            .includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

    const page = +(searchParams.page) || 1
    const pageSize = 8

    const bugs = await prisma.bug.findMany({
        where: {
            status
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize
    })

    const bugCount = await prisma.bug.count({ where: { status } })
    return (
        <div>
            <BugToolbar />
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
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={bugCount}
            />
        </div>
    )
}

export const dynamic = 'force-dynamic'
// export const revalidate = 0;
export default BugsPage