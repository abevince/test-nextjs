import { z } from 'zod'

export const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  ingredients: z.string().min(1, 'Ingredients are required'),
  instructions: z.string().min(1, 'Instructions are required'),
  author: z.string().min(1, 'Author is required'),
  email: z.email('Invalid email address'),
  slug: z.string(),
  image: z.instanceof(File),
  favorite: z.boolean().optional(),
})
