import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestBugs from './LatestBugs'
import BugSummery from './BugSummery'
import Prisma from '@/prisma/client'
import BugChart from './BugChart'
import { Flex, Grid } from '@radix-ui/themes'

export default async function Home() {
  const open = await Prisma.bug.count({ where: { status: 'OPEN' } })
  const inProgress = await Prisma.bug.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await Prisma.bug.count({ where: { status: 'CLOSED' } })

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <BugSummery open={open} inProgress={inProgress} closed={closed} />
        <BugChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestBugs />
    </Grid>
  )
}
