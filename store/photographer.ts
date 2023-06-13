import { defineStore } from 'pinia'
import { errorNotification } from '../utils/notification'

const client = useSupabaseAuthClient()

export const usePhotographerStore = defineStore('photographerStore', () => {
  async function updateUser (metaData) {
    const { socMedia, ...meta } = metaData
    const { data, error } = await client.auth.updateUser({
      data: {
        ...meta,
        socMedia
      }
    })

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }
    return data
  }

  async function updateUserEmail (email) {
    const { data, error } = await client.auth.updateUser({
      email
    })

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }

    return data
  }

  async function updateUserOptionalData (metaData) {
    const { data, error } = await client.auth.updateUser({
      data: {
        ...metaData
      }
    })

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }
    return data
  }

  async function uploadAvatar (file, ownerId) {
    const { data, error } = await client.storage.from('avatars').upload(`avatar_${ownerId}.jpg`, file)
    if (error) {
      return error
    }
    return data
  }

  async function updateAvatar (file, ownerId) {
    const { data, error } = await client
      .storage
      .from('avatars')
      .update(`avatar_${ownerId}.jpg`, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      return error
    }

    return data
  }

  async function getAvatarUrl (imageName) {
    const avatarUrl = await client.storage.from('avatars').getPublicUrl(`${imageName}`)

    return avatarUrl.data.publicUrl
  }

  return {
    updateUser,
    updateUserEmail,
    updateUserOptionalData,
    uploadAvatar,
    updateAvatar,
    getAvatarUrl
  }
})
