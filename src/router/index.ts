/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard to protect routes
router.beforeEach(async (to, from, next) => {
  const { user, authInitialized } = useAuth()

  // Wait for auth to initialize
  if (!authInitialized.value) {
    // Wait for auth state to be determined
    await new Promise<void>(resolve => {
      const checkAuth = () => {
        if (authInitialized.value) {
          resolve()
        } else {
          setTimeout(checkAuth, 50)
        }
      }
      checkAuth()
    })
  }

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/config']
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))

  // Redirect to home if trying to access protected route without auth
  if (isProtectedRoute && !user.value) {
    next('/')
    return
  }

  // Redirect to dashboard if already logged in and trying to access login/signup
  if ((to.path === '/' || to.path === '/signup') && user.value) {
    next('/dashboard')
    return
  }

  next()
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
