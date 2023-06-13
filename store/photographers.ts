import { defineStore } from 'pinia'

const client = useSupabaseClient()

export const usePhotographersStore = defineStore('photographersStore', () => {
  async function getAllPhotographers ({ page, perPage, minPrice, maxPrice, categories, freeDay, city, userId }) {
    const res = await client.functions.invoke('get-photographers', {
      body: {
        page,
        perPage,
        minPrice,
        maxPrice,
        categories,
        freeDay,
        city,
        userId
      }
    })

    if (res.error) {
      errorNotification()
      throw new Error(res.error.message)
    }

    return res.data.users
  }

  async function getOneUser ({ userId }) {
    const res = await client.functions.invoke('get-photographers', {
      body: {
        userId
      }
    })

    if (res.error) {
      errorNotification()
      throw new Error(error.message)
    }

    return res.data
  }

  return {
    getAllPhotographers,
    getOneUser
  }
})
