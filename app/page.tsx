import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestBugs from './LatestBugs'
import BugSummery from './BugSummery'
import Prisma from '@/prisma/client'
import BugChart from './BugChart'

export default async function Home() {
  const open = await Prisma.bug.count({ where: { status: 'OPEN' } })
  const inProgress = await Prisma.bug.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await Prisma.bug.count({ where: { status: 'CLOSED' } })
  return (
    <div>
      <LatestBugs />
      <BugSummery open={open} inProgress={inProgress} closed={closed} />
      <BugChart open={open} inProgress={inProgress} closed={closed} />
    </div>
  )
}
