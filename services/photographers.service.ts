import type { IUsersFetch } from '~/types/global.types'

const client = useSupabaseAuthClient()

export const getAllPhotographers = async ({
  page,
  perPage,
  minPrice,
  maxPrice,
  categories,
  freeDay,
  city,
  userId
}: IUsersFetch) => {
  const { data, error } = await client.functions.invoke('get-photographers', {
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

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }

  return data.users
}

export const getOnePhotographer = async ({ userId }: { userId: string }) => {
  const { data, error } = await client.functions.invoke('get-photographers', {
    body: {
      userId
    }
  })

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }

  return data
}
