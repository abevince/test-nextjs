import formidable, { File } from 'formidable'
import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

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
    const recipe = recipes.find((recipe: any) => recipe.slug === req.query.slug)
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' })
    } else {
      res.status(200).json(recipe)
    }
  } else if (req.method === 'PUT') {
    const imagesDir = path.join(process.cwd(), 'public/images')
    try {
      await fs.mkdir(imagesDir, { recursive: true })
    } catch (mkdirErr) {
      console.error('Failed to create images directory:', mkdirErr)
      res
        .status(500)
        .json({ message: 'Failed to create images directory', error: mkdirErr })
      return
    }

    const form = formidable({
      uploadDir: imagesDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowEmptyFiles: true,
    })

    form.parse(
      req,
      async (err: any, fields: formidable.Fields, files: formidable.Files) => {
        console.log('ERR', err)
        console.log('FIELDS', fields)
        if (err) {
          console.error('Formidable parse error:', err)
          res
            .status(500)
            .json({ message: 'Error parsing form data', error: err })
          return
        }

        try {
          const data = await fs.readFile(
            path.join(process.cwd(), 'recipes.json'),
            'utf8',
          )
          const recipes = JSON.parse(data)
          const recipeIndex = recipes.findIndex(
            (recipe: any) => recipe.slug === req.query.slug,
          )

          if (recipeIndex === -1) {
            res.status(404).json({ message: 'Recipe not found' })
            return
          }

          const existingRecipe = recipes[recipeIndex]

          // Handle image upload if provided
          let imagePath = existingRecipe.image || ''
          let imageFile: File | undefined
          const fileField = files.image
          if (Array.isArray(fileField)) {
            imageFile = fileField[0]
          } else if (fileField) {
            imageFile = fileField as File
          }

          // Only process image upload if file exists and is not empty
          if (imageFile && imageFile.size > 0) {
            const ext = path.extname(
              imageFile.originalFilename || imageFile.newFilename,
            )
            const uniqueName = `${Date.now()}-${Math.random()
              .toString(36)
              .substring(2, 8)}${ext}`
            const destPath = path.join(imagesDir, uniqueName)
            try {
              await fs.rename(imageFile.filepath, destPath)
              imagePath = `/images/${uniqueName}`
            } catch (renameErr) {
              console.error('Failed to move uploaded image:', renameErr)
              res
                .status(500)
                .json({ message: 'Failed to save image', error: renameErr })
              return
            }
          }
          // If file is empty or not provided, keep existing image path

          // Update recipe data
          const updatedRecipe = {
            ...existingRecipe,
            title: fields?.title?.[0] || existingRecipe.title,
            description: fields?.description?.[0] || existingRecipe.description,
            ingredients: fields?.ingredients?.[0] || existingRecipe.ingredients,
            instructions:
              fields?.instructions?.[0] || existingRecipe.instructions,
            author: fields?.author?.[0] || existingRecipe.author,
            email: fields?.email?.[0] || existingRecipe.email,
            slug: fields?.slug?.[0] || existingRecipe.slug,
            image: imagePath,
            timeUpdated: new Date().toISOString(),
            favorite: fields?.favorite?.[0] || existingRecipe.favorite,
          }
          console.log('REP', updatedRecipe)

          recipes[recipeIndex] = updatedRecipe

          await fs.writeFile(
            path.join(process.cwd(), 'recipes.json'),
            JSON.stringify(recipes, null, 2),
          )

          res.status(200).json(updatedRecipe)
        } catch (updateErr) {
          console.error('Failed to update recipe:', updateErr)
          res
            .status(500)
            .json({ message: 'Failed to update recipe', error: updateErr })
        }
      },
    )
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
