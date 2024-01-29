'use client'
import { Select } from '@radix-ui/themes'

const AssigneeSelect = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...'></Select.Trigger>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value='1'>Daniel Shaked</Select.Item>
                    <Select.Item value='1'>Yuval Hayoon</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect