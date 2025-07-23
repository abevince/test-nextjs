import MainNav from '@/components/common/main-nav'
import RecipeForm from '@/components/common/recipe-form'
import Link from 'next/link'

export default function Create() {
  return (
    <main className="min-w-full min-h-screen bg-gray-200">
      <MainNav className="w-full justify-between">
        <Link href="/">Home</Link>
      </MainNav>
      <RecipeForm />
    </main>
  )
}
