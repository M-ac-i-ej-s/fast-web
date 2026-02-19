<template>
  <v-container class="pa-0" fluid>
    <!-- App Bar -->
    <v-app-bar
      class="px-4 px-md-8"
      color="surface"
      elevation="1"
    >
      <v-toolbar-title class="text-h5 font-weight-bold">
        <span class="gradient-text">BuildAI</span>
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        class="mr-2"
        icon
        @click="toggleTheme"
      >
        <v-icon>{{ theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            icon
            v-bind="props"
          >
            <v-avatar color="primary" size="40">
              <span class="text-h6">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title class="font-weight-bold">
              {{ user?.displayName || 'User' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user?.email }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider />

          <v-list-item prepend-icon="mdi-cog" @click="settingsDialog = true">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-list-item prepend-icon="mdi-logout" @click="handleLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-container class="py-8">
      <v-row class="mb-6">
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold mb-2">
            Welcome back, {{ user?.displayName?.split(' ')[0] || 'there' }}! 👋
          </h1>
          <p class="text-h6 text-medium-emphasis">
            Let's build something amazing today
          </p>
        </v-col>
      </v-row>

      <!-- Stats Cards -->
      <v-row class="mb-8">
        <v-col
          v-for="stat in stats"
          :key="stat.title"
          cols="12"
          md="3"
          sm="6"
        >
          <v-card class="stat-card" elevation="2" rounded="lg">
            <v-card-text>
              <div class="d-flex align-center justify-space-between mb-2">
                <v-icon
                  :color="stat.color"
                  size="32"
                >
                  {{ stat.icon }}
                </v-icon>
                <v-chip
                  :color="stat.color"
                  size="small"
                  variant="tonal"
                >
                  {{ stat.change }}
                </v-chip>
              </div>
              <div class="text-h4 font-weight-bold mb-1">
                {{ stat.value }}
              </div>
              <div class="text-body-2 text-medium-emphasis">
                {{ stat.title }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Pages Section -->
      <v-row class="mb-4">
        <v-col cols="12">
          <h2 class="text-h4 font-weight-bold">
            Your Pages
          </h2>
        </v-col>
      </v-row>

      <!-- Pages Grid -->
      <v-row>
        <!-- Loading State -->
        <v-col v-if="loading" cols="12">
          <v-progress-linear color="primary" indeterminate />
        </v-col>

        <!-- Error State -->
        <v-col v-if="error" cols="12">
          <v-alert
            color="error"
            icon="mdi-alert-circle"
            variant="tonal"
          >
            {{ error }}
          </v-alert>
        </v-col>

        <!-- Empty State -->
        <v-col v-if="!loading && !error && pages.length === 0" cols="12">
          <v-card class="text-center pa-8" elevation="0" rounded="xl">
            <v-icon
              class="mb-4"
              color="primary"
              size="64"
            >
              mdi-web-plus
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-2">
              No pages yet
            </h3>
            <p class="text-body-1 text-medium-emphasis mb-4">
              Create your first page to get started
            </p>
            <v-btn
              color="primary"
              rounded="lg"
              size="large"
              @click="createPageDialog = true"
            >
              <v-icon start>mdi-plus</v-icon>
              Create Your First Page
            </v-btn>
          </v-card>
        </v-col>

        <!-- Pages List -->
        <v-col
          v-for="page in pages"
          :key="page.id"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-card
            class="page-card"
            elevation="2"
            hover
            rounded="xl"
          >
            <v-card-text class="pa-6">
              <div class="d-flex align-center justify-space-between mb-4">
                <v-icon
                  :color="page.color"
                  size="48"
                >
                  {{ page.icon }}
                </v-icon>
                <v-menu>
                  <template #activator="{ props }">
                    <v-btn
                      icon
                      size="small"
                      v-bind="props"
                      variant="text"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item prepend-icon="mdi-pencil" @click="$router.push(`/config/${page.id}`)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-content-duplicate">
                      <v-list-item-title>Duplicate</v-list-item-title>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-delete" @click="confirmDeletePage(page.id)">
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>

              <h3 class="text-h6 font-weight-bold mb-2">
                {{ page.name }}
              </h3>

              <p class="text-body-2 text-medium-emphasis mb-4">
                {{ page.description }}
              </p>

              <div class="d-flex align-center justify-space-between">
                <v-chip
                  :color="page.status === 'live' ? 'success' : 'warning'"
                  size="small"
                  variant="tonal"
                >
                  {{ page.status }}
                </v-chip>
                <span class="text-caption text-medium-emphasis">
                  {{ getRelativeTime(page.updatedAt) }}
                </span>
              </div>
            </v-card-text>

            <v-card-actions class="px-6 pb-6">
              <v-btn
                block
                color="primary"
                rounded="lg"
                variant="outlined"
                @click="$router.push(`/config/${page.id}`)"
              >
                <v-icon start>mdi-eye</v-icon>
                View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Add New Page Card -->
        <v-col
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-card
            class="add-page-card"
            elevation="2"
            height="100%"
            rounded="xl"
            @click="createPageDialog = true"
          >
            <v-card-text class="d-flex flex-column align-center justify-center pa-6" style="min-height: 300px">
              <v-icon
                class="mb-4"
                color="primary"
                size="64"
              >
                mdi-plus-circle-outline
              </v-icon>
              <h3 class="text-h6 font-weight-bold mb-2">
                Create New Page
              </h3>
              <p class="text-body-2 text-medium-emphasis text-center">
                Start building a new page with AI
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Create Page Dialog -->
    <v-dialog v-model="createPageDialog" max-width="600">
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6">
          Create New Page
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <v-form ref="createForm" @submit.prevent="handleCreatePage">
            <v-text-field
              v-model="newPage.name"
              class="mb-4"
              label="Page Name"
              prepend-inner-icon="mdi-web"
              rounded="lg"
              :rules="[v => !!v || 'Name is required']"
              variant="outlined"
            />

            <v-textarea
              v-model="newPage.description"
              class="mb-4"
              label="Description"
              prepend-inner-icon="mdi-text"
              rounded="lg"
              :rules="[v => !!v || 'Description is required']"
              variant="outlined"
            />

            <v-select
              v-model="newPage.icon"
              class="mb-4"
              :items="iconOptions"
              label="Icon"
              prepend-inner-icon="mdi-palette"
              rounded="lg"
              variant="outlined"
            >
              <template #item="{ item, props: itemProps }">
                <v-list-item v-bind="itemProps">
                  <template #prepend>
                    <v-icon>{{ item.value }}</v-icon>
                  </template>
                </v-list-item>
              </template>
            </v-select>

            <v-select
              v-model="newPage.color"
              class="mb-4"
              :items="colorOptions"
              label="Color"
              prepend-inner-icon="mdi-palette"
              rounded="lg"
              variant="outlined"
            />

            <v-row class="mt-4">
              <v-col cols="6">
                <v-btn
                  block
                  color="grey"
                  rounded="lg"
                  variant="outlined"
                  @click="createPageDialog = false"
                >
                  Cancel
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="primary"
                  :loading="creating"
                  rounded="lg"
                  type="submit"
                >
                  Create Page
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Settings Dialog -->
    <v-dialog v-model="settingsDialog" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6">
          Settings
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <p class="text-body-1 text-medium-emphasis">
            Settings page coming soon...
          </p>
        </v-card-text>

        <v-card-actions class="px-6 pb-6">
          <v-btn
            block
            color="primary"
            rounded="lg"
            @click="settingsDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteConfirmDialog" max-width="400">
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6">
          Delete Page?
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <p class="text-body-1 text-medium-emphasis">
            Are you sure you want to delete this page? This action cannot be undone.
          </p>
        </v-card-text>

        <v-card-actions class="px-6 pb-6">
          <v-row>
            <v-col cols="6">
              <v-btn
                block
                color="grey"
                rounded="lg"
                variant="outlined"
                @click="deleteConfirmDialog = false"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                color="error"
                :loading="loading"
                rounded="lg"
                @click="handleDeletePage"
              >
                Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useTheme } from 'vuetify'

  import { useAuth } from '@/composables/useAuth'
  import { usePages } from '@/composables/usePages'

  const router = useRouter()
  const theme = useTheme()
  const { user, logout } = useAuth()
  const { pages, loading, error, totalPages, livePages, draftPages, subscribeToPages, createPage: createPageInFirestore, deletePage: deletePageFromFirestore, getRelativeTime } = usePages()

  const createPageDialog = ref(false)
  const settingsDialog = ref(false)
  const creating = ref(false)
  const createForm = ref()
  const deleteConfirmDialog = ref(false)
  const pageToDelete = ref<string | null>(null)

  let unsubscribe: (() => void) | null = null

  const newPage = ref({
    name: '',
    description: '',
    icon: 'mdi-web',
    color: 'primary',
  })

  const stats = computed(() => [
    {
      title: 'Total Pages',
      value: totalPages.value.toString(),
      icon: 'mdi-web',
      color: 'primary',
      change: `${totalPages.value} total`,
    },
    {
      title: 'Live Pages',
      value: livePages.value.toString(),
      icon: 'mdi-chart-line',
      color: 'success',
      change: `${livePages.value} live`,
    },
    {
      title: 'Draft Pages',
      value: draftPages.value.toString(),
      icon: 'mdi-folder-open',
      color: 'warning',
      change: `${draftPages.value} drafts`,
    },
    {
      title: 'Deploy Time',
      value: '2.3s',
      icon: 'mdi-rocket',
      color: 'secondary',
      change: 'avg time',
    },
  ])

  const iconOptions = [
    { title: 'Web', value: 'mdi-web' },
    { title: 'Home', value: 'mdi-home' },
    { title: 'Blog', value: 'mdi-post' },
    { title: 'Shop', value: 'mdi-shopping' },
    { title: 'Contact', value: 'mdi-email' },
    { title: 'About', value: 'mdi-information' },
    { title: 'Gallery', value: 'mdi-image-multiple' },
    { title: 'Services', value: 'mdi-briefcase' },
  ]

  const colorOptions = [
    { title: 'Primary', value: 'primary' },
    { title: 'Secondary', value: 'secondary' },
    { title: 'Accent', value: 'accent' },
    { title: 'Success', value: 'success' },
    { title: 'Warning', value: 'warning' },
    { title: 'Error', value: 'error' },
  ]

  const userInitials = computed(() => {
    if (!user.value?.displayName) return 'U'
    const names = user.value.displayName.split(' ').filter(Boolean)
    if (names.length > 1) {
      const firstName = names[0]
      const secondName = names[1]
      const first = firstName?.[0] ?? ''
      const second = secondName?.[0] ?? ''
      return `${first}${second}`
    }
    const firstName = names[0]
    return firstName?.[0] ?? 'U'
  })

  function toggleTheme () {
    theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
  }

  async function handleLogout () {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  async function handleCreatePage () {
    const { valid } = await createForm.value.validate()
    if (!valid) return

    creating.value = true

    try {
      const pageId = await createPageInFirestore({
        name: newPage.value.name,
        description: newPage.value.description,
        icon: newPage.value.icon,
        color: newPage.value.color,
      })

      if (pageId) {
        createPageDialog.value = false
        newPage.value = {
          name: '',
          description: '',
          icon: 'mdi-web',
          color: 'primary',
        }
      }
    } catch (error_) {
      console.error('Error creating page:', error_)
    } finally {
      creating.value = false
    }
  }

  function confirmDeletePage (id: string) {
    pageToDelete.value = id
    deleteConfirmDialog.value = true
  }

  async function handleDeletePage () {
    if (!pageToDelete.value) return

    const success = await deletePageFromFirestore(pageToDelete.value)
    if (success) {
      deleteConfirmDialog.value = false
      pageToDelete.value = null
    }
  }

  onMounted(() => {
    // Subscribe to real-time updates
    unsubscribe = subscribeToPages()
  })

  onUnmounted(() => {
    // Cleanup subscription
    if (unsubscribe) {
      unsubscribe()
    }
  })
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #7C3AED 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-on-surface), 0.15);
}

.page-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  cursor: pointer;
}

.page-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(var(--v-theme-on-surface), 0.15);
}

.add-page-card {
  transition: all 0.3s ease;
  border: 2px dashed rgba(var(--v-theme-primary), 0.3);
  cursor: pointer;
  background: rgba(var(--v-theme-primary), 0.05);
}

.add-page-card:hover {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background: rgba(var(--v-theme-primary), 0.1);
  transform: translateY(-4px);
}
</style>
