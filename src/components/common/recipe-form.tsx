import { useCreateRecipe, useUpdateRecipe } from '@/hooks/use-recipes'
import { recipeSchema } from '@/schema/recipe'
import { Recipe } from '@/types/recipe'
import { Button } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { z } from 'zod'
import Card from '../ui/card'
import FileInput from './file-input'
import TextInputForm from './text-input-form'
import TextareaForm from './textarea-form'

type RecipeFormData = z.infer<typeof recipeSchema>

const RecipeForm = ({ recipe }: { recipe?: Recipe }) => {
  const router = useRouter()
  const { mutateAsync: createRecipe } = useCreateRecipe()
  const { mutateAsync: updateRecipe } = useUpdateRecipe()
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipe
      ? {
          ...recipe,
          image: recipe.image ? new File([], recipe.image) : undefined,
        }
      : {
          title: '',
          description: '',
          ingredients: '',
          instructions: '',
          image: undefined,
          author: '',
          email: '',
          slug: '',
          favorite: false,
        },
    mode: 'onBlur',
  })

  const onSubmit = async (data: RecipeFormData) => {
    const formData = new FormData()
    formData.append(
      'image',
      recipe?.image === data.image.name ? '' : data.image,
    )
    formData.append('title', recipe?.title ? recipe.title : data.title)
    formData.append('description', data.description)
    formData.append('ingredients', data.ingredients)
    formData.append('instructions', data.instructions)
    formData.append('author', data.author)
    formData.append('email', data.email)
    formData.append(
      'slug',
      recipe?.slug ? recipe.slug : slugify(data.title, { lower: true }),
    )

    if (recipe) {
      await updateRecipe({ formData, slug: recipe.slug })
    } else {
      try {
        await createRecipe(formData)
      } catch (error: any) {
        if (error.message === 'DUPLICATE_TITLE') {
          form.setError('title', {
            message: 'A recipe with this title already exists',
          })
        }
        return
      }
    }
    router.push('/')
  }

  return (
    <form
      className="w-full flex justify-center px-10 gap-10 max-h-[calc(100vh-4rem)] overflow-auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card className="w-1/3 self-start h-auto">
        <FileInput
          imagePreview={recipe?.image}
          name="image"
          control={form.control}
          label="Add Recipe Image"
          helperText="PNG, JPG, GIF up to 10MB"
          accept="image/*"
          description="The image will be used as the recipe cover."
        />
      </Card>
      <Card className="w-3/4 gap-4 flex flex-col">
        <h4 className="text-2xl font-bold">
          {recipe ? 'Edit Recipe' : 'Create Recipe'}
        </h4>
        <TextInputForm
          control={form.control}
          type="text"
          label="Title"
          id="title"
          placeholder="Title"
          name="title"
          disabled={!!recipe}
        />
        <TextareaForm
          control={form.control}
          label="Description"
          id="description"
          placeholder="Description"
          name="description"
        />
        <TextareaForm
          control={form.control}
          label="Ingredients"
          id="ingredients"
          placeholder="Ingredients"
          name="ingredients"
        />
        <TextareaForm
          control={form.control}
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
          {recipe ? 'Update Recipe' : 'Create Recipe'}
        </Button>
      </Card>
    </form>
  )
}

export default RecipeForm
