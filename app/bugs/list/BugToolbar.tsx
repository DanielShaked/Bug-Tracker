import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import BugStatusFilter from './BugStatusFilter'

const BugToolbar = () => {
    return (
        <Flex className='mb-5' justify='between'>
            <BugStatusFilter />
            <Button>
                <Link href='/bugs/new'>Add Bug</Link>
            </Button>
        </Flex>
    )
}

export default BugToolbar