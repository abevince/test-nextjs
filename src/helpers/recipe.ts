import { Recipe } from '@/types/recipe'
import { promises as fs } from 'fs'
import path from 'path'

export const addNewRecipe = async (recipe: Recipe) => {
  let data

  try {
    data = await fs.readFile(path.join(process.cwd(), 'recipes.json'), 'utf8')
  } catch (error) {
    console.error('Failed to read recipes.json:', error)
    throw error
  }

  let recipes: Recipe[] = []

  try {
    const parsed = JSON.parse(data)
    recipes = Array.isArray(parsed) ? parsed : []
  } catch (parseErr) {
    console.error('Failed to parse recipes.json:', parseErr)
    throw parseErr
  }

  recipes.push(recipe)

  try {
    await fs.writeFile(
      path.join(process.cwd(), 'recipes.json'),
      JSON.stringify(recipes, null, 2),
    )
  } catch (writeErr) {
    console.error('Failed to write recipes.json:', writeErr)
    throw writeErr
  }

  return recipes
}
