const client = useSupabaseAuthClient()

export const getCategories = async () => {
  const { data, error } = await client
    .from('categories')
    .select()

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }

  return data
}

export const uploadPhotos = async (file: File, folder: string) => {
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

export const getPhotoUrl = async (imageName: string) => {
  const photoUrl = await client.storage.from('photo-examples').getPublicUrl(`${imageName}`)

  return photoUrl.data.publicUrl
}
