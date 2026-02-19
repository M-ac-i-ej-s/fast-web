<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="5" md="7" sm="10">
        <v-card class="signup-card" elevation="8" rounded="xl">
          <v-card-text class="pa-8 pa-md-12">
            <div class="text-center mb-8">
              <h1 class="text-h4 font-weight-bold mb-2">
                <span class="gradient-text">Create Account</span>
              </h1>
              <p class="text-body-1 text-medium-emphasis">
                Start building with AI today
              </p>
            </div>

            <v-form ref="form" @submit.prevent="handleSignup">
              <v-text-field
                v-model="name"
                class="mb-4"
                label="Full Name"
                prepend-inner-icon="mdi-account"
                rounded="lg"
                :rules="nameRules"
                type="text"
                variant="outlined"
              />

              <v-text-field
                v-model="email"
                class="mb-4"
                label="Email"
                prepend-inner-icon="mdi-email"
                rounded="lg"
                :rules="emailRules"
                type="email"
                variant="outlined"
              />

              <v-text-field
                v-model="password"
                class="mb-4"
                label="Password"
                prepend-inner-icon="mdi-lock"
                rounded="lg"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
              >
                <template #append-inner>
                  <v-icon @click="showPassword = !showPassword">
                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </template>
              </v-text-field>

              <v-text-field
                v-model="confirmPassword"
                class="mb-4"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock-check"
                rounded="lg"
                :rules="confirmPasswordRules"
                :type="showConfirmPassword ? 'text' : 'password'"
                variant="outlined"
              >
                <template #append-inner>
                  <v-icon @click="showConfirmPassword = !showConfirmPassword">
                    {{ showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </template>
              </v-text-field>

              <v-checkbox
                v-model="acceptTerms"
                class="mb-4"
                hide-details
              >
                <template #label>
                  <span class="text-body-2">
                    I agree to the
                    <a class="text-primary" href="#">Terms of Service</a>
                    and
                    <a class="text-primary" href="#">Privacy Policy</a>
                  </span>
                </template>
              </v-checkbox>

              <v-alert
                v-if="errorMessage"
                class="mb-4"
                closable
                color="error"
                type="error"
                @click:close="errorMessage = ''"
              >
                {{ errorMessage }}
              </v-alert>

              <v-btn
                block
                class="mb-4"
                color="primary"
                :disabled="!acceptTerms"
                :loading="loading"
                rounded="lg"
                size="large"
                type="submit"
              >
                Create Account
              </v-btn>

              <v-divider class="my-6">
                <template #default>
                  <span class="text-medium-emphasis text-body-2">OR</span>
                </template>
              </v-divider>

              <v-btn
                block
                class="mb-3"
                :loading="loading"
                prepend-icon="mdi-google"
                rounded="lg"
                size="large"
                variant="outlined"
                @click="handleGoogleSignup"
              >
                Continue with Google
              </v-btn>

              <v-btn
                block
                :loading="loading"
                prepend-icon="mdi-github"
                rounded="lg"
                size="large"
                variant="outlined"
                @click="handleGithubSignup"
              >
                Continue with GitHub
              </v-btn>

              <div class="text-center mt-6">
                <span class="text-body-2 text-medium-emphasis">
                  Already have an account?
                </span>
                <v-btn
                  class="ml-2"
                  color="primary"
                  size="small"
                  variant="text"
                  @click="$router.push('/')"
                >
                  Sign In
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuth } from '@/composables/useAuth'

  const router = useRouter()
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth()

  const form = ref()
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const acceptTerms = ref(false)
  const loading = ref(false)
  const errorMessage = ref('')

  const nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length >= 2) || 'Name must be at least 2 characters',
  ]

  const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
  ]

  const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
    (v: string) => /[A-Z]/.test(v) || 'Password must contain an uppercase letter',
    (v: string) => /[a-z]/.test(v) || 'Password must contain a lowercase letter',
    (v: string) => /[0-9]/.test(v) || 'Password must contain a number',
  ]

  const confirmPasswordRules = [
    (v: string) => !!v || 'Please confirm your password',
    (v: string) => v === password.value || 'Passwords do not match',
  ]

  async function handleSignup () {
    const { valid } = await form.value.validate()

    if (!valid) return

    loading.value = true
    errorMessage.value = ''

    try {
      await signUp(email.value, password.value, name.value)
      // Redirect to dashboard after successful signup
      router.push('/dashboard')
    } catch (error: any) {
      errorMessage.value = getErrorMessage(error.code)
    } finally {
      loading.value = false
    }
  }

  async function handleGoogleSignup () {
    loading.value = true
    errorMessage.value = ''

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (error: any) {
      errorMessage.value = getErrorMessage(error.code)
    } finally {
      loading.value = false
    }
  }

  async function handleGithubSignup () {
    loading.value = true
    errorMessage.value = ''

    try {
      await signInWithGithub()
      router.push('/dashboard')
    } catch (error: any) {
      errorMessage.value = getErrorMessage(error.code)
    } finally {
      loading.value = false
    }
  }

  function getErrorMessage (code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': {
        return 'This email is already registered'
      }
      case 'auth/invalid-email': {
        return 'Invalid email address'
      }
      case 'auth/operation-not-allowed': {
        return 'Email/password accounts are not enabled'
      }
      case 'auth/weak-password': {
        return 'Password is too weak'
      }
      case 'auth/network-request-failed': {
        return 'Network error. Please check your connection'
      }
      case 'auth/popup-closed-by-user': {
        return 'Sign-in popup was closed'
      }
      default: {
        return 'An error occurred. Please try again'
      }
    }
  }
</script>

<style scoped>
.signup-card {
  background: rgba(var(--v-theme-surface), 0.9);
  backdrop-filter: blur(10px);
}

.gradient-text {
  background: linear-gradient(135deg, #7C3AED 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
