// middleware/admin-auth.ts
export default defineNuxtRouteMiddleware(() => {
  if (process.server) return // skip on server (SSR disabled for admin anyway)
  const token = localStorage.getItem('ivf_token')
  if (!token) return navigateTo('/admin')
})
