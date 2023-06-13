import { defineStore } from 'pinia'
const client = useSupabaseClient()

export const useCategoriesStore = defineStore('categoriesStore', () => {
  async function getCategories () {
    const { data, error } = await client
      .from('categories')
      .select()

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }

    return data
  }

  async function uploadPhotos (file, folder) {
    const { data, error } = await client
      .storage
      .from('photo-examples')
      .upload(`${folder}/photo_${Date.now()}${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }

    return data
  }

  async function getAllPhotos (folder) {
    const { data, error } = await client
      .storage
      .from('photo-examples')
      .list(`${folder}`, {
        limit: 100,
        offset: 0
      })

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }

    return data
  }

  async function getPhotoUrl (imageName) {
    const photoUrl = await client.storage.from('photo-examples').getPublicUrl(`${imageName}`)

    return photoUrl.data.publicUrl
  }

  const categories = ref([])
  async function fetchCategories () {
    try {
      categories.value = await getCategories()
    } catch (error) {
      console.error(error)
    }
  }
  fetchCategories()

  return {
    uploadPhotos,
    getAllPhotos,
    getPhotoUrl,
    categories
  }
})
