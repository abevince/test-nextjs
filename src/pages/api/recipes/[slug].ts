import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const data = await fs.readFile(
      path.join(process.cwd(), 'recipes.json'),
      'utf8',
    )
    const recipes = JSON.parse(data)
    const recipe = recipes.find(
      (recipe: any) => recipe.title === req.query.slug,
    )
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' })
    } else {
      res.status(200).json(recipe)
    }
  } else if (req.method === 'PUT') {
    const data = await fs.readFile(
      path.join(process.cwd(), 'recipes.json'),
      'utf8',
    )
    const recipes = JSON.parse(data)
    const recipe = recipes.find(
      (recipe: any) => recipe.title === req.query.slug,
    )
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' })
    } else {
      const updatedRecipe = { ...recipe, ...req.body }
      const updatedRecipes = recipes.map((r: any) =>
        r.title === req.query.slug ? updatedRecipe : r,
      )
      await fs.writeFile(
        path.join(process.cwd(), 'recipes.json'),
        JSON.stringify(updatedRecipes, null, 2),
      )
      res.status(200).json(updatedRecipe)
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
