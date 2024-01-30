'use client'
import { Skeleton } from '@/app/components'
import { Bug, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ bug }: { bug: Bug }) => {

    const { data: users, error, isLoading } = useUsers()

    const assignBug = async (userId: string) => {
        console.log('userId', userId)
        await axios.patch(`/api/bugs/${bug.id}`, { assignedToUserId: (userId !== 'unset') ? userId : null })
            .catch(() => {
                toast.error('Changed could not be saved.')
            })
    }

    if (error) return null

    if (isLoading) return <Skeleton />

    return (
        <>
            <Select.Root defaultValue={bug.assignedToUserId || 'unset'} onValueChange={(userId) => assignBug(userId)}>
                <Select.Trigger placeholder='Assign...'></Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value='unset'>Unassigned</Select.Item>
                        {users && users.map(user => {
                            return (
                                <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                            )
                        })}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster>

            </Toaster>
        </>
    )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
})


export default AssigneeSelect