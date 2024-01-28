'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const DeleteBugButton = ({ bugId }: { bugId: number }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'> Delete Bug</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are sure you want to delete this Bug?
                </AlertDialog.Description>
                <Flex gap='3'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <Button color='red'>Delete Bug</Button>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteBugButton