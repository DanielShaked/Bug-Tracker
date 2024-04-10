import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import BugTable, { BugQuery, columnNames } from './BugTable'
import BugToolbar from './BugToolbar'
import { Flex } from '@radix-ui/themes'

interface Props {
    searchParams: BugQuery
}

const BugsPage = async ({ searchParams }: Props) => {


    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

    const orderBy = columnNames.
        includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

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
        <Flex direction='column' gap='3'>
            <BugToolbar />
            <BugTable searchParams={searchParams} bugs={bugs} />
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={bugCount}
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'
// export const revalidate = 0;
export default BugsPage