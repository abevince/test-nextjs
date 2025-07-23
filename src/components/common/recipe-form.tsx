import { useCreateRecipe } from '@/hooks/use-recipes'
import { recipeSchema } from '@/schema/recipe'
import { Recipe } from '@/types/recipe'
import { Button } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { z } from 'zod'
import Card from '../ui/card'
import FileInput from './file-input'
import TextInputForm from './text-input-form'

type RecipeFormData = z.infer<typeof recipeSchema>

const RecipeForm = ({ recipe }: { recipe?: Recipe }) => {
  const { mutate: createRecipe } = useCreateRecipe()
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
      image: undefined,
      author: '',
      email: '',
      slug: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = (data: RecipeFormData) => {
    const formData = new FormData()
    formData.append('image', data.image)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('ingredients', data.ingredients)
    formData.append('instructions', data.instructions)
    formData.append('author', data.author)
    formData.append('email', data.email)
    formData.append('slug', slugify(data.title))
    createRecipe(formData)
  }

  return (
    <form
      className="w-full flex justify-center p-10 gap-10 max-h-[calc(100vh-4rem)] overflow-auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card className="w-1/3 self-start h-auto">
        <FileInput
          name="image"
          control={form.control}
          label="Add Recipe Image"
          helperText="PNG, JPG, GIF up to 10MB"
          accept="image/*"
          description="The image will be used as the recipe cover."
        />
      </Card>
      <Card className="w-3/4 gap-4 flex flex-col">
        <h4 className="text-2xl font-bold">Create Recipe</h4>
        <TextInputForm
          control={form.control}
          type="text"
          label="Title"
          id="title"
          placeholder="Title"
          name="title"
        />
        <TextInputForm
          control={form.control}
          type="text"
          label="Description"
          id="description"
          placeholder="Description"
          name="description"
        />
        <TextInputForm
          control={form.control}
          type="text"
          label="Ingredients"
          id="ingredients"
          placeholder="Ingredients"
          name="ingredients"
        />
        <TextInputForm
          control={form.control}
          type="text"
          label="Instructions"
          id="instructions"
          placeholder="Instructions"
          name="instructions"
        />
        <TextInputForm
          control={form.control}
          type="text"
          label="Author"
          id="author"
          placeholder="Author"
          name="author"
        />
        <TextInputForm
          control={form.control}
          type="email"
          label="Email"
          id="email"
          placeholder="Email"
          name="email"
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md py-2"
          disabled={form.formState.isSubmitting}
        >
          Create Recipe
        </Button>
      </Card>
    </form>
  )
}

export default RecipeForm
