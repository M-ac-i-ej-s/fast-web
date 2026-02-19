<template>
  <v-container class="pa-0" fluid>
    <!-- App Bar with Login -->
    <v-app-bar
      class="px-4 px-md-8"
      color="transparent"
      elevation="0"
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

      <v-menu offset="6" offset-y>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            rounded="pill"
            variant="elevated"
            v-bind="props"
          >
            <v-icon start>mdi-rocket-launch</v-icon>
            Let's Go!
            <v-icon end>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list rounded="lg">
          <v-list-item
            prepend-icon="mdi-login"
            @click="loginDialog = true"
          >
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>

          <v-list-item
            prepend-icon="mdi-account-plus"
            @click="$router.push('/signup')"
          >
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Hero Section -->
    <v-container class="hero-section">
      <v-row align="center" class="fill-height" justify="center">
        <v-col class="text-center" cols="12" lg="6" md="8">
          <div
            class="fade-in-up"
            :style="{ animationDelay: '0.1s' }"
          >
            <h1 class="text-h2 text-md-h1 font-weight-bold mb-4">
              Build Apps with
              <span class="gradient-text"> AI Power</span>
            </h1>
          </div>

          <div
            class="fade-in-up"
            :style="{ animationDelay: '0.2s' }"
          >
            <p class="text-h6 text-md-h5 mb-8 text-medium-emphasis">
              No code. No hassle. Just intelligent automation.
            </p>
          </div>

          <div
            class="fade-in-up"
            :style="{ animationDelay: '0.3s' }"
          >
            <v-btn
              class="px-8"
              color="primary"
              elevation="8"
              rounded="pill"
              size="x-large"
            >
              <v-icon start>mdi-rocket-launch</v-icon>
              Get Started
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Features Section -->
    <v-container class="py-16">
      <v-row>
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card
            :class="['feature-card', 'fade-in-up']"
            elevation="0"
            height="100%"
            rounded="xl"
            :style="{ animationDelay: `${0.4 + index * 0.1}s` }"
          >
            <v-card-text class="pa-8">
              <div class="feature-icon-wrapper mb-4">
                <v-icon
                  :color="feature.color"
                  :icon="feature.icon"
                  size="48"
                />
              </div>

              <h3 class="text-h5 font-weight-bold mb-3">
                {{ feature.title }}
              </h3>

              <p class="text-body-1 text-medium-emphasis">
                {{ feature.description }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- How It Works Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col class="text-center mb-12" cols="12">
          <h2 class="text-h3 font-weight-bold mb-4">
            From Idea to Live in <span class="gradient-text">4 Steps</span>
          </h2>
          <p class="text-h6 text-medium-emphasis">
            Building your dream website has never been this simple
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" lg="8" md="10">
          <v-timeline
            side="end"
          >
            <v-timeline-item
              v-for="(step, index) in steps"
              :key="index"
              :dot-color="step.color"
              size="large"
            >
              <template #icon>
                <v-icon color="white">{{ step.icon }}</v-icon>
              </template>

              <v-card class="timeline-card" elevation="4" rounded="xl">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-3">
                    <v-chip
                      class="mr-3"
                      :color="step.color"
                      size="small"
                      variant="flat"
                    >
                      Step {{ index + 1 }}
                    </v-chip>
                    <h3 class="text-h5 font-weight-bold">
                      {{ step.title }}
                    </h3>
                  </div>
                  <p class="text-body-1 text-medium-emphasis mb-0">
                    {{ step.description }}
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>

    <!-- Stats Section -->
    <v-container class="py-16">
      <v-row>
        <v-col
          v-for="(stat, index) in stats"
          :key="index"
          cols="6"
          md="3"
        >
          <div class="text-center">
            <div class="text-h3 font-weight-bold gradient-text mb-2">
              {{ stat.value }}
            </div>
            <div class="text-body-1 text-medium-emphasis">
              {{ stat.label }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Testimonials Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col class="text-center mb-12" cols="12">
          <h2 class="text-h3 font-weight-bold mb-4">
            Trusted by Developers Worldwide
          </h2>
          <p class="text-h6 text-medium-emphasis">
            See what our users have to say about BuildAI
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="(testimonial, index) in testimonials"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card class="testimonial-card" elevation="2" height="100%" rounded="xl">
            <v-card-text class="pa-6">
              <v-rating
                class="mb-4"
                color="amber"
                density="compact"
                :model-value="5"
                readonly
              />
              <p class="text-body-1 mb-6">
                "{{ testimonial.text }}"
              </p>
              <div class="d-flex align-center">
                <v-avatar
                  class="mr-3"
                  color="primary"
                  size="40"
                >
                  <span class="text-h6">{{ testimonial.avatar }}</span>
                </v-avatar>
                <div>
                  <div class="font-weight-bold">{{ testimonial.name }}</div>
                  <div class="text-caption text-medium-emphasis">{{ testimonial.role }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA Section -->
    <v-container class="cta-section py-16">
      <v-row justify="center">
        <v-col class="text-center" cols="12" md="8">
          <div class="gradient-bg pa-12 rounded-xl">
            <h2 class="text-h3 font-weight-bold mb-4 text-white">
              Ready to Build?
            </h2>
            <p class="text-h6 mb-8 text-white text-opacity-90">
              Join thousands of developers building faster with AI
            </p>
            <v-btn
              class="px-8"
              color="white"
              rounded="pill"
              size="large"
              variant="elevated"
            >
              Start Building Now
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Footer -->
    <v-footer class="footer-section" color="surface">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <h3 class="text-h5 font-weight-bold mb-4">
              <span class="gradient-text">BuildAI</span>
            </h3>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Building the future of web development with AI-powered automation and intelligent deployment solutions.
            </p>
            <div>
              <v-btn
                v-for="social in socials"
                :key="social.icon"
                class="mr-2"
                color="primary"
                icon
                size="small"
                variant="text"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </div>
          </v-col>

          <v-col cols="6" md="2">
            <h4 class="font-weight-bold mb-4">Product</h4>
            <div class="footer-links">
              <a
                v-for="link in productLinks"
                :key="link"
                href="#"
              >{{ link }}</a>
            </div>
          </v-col>

          <v-col cols="6" md="2">
            <h4 class="font-weight-bold mb-4">Company</h4>
            <div class="footer-links">
              <a
                v-for="link in companyLinks"
                :key="link"
                href="#"
              >{{ link }}</a>
            </div>
          </v-col>

          <v-col cols="6" md="2">
            <h4 class="font-weight-bold mb-4">Resources</h4>
            <div class="footer-links">
              <a
                v-for="link in resourceLinks"
                :key="link"
                href="#"
              >{{ link }}</a>
            </div>
          </v-col>

          <v-col cols="6" md="2">
            <h4 class="font-weight-bold mb-4">Legal</h4>
            <div class="footer-links">
              <a
                v-for="link in legalLinks"
                :key="link"
                href="#"
              >{{ link }}</a>
            </div>
          </v-col>
        </v-row>

        <v-divider class="my-8" />

        <v-row>
          <v-col class="text-center text-md-start" cols="12" md="6">
            <p class="text-body-2 text-medium-emphasis mb-0">
              © {{ new Date().getFullYear() }} FastWeb Company. All rights reserved.
            </p>
          </v-col>
          <v-col class="text-center text-md-end" cols="12" md="6">
            <p class="text-body-2 text-medium-emphasis mb-0">
              Made with <v-icon color="error" size="small">mdi-heart</v-icon> by FastWeb Team
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <!-- Login Dialog -->
    <v-dialog v-model="loginDialog" max-width="500">
      <v-card rounded="xl">
        <v-card-title class="text-h5 font-weight-bold pa-6">
          Welcome Back
        </v-card-title>

        <v-card-text class="px-6 pb-6">
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              class="mb-4"
              label="Email"
              prepend-inner-icon="mdi-email"
              rounded="lg"
              type="email"
              variant="outlined"
            />

            <v-text-field
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              rounded="lg"
              :type="showLoginPassword ? 'text' : 'password'"
              variant="outlined"
            >
              <template #append-inner>
                <v-icon @click="showLoginPassword = !showLoginPassword">
                  {{ showLoginPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
              </template>
            </v-text-field>

            <div class="d-flex justify-space-between align-center mt-4 mb-6">
              <v-checkbox
                v-model="rememberMe"
                hide-details
                label="Remember me"
              />
              <v-btn
                color="primary"
                size="small"
                variant="text"
              >
                Forgot password?
              </v-btn>
            </div>

            <v-alert
              v-if="loginError"
              class="mb-4"
              closable
              color="error"
              type="error"
              @click:close="loginError = ''"
            >
              {{ loginError }}
            </v-alert>

            <v-btn
              block
              class="mb-3"
              color="primary"
              :loading="loginLoading"
              rounded="lg"
              size="large"
              type="submit"
            >
              Sign In
            </v-btn>
          </v-form>

          <v-divider class="my-4" />

          <v-btn
            block
            class="mb-3"
            :loading="loginLoading"
            prepend-icon="mdi-google"
            rounded="lg"
            size="large"
            variant="outlined"
            @click="handleGoogleLogin"
          >
            Continue with Google
          </v-btn>

          <v-btn
            block
            :loading="loginLoading"
            prepend-icon="mdi-github"
            rounded="lg"
            size="large"
            variant="outlined"
            @click="handleGithubLogin"
          >
            Continue with GitHub
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useTheme } from 'vuetify'
  import { useAuth } from '@/composables/useAuth'

  const router = useRouter()
  const theme = useTheme()
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth()

  const loginDialog = ref(false)
  const email = ref('')
  const password = ref('')
  const showLoginPassword = ref(false)
  const rememberMe = ref(false)
  const loginLoading = ref(false)
  const loginError = ref('')

  function toggleTheme () {
    theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
  }

  async function handleLogin () {
    loginLoading.value = true
    loginError.value = ''

    try {
      await signIn(email.value, password.value)
      loginDialog.value = false
      email.value = ''
      password.value = ''
      router.push('/dashboard')
    } catch (error: any) {
      loginError.value = getLoginErrorMessage(error.code)
    } finally {
      loginLoading.value = false
    }
  }

  async function handleGoogleLogin () {
    loginLoading.value = true
    loginError.value = ''

    try {
      await signInWithGoogle()
      loginDialog.value = false
      router.push('/dashboard')
    } catch (error: any) {
      loginError.value = getLoginErrorMessage(error.code)
    } finally {
      loginLoading.value = false
    }
  }

  async function handleGithubLogin () {
    loginLoading.value = true
    loginError.value = ''

    try {
      await signInWithGithub()
      loginDialog.value = false
      router.push('/dashboard')
    } catch (error: any) {
      loginError.value = getLoginErrorMessage(error.code)
    } finally {
      loginLoading.value = false
    }
  }

  function getLoginErrorMessage (code: string): string {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential': {
        return 'Invalid email or password'
      }
      case 'auth/user-disabled': {
        return 'This account has been disabled'
      }
      case 'auth/too-many-requests': {
        return 'Too many attempts. Please try again later'
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

  const features = [
    {
      icon: 'mdi-brain',
      title: 'AI-Powered',
      description: 'Let artificial intelligence handle the heavy lifting. Build complex applications with simple prompts.',
      color: 'primary',
    },
    {
      icon: 'mdi-code-tags',
      title: 'No Code Required',
      description: 'Focus on your ideas, not syntax. Our platform transforms your vision into production-ready code.',
      color: 'secondary',
    },
    {
      icon: 'mdi-rocket-launch-outline',
      title: 'Auto Deployment',
      description: 'Push to production instantly. Automated CI/CD pipelines handle everything from build to deployment.',
      color: 'accent',
    },
  ]

  const steps = [
    {
      icon: 'mdi-web',
      title: 'Choose Your Domain',
      description: 'Pick the perfect domain name for your project. We\'ll help you find available options that match your vision.',
      color: 'primary',
    },
    {
      icon: 'mdi-message-text',
      title: 'Describe Your Vision',
      description: 'Tell us what you want to build using natural language. No technical jargon required - just explain it like you would to a friend.',
      color: 'secondary',
    },
    {
      icon: 'mdi-send',
      title: 'Submit & Watch Magic',
      description: 'Our AI agents get to work immediately, generating your entire application with optimal code structure and best practices.',
      color: 'accent',
    },
    {
      icon: 'mdi-party-popper',
      title: 'Enjoy Your Website',
      description: 'Your site goes live automatically with SSL, CDN, and monitoring. Make changes anytime with simple commands.',
      color: 'primary',
    },
  ]

  const stats = [
    {
      value: '50K+',
      label: 'Websites Built',
    },
    {
      value: '99.9%',
      label: 'Uptime',
    },
    {
      value: '< 5min',
      label: 'Deploy Time',
    },
    {
      value: '24/7',
      label: 'Support',
    },
  ]

  const testimonials = [
    {
      text: 'BuildAI transformed my idea into a production app in minutes. The AI understood exactly what I needed and delivered beyond expectations.',
      name: 'Sarah Chen',
      role: 'Startup Founder',
      avatar: 'SC',
    },
    {
      text: 'As a designer with no coding background, BuildAI gave me superpowers. I can now ship full-stack apps without writing a single line of code.',
      name: 'Marcus Rodriguez',
      role: 'Product Designer',
      avatar: 'MR',
    },
    {
      text: 'The deployment automation alone saves me hours every week. This platform is a game-changer for rapid prototyping and MVP development.',
      name: 'Alex Thompson',
      role: 'Tech Lead',
      avatar: 'AT',
    },
  ]

  const socials = [
    { icon: 'mdi-twitter' },
    { icon: 'mdi-github' },
    { icon: 'mdi-linkedin' },
    { icon: 'mdi-discord' },
  ]

  const productLinks = ['Features', 'Pricing', 'Templates', 'Changelog']
  const companyLinks = ['About', 'Blog', 'Careers', 'Contact']
  const resourceLinks = ['Documentation', 'Tutorials', 'API Reference', 'Community']
  const legalLinks = ['Privacy', 'Terms', 'Security', 'Cookies']
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.gradient-text {
  background: linear-gradient(135deg, #7C3AED 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: linear-gradient(135deg, #7C3AED 0%, #10B981 100%);
  position: relative;
  overflow: hidden;
}

.gradient-bg::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 0.8;
  }
}

.feature-card {
  border: 1px solid rgba(124, 58, 237, 0.1);
  transition: all 0.3s ease;
  background: rgba(var(--v-theme-surface), 0.5);
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);
}

.feature-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.timeline-card {
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.timeline-card:hover {
  border-left-color: rgb(var(--v-theme-primary));
  transform: translateX(8px);
}

.testimonial-card {
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
}

.footer-section {
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  padding: 48px 0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a {
  color: rgba(var(--v-theme-on-surface), 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 14px;
}

.footer-links a:hover {
  color: rgb(var(--v-theme-primary));
}
</style>
