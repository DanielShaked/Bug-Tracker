'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import "easymde/dist/easymde.min.css";
import { useState } from 'react';
import { createBugSchema } from '@/app/validationSchemas';
import { z } from 'zod'

type BugForm = z.infer<typeof createBugSchema>

const NewBugPage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<BugForm>({
        resolver: zodResolver(createBugSchema)
    })
    const [error, setError] = useState('')
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className='max-w-xl space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        const res = await axios.post('/api/bugs', data)
                        router.push('/bugs')
                    } catch (error) {
                        setError('An unexpected error was occuerd')
                        console.error(error)
                    }
                })}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')}>
                    </TextField.Input>
                </TextField.Root>
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Button>Submit New Bug</Button>
            </form>
        </div>
    )
}

export default NewBugPage