import { fetchRecipes } from '@/api/recipes'
import MainNav from '@/components/common/main-nav'
import RecipeCard from '@/components/common/recipe-card'
import RecipeSkeleton from '@/components/common/recipe-skeleton'
import SearchInput from '@/components/common/search-input'
import Card from '@/components/ui/card'
import Checkbox from '@/components/ui/checkbox'
import Select from '@/components/ui/select'
import { useRecipes } from '@/hooks/use-recipes'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['recipes'],
    queryFn: () => fetchRecipes(),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Home() {
  const router = useRouter()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') as 'title' | 'timeCreated' | undefined
  const order = searchParams.get('order') as 'asc' | 'desc' | undefined
  const search = searchParams.get('search') as string | undefined
  const filter = searchParams.get('filter') as string | undefined

  const { data: recipes, isLoading } = useRecipes(
    {
      by: sort ?? 'timeCreated',
      order: order ?? 'asc',
    },
    search,
    filter,
  )
  const handleSearch = useCallback(
    (search: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams)
        if (search.trim()) {
          params.set('search', search.trim())
        } else {
          params.delete('search')
        }
        router.push(`/?${params.toString()}`)
      }, 300)
    },
    [router, searchParams],
  )

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
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-full min-h-screen bg-gray-200">
        <MainNav>
          <SearchInput onSearch={handleSearch} />
        </MainNav>
        <div className="w-full flex justify-center p-10 gap-10 max-h-[calc(100vh-4rem)] overflow-auto ">
          <div className="w-1/4">
            <Card className="space-y-2">
              <p className="text-lg font-bold">Sort by</p>
              <Select
                label="Title"
                options={[
                  { label: 'Ascending', value: 'asc' },
                  { label: 'Descending', value: 'desc' },
                ]}
                value={order ?? 'asc'}
                onChange={(value) =>
                  handleSort('title', value as 'asc' | 'desc')
                }
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
          <Card className="w-3/4 overflow-y-auto space-y-4 relative">
            <Link
              href="/create"
              className="absolute top-2 right-2 bg-orange-400 text-white p-2 rounded-full flex items-center justify-center"
            >
              <PlusIcon className="size-4" strokeWidth={3} />
            </Link>
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <RecipeSkeleton key={index} />
              ))}
            {!isLoading && !recipes?.length && (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">No recipes found</p>
              </div>
            )}
            {recipes?.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </Card>
        </div>
      </main>
    </>
  )
}
