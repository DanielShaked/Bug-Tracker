'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteBugButton = ({ bugId }: { bugId: number }) => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const onDeleteBug = async () => {
        try {
            setIsDeleting(true)
            await axios.delete(`/api/bugs/${bugId}`)
            router.push('/bugs/list')
            router.refresh()
        }
        catch (error) {
            setIsDeleting(false)
            setError(true)
        }
    }
    return (
        <>
            <AlertDialog.Root >
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        Delete Bug
                        {isDeleting && <Spinner />}

                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are sure you want to delete this Bug?
                    </AlertDialog.Description>
                    <Flex mt='4' gap='3'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>

                            <Button onClick={onDeleteBug} color='red'>Delete Bug</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This Bug can not be deleted </AlertDialog.Description>
                    <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteBugButton