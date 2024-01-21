import { Table, TableCell } from '@radix-ui/themes'
import React from 'react'
import BugStatusBadge from '../components/BugStatusBadge'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import BugToolbar from './BugToolbar'


const LoadingBugsPage = () => {

    const dummyBugs = [1, 2, 3, 4, 5]
    return (
        <div>
            <BugToolbar />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.ColumnHeaderCell>Bug</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                </Table.Header>
                <Table.Body>{dummyBugs.map(bug => {
                    return (
                        <Table.Row key={bug}>
                            <TableCell>
                                <Skeleton />
                                <div className='block md:hidden'>
                                    <Skeleton />
                                </div>
                            </TableCell>
                            <TableCell className='hidden md:table-cell'>
                                <Skeleton />
                            </TableCell>
                            <TableCell className='hidden md:table-cell'>
                                <Skeleton />
                            </TableCell>
                        </Table.Row>)
                })}</Table.Body>
            </Table.Root></div>
    )
}

export default LoadingBugsPage