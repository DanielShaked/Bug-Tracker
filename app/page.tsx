import Image from 'next/image'
import Pagination from './components/Pagination'

export default function Home() {
  return (
    <div>
      <Pagination itemCount={20} pageSize={5} currentPage={2} />
    </div>
  )
}
