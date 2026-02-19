/**
 * composables/useAuth.ts
 *
 * Authentication composable with Firebase
 */

import { onAuthStateChanged, type User } from 'firebase/auth'
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

import { auth } from '@/plugins/firebase'

const user = ref<User | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const authInitialized = ref(false)

// Initialize auth state listener on module load
onAuthStateChanged(auth, firebaseUser => {
  user.value = firebaseUser
  authInitialized.value = true
})

export function useAuth () {
  // Sign up with email and password
  async function signUp (email: string, password: string, displayName: string) {
    loading.value = true
    error.value = null

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update user profile with display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName,
        })
      }

      user.value = userCredential.user
      return userCredential.user
    } catch (error_: any) {
      error.value = error_.message
      throw error_
    } finally {
      loading.value = false
    }
  }

  // Sign in with email and password
  async function signIn (email: string, password: string) {
    loading.value = true
    error.value = null

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return userCredential.user
    } catch (error_: any) {
      error.value = error_.message
      throw error_
    } finally {
      loading.value = false
    }
  }

  // Sign in with Google
  async function signInWithGoogle () {
    loading.value = true
    error.value = null

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      user.value = userCredential.user
      return userCredential.user
    } catch (error_: any) {
      error.value = error_.message
      throw error_
    } finally {
      loading.value = false
    }
  }

  // Sign in with GitHub
  async function signInWithGithub () {
    loading.value = true
    error.value = null

    try {
      const provider = new GithubAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      user.value = userCredential.user
      return userCredential.user
    } catch (error_: any) {
      error.value = error_.message
      throw error_
    } finally {
      loading.value = false
    }
  }

  // Sign out
  async function logout () {
    loading.value = true
    error.value = null

    try {
      await signOut(auth)
      user.value = null
    } catch (error_: any) {
      error.value = error_.message
      throw error_
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    authInitialized,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    logout,
  }
}
