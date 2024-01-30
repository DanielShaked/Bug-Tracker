'use client'
import { Skeleton } from '@/app/components'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const AssigneeSelect = () => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })

    if (error) return null

    if (isLoading) return <Skeleton />

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...'></Select.Trigger>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users && users.map(user => {
                        return (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )
                    })}
                    <Select.Item value='1'>Daniel Shaked</Select.Item>
                    <Select.Item value='1'>Yuval Hayoon</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect