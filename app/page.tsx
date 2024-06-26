import Prisma from '@/prisma/client'
import { Flex, Grid } from '@radix-ui/themes'
import { Metadata } from 'next'
import BugChart from './BugChart'
import LatestBugs from './LatestBugs'
import BugSummary from './BugSummary'

export default async function Home() {
  const open = await Prisma.bug.count({ where: { status: 'OPEN' } })
  const inProgress = await Prisma.bug.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await Prisma.bug.count({ where: { status: 'CLOSED' } })

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <BugSummary open={open} inProgress={inProgress} closed={closed} />
        <BugChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestBugs />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Bug Tracker - Dashboard',
  description: ' View a summary of Project Bugs'
}