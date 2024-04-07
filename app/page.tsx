import Image from 'next/image'
import Pagination from './components/Pagination'

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  return (
    <div>
      <Pagination itemCount={20} pageSize={5} currentPage={+searchParams.page} />
    </div>
  )
}
