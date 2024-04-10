import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestBugs from './LatestBugs'

export default function Home() {
  return (
    <div>
      <LatestBugs />
    </div>
  )
}
