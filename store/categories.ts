import { defineStore } from 'pinia'
import type { ICategory } from '~/types/global.types'
import { getCategories } from '../services/categories.service'

export const useCategoriesStore = defineStore('categoriesStore', () => {
  const categories = ref<ICategory[]>([])
  async function fetchCategories () {
    try {
      categories.value = await getCategories()
      console.log(categories.value)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    categories,
    fetchCategories
  }
})
