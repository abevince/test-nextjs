import { fetchRecipes } from '@/api/recipes'
import MainNav from '@/components/common/main-nav'
import RecipeCard from '@/components/common/recipe-card'
import RecipeSkeleton from '@/components/common/recipe-skeleton'
import SearchInput from '@/components/common/search-input'
import Card from '@/components/ui/card'
import Checkbox from '@/components/ui/checkbox'
import { useRecipes } from '@/hooks/use-recipes'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

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
  const { data: recipes, isLoading } = useRecipes()

  console.log(recipes)
  return (
    <>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-full min-h-screen bg-gray-200">
        <MainNav>
          <SearchInput onSearch={() => {}} />
        </MainNav>
        <div className="w-full flex justify-center p-10 gap-10 max-h-[calc(100vh-4rem)] overflow-auto ">
          <div className="w-1/4">
            <Card>
              <p>Sort by Title</p>
              <div>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="sort"
                    name="sort"
                    defaultValue=""
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-400 sm:text-sm/6"
                  >
                    <option value="" className="text-gray-400">
                      Sort by
                    </option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
            </Card>
            <Card className="mt-4">
              <p>Filters</p>
              <Checkbox
                label="Favorites"
                id="favorites"
                name="favorites"
                checked={false}
                onChange={() => {}}
              />
            </Card>
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
