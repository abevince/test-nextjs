import { Recipe } from '@/types/recipe'

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch('/api/recipes')
  return response.json()
}

export const fetchRecipe = async (slug: string): Promise<Recipe> => {
  const response = await fetch(`/api/recipes/${slug}`)
  return response.json()
}

export const createRecipe = async (formData: FormData): Promise<Recipe> => {
  const response = await fetch('/api/recipes', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}
