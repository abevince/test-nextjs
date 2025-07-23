import {
  createRecipe,
  fetchRecipe,
  fetchRecipes,
  updateRecipe,
} from '@/api/recipes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useRecipes = (
  sort: {
    by: 'title' | 'timeCreated'
    order: 'asc' | 'desc'
  },
  search: string = '',
  filter: string = '',
) => {
  return useQuery({
    queryKey: ['recipes', sort, search, filter],
    queryFn: async () => {
      let response = await fetchRecipes()
      if (search) {
        response = response.filter((recipe) =>
          recipe.title.toLowerCase().includes(search.toLowerCase()),
        )
      }
      if (filter) {
        response = response.filter((recipe) => recipe.favorite === 'true')
      }
      return response.sort((a, b) => {
        if (sort.order === 'asc') {
          return a[sort.by].localeCompare(b[sort.by])
        }
        return b[sort.by].localeCompare(a[sort.by])
      })
    },
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
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        queryClient.invalidateQueries({ queryKey: ['recipe'] }),
      ])
    },
  })
}

export { useCreateRecipe, useRecipe, useRecipes, useUpdateRecipe }
