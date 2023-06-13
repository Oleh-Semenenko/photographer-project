import { defineStore } from 'pinia'
import { errorNotification } from '../utils/notification'

const client = useSupabaseClient()

export const useOrdersStore = defineStore('ordersStore', () => {
  async function createOrder (order) {
    const { data, error } = await client
      .from('orders')
      .insert([
        { ...order }
      ])

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }
    return data
  }

  async function getAllOrders () {
    const { data, error } = await client
      .from('orders')
      .select('*')

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }
    return data
  }

  async function updateOrderConfirmation (confirmStatus, orderId) {
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

  const orders = ref([])

  async function fetchOrders () {
    try {
      orders.value = await getAllOrders()
    } catch (error) {
      console.error(error)
    }
  }
  fetchOrders()

  return {
    createOrder,
    fetchOrders,
    updateOrderConfirmation,
    orders
  }
})
