'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'
const AssigneeSelect = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        loadUsers()

        return () => {

        }
    }, [])

    const loadUsers = async () => {
        const { data } = await axios.get<User[]>('/api/users')
        setUsers(data)
    }


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