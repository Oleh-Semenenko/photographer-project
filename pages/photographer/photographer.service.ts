import type { IMetaData } from '~/types/global.types'
import { errorNotification } from '../../utils/notification'

const client = useSupabaseAuthClient()

export const updateUserEmail = async (email: string) => {
  const { data, error } = await client.auth.updateUser({
    email
  })

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }

  return data
}

export const updateUser = async (metaData: IMetaData) => {
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

export const uploadAvatar = async (file: File, ownerId: string) => {
  const { data, error } = await client.storage.from('avatars').upload(`avatar_${ownerId}.jpg`, file)
  if (error) {
    return error
  }
  return data
}

export const updateAvatar = async (file: File, ownerId: string) => {
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

export const getAvatarUrl = async (imageName: string) => {
  const avatarUrl = await client.storage.from('avatars').getPublicUrl(`${imageName}`)

  return avatarUrl.data.publicUrl
}
