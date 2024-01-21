'use client'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import "easymde/dist/easymde.min.css";

interface BugForm {
    title: string
    description: string
}

const NewBugPage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<BugForm>()
    return (
        <form
            className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async (data) => {
                const res = await axios.post('/api/bugs', data)
                router.push('/bugs')
            })}>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')}>
                </TextField.Input>
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE placeholder="Description" {...field} />
                )}
            />
            <Button>Submit New Bug</Button>
        </form>
    )
}

export default NewBugPage