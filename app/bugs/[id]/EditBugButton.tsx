import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditBugButton = ({ bugId }: { bugId: number }) => {
    return (
        <Box>
            <Button>
                <Pencil2Icon />
                <Link href={`/bugs/${bugId}/edit`}>Edit Bug</Link>
            </Button>
        </Box>
    )
}

export default EditBugButton