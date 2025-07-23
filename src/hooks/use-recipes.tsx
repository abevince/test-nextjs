import {
  createRecipe,
  fetchRecipe,
  fetchRecipes,
  updateRecipe,
} from '@/api/recipes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: () => fetchRecipes(),
  })
}

const useRecipe = (slug: string) => {
  return useQuery({
    queryKey: ['recipes', slug],
    queryFn: () => fetchRecipe(slug),
  })
}

const useCreateRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (formData: FormData) => createRecipe(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    },
    onError: (error: any) => {
      console.log('Recipe creation error:', error)
    },
  })
}

const useUpdateRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ formData, slug }: { formData: FormData; slug: string }) =>
      updateRecipe(slug, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
    },
  })
}

export { useCreateRecipe, useRecipe, useRecipes, useUpdateRecipe }
