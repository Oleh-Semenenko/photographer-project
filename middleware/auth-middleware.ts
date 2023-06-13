export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (!user.value) {
    navigateTo('/login')
  } else if (to.path === '/login' && user.value) {
    return navigateTo('/photographer')
  }
})
