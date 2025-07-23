import { createRecipe, fetchRecipe, fetchRecipes } from '@/api/recipes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: () => fetchRecipes(),
  })
}

const useRecipe = (slug: string) => {
  return useQuery({
    queryKey: ['recipe', slug],
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
  })
}

export { useCreateRecipe, useRecipe, useRecipes }
