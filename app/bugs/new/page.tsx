import React from 'react'
import dynamic from 'next/dynamic'
import BugFormSkeleton from '../_components/BugFormSkeleton'

const BugForm = dynamic(
    () => import('@/app/bugs/_components/BugForm'),
    {
        ssr: false,
        loading: () => <BugFormSkeleton />
    }
)

const NewBugPage = () => {
    return (
        <BugForm />
    )
}

export default NewBugPage