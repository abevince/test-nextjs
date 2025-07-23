import { useDeleteRecipe } from '@/hooks/use-recipes'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Dialog from './dialog'

const RecipeDeleteButton = ({ slug }: { slug: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { mutateAsync: deleteRecipe, isPending } = useDeleteRecipe()

  const handleDelete = async () => {
    await deleteRecipe(slug)
    router.push('/')
  }

  return (
    <>
      <button
        className="text-sm text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600 relative"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        type="button"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Delete Recipe'
        )}
      </button>
      <Dialog
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        title="Delete Recipe"
      >
        <p className="mt-2 text-sm/6 text-gray-500">
          Are you sure you want to delete this recipe?
        </p>
        <div className="mt-4 flex gap-2 justify-end">
          <button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-red-600 data-open:bg-red-500"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Dialog>
    </>
  )
}

export default RecipeDeleteButton
