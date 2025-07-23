import { addNewRecipe } from '@/helpers/recipe'
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
    res.status(200).json(JSON.parse(data))
  } else if (req.method === 'POST') {
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
    })

    form.parse(
      req,
      async (err: any, fields: formidable.Fields, files: formidable.Files) => {
        console.log('fields', fields)
        if (err) {
          console.error('Formidable parse error:', err)
          res
            .status(500)
            .json({ message: 'Error parsing form data', error: err })
          return
        }

        let imageFile: File | undefined
        const fileField = files.image
        if (Array.isArray(fileField)) {
          imageFile = fileField[0]
        } else if (fileField) {
          imageFile = fileField as File
        }
        let imagePath = ''
        if (imageFile) {
          const ext = path.extname(
            imageFile.originalFilename || imageFile.newFilename,
          )
          const uniqueName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}${ext}`
          const destPath = path.join(imagesDir, uniqueName)
          try {
            await fs.rename(imageFile.filepath, destPath)
          } catch (renameErr) {
            console.error('Failed to move uploaded image:', renameErr)
            res
              .status(500)
              .json({ message: 'Failed to save image', error: renameErr })
            return
          }
          imagePath = `/images/${uniqueName}`
        }
        try {
          const recipeData = {
            title: fields?.title?.[0] || '',
            description: fields?.description?.[0] || '',
            ingredients: fields?.ingredients?.[0] || '',
            instructions: fields?.instructions?.[0] || '',
            author: fields?.author?.[0] || '',
            email: fields?.email?.[0] ?? '',
            slug: fields?.slug?.[0] ?? '',
            image: imagePath,
            timeCreated: new Date().toISOString(),
          }
          await addNewRecipe(recipeData)
          res.status(201).json({ message: 'Recipe added', success: true })
        } catch (addErr) {
          console.error('Failed to add recipe:', addErr)
          res
            .status(500)
            .json({ message: 'Failed to add recipe', error: addErr })
        }
      },
    )
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
