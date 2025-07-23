import { cn } from '@/utils/lib'
import { FilterIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Card from '../ui/card'
import Checkbox from '../ui/checkbox'
import Select from '../ui/select'

const RecipeFilters = () => {
  const [isOpen, setIsOpen] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const sort = searchParams.get('sort') as 'title' | 'timeCreated' | undefined
  const order = searchParams.get('order') as 'asc' | 'desc' | undefined
  const filter = searchParams.get('filter') as string | undefined
  const handleSort = (sort: 'title' | 'timeCreated', order: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    params.set('order', order)
    router.push(`/?${params.toString()}`)
  }

  const toggleFilter = () => {
    const params = new URLSearchParams(searchParams)
    if (!filter) {
      params.set('filter', 'favorites')
    } else {
      params.delete('filter')
    }
    router.push(`/?${params.toString()}`)
  }
  return (
    <div className="w-full md:w-1/4 ">
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-bold">Filters</p>
        <button
          className="bg-orange-400 text-white px-4 py-1 rounded-full flex text-sm items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FilterIcon className="size-4" strokeWidth={3} />
        </button>
      </div>
      <div
        className={cn(
          'transition-all duration-300 overflow-hidden',
          isOpen ? 'h-auto' : 'h-0',
        )}
      >
        <Card className="space-y-2">
          <p className="text-lg font-bold">Sort by</p>
          <Select
            label="Title"
            options={[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
            ]}
            value={order ?? 'asc'}
            onChange={(value) => handleSort('title', value as 'asc' | 'desc')}
          />
          <Select
            label="Time Created"
            options={[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
            ]}
            value={order ?? 'asc'}
            onChange={(value) =>
              handleSort('timeCreated', value as 'asc' | 'desc')
            }
          />
        </Card>
        <Card className="mt-4">
          <p>Filters</p>
          <Checkbox
            label="Favorites"
            id="favorites"
            name="favorites"
            checked={filter === 'favorites'}
            onChange={() => toggleFilter()}
          />
        </Card>
        <button
          className="bg-orange-400 text-white px-4 py-1 rounded-full flex  text-sm items-center justify-center mt-4 ml-auto"
          onClick={() => {
            router.push('/')
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default RecipeFilters
