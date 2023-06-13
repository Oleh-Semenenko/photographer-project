import { defineStore } from 'pinia'
import { successNotification } from '../utils/notification'
const client = useSupabaseAuthClient()

export const useAuthStore = defineStore('authStore', () => {
  async function register ({ email, password, firstName, secondName }) {
    const result = await client.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/photographer',
        data: {
          first_name: firstName,
          second_name: secondName
        }
      }
    })

    if (result.data) {
      return navigateTo('/verify')
    }

    return result
  }

  async function login ({ email, password }) {
    const result = await client.auth.signInWithPassword({
      email,
      password
    })

    if (result.data) {
      return navigateTo('/photographer')
    }

    return result
  }

  async function logout () {
    const { error } = await client.auth.signOut()

    if (error) {
      errorNotification()
      throw new Error(error.message)
    }

    successNotification('You have successfully logged out')

    await navigateTo('/login')
  }
  return {
    register,
    login,
    logout
  }
})
