import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
const BugsPage = () => {
    return (
        <div>
            <h1>Bugs page</h1>
            <Button>
                <Link href='/bugs/new'>Add Bug</Link>
            </Button>
        </div>
    )
}

export default BugsPage