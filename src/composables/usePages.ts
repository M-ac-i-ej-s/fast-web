/**
 * composables/usePages.ts
 *
 * Composable for managing pages with Firebase Firestore
 */

import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { computed, ref } from 'vue'

import { db } from '@/plugins/firebase'
import { useAuth } from './useAuth'

export interface Page {
  id: string
  name: string
  description: string
  icon: string
  color: string
  status: 'draft' | 'live'
  userId: string
  generatedHtml?: string
  hasGenerated?: boolean
  // Full page configuration
  domain?: string
  primaryColor?: string
  secondaryColor?: string
  hasForm?: boolean
  formEmail?: string
  successMessage?: string
  redirectUrl?: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  enableAnalytics?: boolean
  analyticsId?: string
  customScripts?: string
  createdAt: Date
  updatedAt: Date
}

export interface NewPage {
  name: string
  description: string
  icon: string
  color: string
}

export interface PageUpdate {
  name?: string
  description?: string
  icon?: string
  hasGenerated?: boolean
  color?: string
  status?: 'draft' | 'live'
  domain?: string
  primaryColor?: string
  secondaryColor?: string
  hasForm?: boolean
  formEmail?: string
  successMessage?: string
  redirectUrl?: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  enableAnalytics?: boolean
  analyticsId?: string
  customScripts?: string
}

const pages = ref<Page[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function usePages () {
  const { user } = useAuth()

  const userPages = computed(() => {
    if (!user.value) {
      return []
    }
    return pages.value.filter(page => page.userId === user.value?.uid)
  })

  const totalPages = computed(() => userPages.value.length)

  const livePages = computed(() => userPages.value.filter(page => page.status === 'live').length)

  const draftPages = computed(() => userPages.value.filter(page => page.status === 'draft').length)

  /**
   * Subscribe to user's pages in real-time
   */
  function subscribeToPages () {
    if (!user.value?.uid) {
      pages.value = []
      return () => {}
    }

    loading.value = true
    error.value = null

    const pagesQuery = query(
      collection(db, 'pages'),
      where('userId', '==', user.value.uid),
      orderBy('updatedAt', 'desc'),
    )

    const unsubscribe = onSnapshot(
      pagesQuery,
      snapshot => {
        pages.value = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            icon: data.icon,
            color: data.color,
            status: data.status,
            userId: data.userId,
            generatedHtml: data.generatedHtml,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          }
        })
        loading.value = false
      },
      error_ => {
        console.error('Error fetching pages:', error_)
        error.value = error_.message
        loading.value = false
      },
    )

    return unsubscribe
  }

  /**
   * Fetch all pages for the current user
   */
  async function fetchPages () {
    if (!user.value?.uid) {
      pages.value = []
      return
    }

    loading.value = true
    error.value = null

    try {
      const pagesQuery = query(
        collection(db, 'pages'),
        where('userId', '==', user.value.uid),
        orderBy('updatedAt', 'desc'),
      )

      const snapshot = await getDocs(pagesQuery)
      pages.value = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          icon: data.icon,
          color: data.color,
          status: data.status,
          userId: data.userId,
          generatedHtml: data.generatedHtml,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        }
      })
    } catch (error_: any) {
      console.error('Error fetching pages:', error_)
      error.value = error_.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new page
   */
  async function createPage (newPage: NewPage): Promise<string | null> {
    if (!user.value?.uid) {
      error.value = 'User not authenticated'
      return null
    }

    loading.value = true
    error.value = null

    try {
      const pageData = {
        ...newPage,
        status: 'draft' as const,
        userId: user.value.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, 'pages'), pageData)
      return docRef.id
    } catch (error_: any) {
      console.error('Error creating page:', error_)
      error.value = error_.message
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Update a page
   */
  async function updatePage (pageId: string, updates: PageUpdate): Promise<boolean> {
    if (!user.value?.uid) {
      error.value = 'User not authenticated'
      return false
    }

    loading.value = true
    error.value = null

    try {
      const pageRef = doc(db, 'pages', pageId)
      await updateDoc(pageRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      })
      return true
    } catch (error_: any) {
      console.error('Error updating page:', error_)
      error.value = error_.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a page
   */
  async function deletePage (pageId: string): Promise<boolean> {
    if (!user.value?.uid) {
      error.value = 'User not authenticated'
      return false
    }

    loading.value = true
    error.value = null

    try {
      await deleteDoc(doc(db, 'pages', pageId))
      return true
    } catch (error_: any) {
      console.error('Error deleting page:', error_)
      error.value = error_.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Save generated HTML to a page
   */
  async function saveGeneratedHtml (pageId: string, html: string): Promise<boolean> {
    if (!user.value?.uid) {
      error.value = 'User not authenticated'
      return false
    }

    loading.value = true
    error.value = null

    try {
      const pageRef = doc(db, 'pages', pageId)
      await updateDoc(pageRef, {
        generatedHtml: html,
        updatedAt: serverTimestamp(),
      })
      return true
    } catch (error_: any) {
      console.error('Error saving generated HTML:', error_)
      error.value = error_.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch a single page by ID from Firestore
   */
  async function fetchPageById (pageId: string): Promise<Page | null> {
    try {
      const pageRef = doc(db, 'pages', pageId)
      const pageSnapshot = await getDoc(pageRef)
      
      if (!pageSnapshot.exists()) {
        console.warn('Page not found:', pageId)
        return null
      }

      const data = pageSnapshot.data()
      return {
        id: pageSnapshot.id,
        name: data.name,
        description: data.description,
        icon: data.icon,
        color: data.color,
        status: data.status,
        userId: data.userId,
        generatedHtml: data.generatedHtml,
        domain: data.domain,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        hasForm: data.hasForm,
        formEmail: data.formEmail,
        successMessage: data.successMessage,
        redirectUrl: data.redirectUrl,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        enableAnalytics: data.enableAnalytics,
        analyticsId: data.analyticsId,
        customScripts: data.customScripts,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      }
    } catch (error_: any) {
      console.error('Error fetching page by ID:', error_)
      return null
    }
  }

  /**
   * Get a single page by ID
   */
  function getPageById (pageId: string): Page | undefined {
    return pages.value.find(page => page.id === pageId)
  }

  /**
   * Get relative time string
   */
  function getRelativeTime (date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSeconds < 60) {
      return 'Just now'
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    }
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    }
    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    }
    return date.toLocaleDateString()
  }

  return {
    pages: userPages,
    loading,
    error,
    totalPages,
    livePages,
    draftPages,
    subscribeToPages,
    fetchPages,
    createPage,
    updatePage,
    deletePage,
    saveGeneratedHtml,
    fetchPageById,
    getPageById,
    getRelativeTime,
  }
}
