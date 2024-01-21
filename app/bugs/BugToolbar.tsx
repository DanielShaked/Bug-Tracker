import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const BugToolbar = () => {
    return (
        <div className='mb-5'>
            <Button>
                <Link href='/bugs/new'>Add Bug</Link>
            </Button>
        </div>
    )
}

export default BugToolbar