import MainNav from '@/components/common/main-nav'
import RecipeForm from '@/components/common/recipe-form'
import { useRecipe } from '@/hooks/use-recipes'
import { ArrowLeftIcon } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Recipe() {
  const router = useRouter()
  const { slug } = router.query
  const { data: recipe } = useRecipe(slug as string)
  return (
    <>
      <Head>
        <title>Recipe Details</title>
        <meta name="description" content="Recipe Details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-full min-h-screen bg-gray-200">
        <MainNav className="w-full justify-between">Recipe Details</MainNav>
        <div className="px-10 py-4">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 flex items-center gap-2 w-fit"
          >
            <ArrowLeftIcon className="size-4" /> Back
          </Link>{' '}
        </div>
        {recipe ? <RecipeForm recipe={recipe} /> : <p>Recipe not found</p>}
      </main>
    </>
  )
}
