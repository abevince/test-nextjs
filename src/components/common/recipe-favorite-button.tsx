import { useUpdateRecipe } from '@/hooks/use-recipes'
import { Recipe } from '@/types/recipe'
import { Loader2, Star } from 'lucide-react'

const RecipeFavoriteButton = ({ recipe }: { recipe: Recipe }) => {
  const { mutate: updateRecipe, isPending } = useUpdateRecipe()
  const handleFavorite = () => {
    const formData = new FormData()
    Object.entries(recipe).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })
    formData.append('favorite', recipe.favorite ? 'false' : 'true')

    updateRecipe({
      formData,
      slug: recipe.slug,
    })
  }

  return (
    <button
      className="absolute top-2 right-2 flex gap-2 text-yellow-400 hover:text-yellow-500 cursor-pointer"
      aria-label="Add to favorites"
      onClick={handleFavorite}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Star
          className="size-4"
          fill={recipe.favorite ? 'currentColor' : 'none'}
        />
      )}
    </button>
  )
}

export default RecipeFavoriteButton
