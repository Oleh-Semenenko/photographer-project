import type { IOrder } from '~/types/global.types'
import { errorNotification } from '../utils/notification'

const client = useSupabaseAuthClient()

export const createOrder = async (order: IOrder): Promise<IOrder[] | null> => {
  const { data, error } = await client
    .from('orders')
    .insert([
      order as never
    ])

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }
  return data
}

export const getAllOrdersById = async (userId: string) => {
  const { data, error } = await client
    .from('orders')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }
  return data
}

export const updateOrderConfirmation = async (confirmStatus: string, orderId: number) => {
  const { data, error } = await client
    .from('orders')
    .update({ confirmation: confirmStatus })
    .eq('id', orderId)

  if (error) {
    errorNotification()
    throw new Error(error.message)
  }
  return data
}
