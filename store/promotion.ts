import { defineStore } from 'pinia'
const client = useSupabaseClient()

export const usePromotionStore = defineStore('promotionStore', () => {
  async function getPromotionTypes () {
    const { data, error } = await client
      .from('promotion-types')
      .select()

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }

    return data
  }

  return {
    getPromotionTypes
  }
})
