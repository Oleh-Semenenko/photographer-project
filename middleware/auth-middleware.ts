export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value) {
    navigateTo('/auth/login')
  } else if (to.path === '/auth/login' && user.value) {
    return navigateTo('/photographer')
  }
})
