import MainNav from '@/components/common/main-nav'
import RecipeForm from '@/components/common/recipe-form'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function Create() {
  return (
    <main className="min-w-full min-h-screen bg-gray-200">
      <MainNav className="w-full justify-between">Create Recipe</MainNav>
      <div className="px-10 py-4">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
        >
          <ArrowLeftIcon className="size-4" /> Back
        </Link>{' '}
      </div>
      <RecipeForm />
    </main>
  )
}
