import Card from '@/components/card'
import MainNav from '@/components/main-nav'
import RecipeCard from '@/components/recipe-card'
import SearchInput from '@/components/search-input'
import { ChevronDownIcon } from 'lucide-react'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input
                      id="favorites"
                      name="favorites"
                      type="checkbox"
                      aria-describedby="favorites-description"
                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-blue-400 checked:bg-blue-500 indeterminate:border-blue-400 indeterminate:bg-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:checked]:opacity-100"
                      />
                      <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-sm/6">
                  <label
                    htmlFor="favorites"
                    className="font-medium text-gray-900"
                  >
                    Favorites
                  </label>
                </div>
              </div>
            </Card>
          </div>
          <Card className="w-3/4 overflow-auto">
            <RecipeCard />
          </Card>
        </div>
      </main>
    </>
  )
}
