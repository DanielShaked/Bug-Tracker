'use client'
import { Button, Callout, TextField } from '@radix-ui/themes';
// import dynamic from 'next/dynamic';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { bugSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';
import { Bug } from '@prisma/client';
import SimpleMde from 'react-simplemde-editor';

// const SimpleMde = dynamic(() => import('react-simplemde-editor'), {
//     ssr: false
// })

type BugFormData = z.infer<typeof bugSchema>

const BugForm = ({ bug }: { bug?: Bug }) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<BugFormData>({
        resolver: zodResolver(bugSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            if (bug)
                axios.patch(`/api/bugs/${bug.id}`, data)
            else
                await axios.post('/api/bugs', data)
            router.push('/bugs/list')
            router.refresh()
        } catch (error) {
            setError('An unexpected error was occuerd')
            setIsSubmitting(false)
            console.error(error)
        }
    })



    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className='max-w-xl space-y-3'
                onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input defaultValue={bug?.title} placeholder='Title' {...register('title')}>
                    </TextField.Input>
                </TextField.Root>

                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    defaultValue={bug?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />

                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>

                <Button
                    disabled={isSubmitting}>
                    {bug ? 'Update Bug' : 'Submit New Bug'}
                    {' '}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default BugForm