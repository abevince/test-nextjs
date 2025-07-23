import { Recipe } from '@/types/recipe'
import { formatDate } from '@/utils/lib'
import Image from 'next/image'
import Link from 'next/link'
import RecipeFavoriteButton from './recipe-favorite-button'

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="w-full h-60 border-2 border-gray-300 rounded-md overflow-hidden flex  gap-2 shadow-md">
      <div className=" bg-white p-4  aspect-video h-full relative">
        <Image
          src={recipe.image}
          alt="kare-kare"
          fill
          className="w-full object-cover"
        />
        <RecipeFavoriteButton recipe={recipe} />
      </div>
      <div className="flex flex-col gap-2 py-4 px-4 w-full">
        <h4 className="text-3xl font-bold">{recipe.title}</h4>
        <p className="text-gray-500">{recipe.description}</p>
        <Link
          href={`/${recipe.slug}`}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          See more..
        </Link>
        <div className="flex gap-2 text-sm text-gray-500 justify-between mt-auto">
          <span>
            Added by: <span className="font-bold">{recipe.author}</span>
          </span>
          <span>
            Added on:{' '}
            <span className="font-bold">{formatDate(recipe.timeCreated)}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
