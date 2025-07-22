import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const RecipeCard = ({ recipe }: { recipe: any }) => {
  return (
    <div className="w-full h-60 border-2 border-gray-300 rounded-md overflow-hidden flex  gap-2">
      <div className=" bg-white p-4 shadow-sm aspect-video h-full relative">
        <Image
          src="/images/kare.jpg"
          alt="kare-kare"
          fill
          className="w-full object-cover"
        />
        <button
          className="absolute top-2 right-2 flex gap-2 text-yellow-400 hover:text-yellow-500 cursor-pointer"
          aria-label="Add to favorites"
        >
          <Star className="size-4" fill="currentColor" />
        </button>
      </div>
      <div className="flex flex-col gap-2 py-4 px-4">
        <h4 className="text-3xl font-bold">Kare-kare</h4>
        <p className="text-gray-500">
          Kare-kare is a Filipino dish made from oxtail, vegetables, and peanut
          sauce. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos.
        </p>
        <Link href="/" className="text-blue-500 hover:text-blue-600 text-sm">
          See more..
        </Link>
        <div className="flex gap-2 text-sm text-gray-500 justify-between mt-auto">
          <span>
            Added by: <span className="font-bold">Someone</span>
          </span>
          <span>
            Added on: <span className="font-bold">2025-01-01</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
