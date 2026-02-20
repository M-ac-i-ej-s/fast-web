<template>
  <v-container class="pa-0 page-bg" fluid>
    <!-- App Bar with Login -->
    <v-app-bar
      class="px-4 px-md-8"
      color="transparent"
      elevation="0"
    >
      <v-toolbar-title class="text-h5 font-weight-bold brand-title">
        <span class="gradient-text">BuildAI</span>
      </v-toolbar-title>
      <v-spacer />

      <v-menu offset="6" offset-y>
        <template #activator="{ props }">
          <v-btn
            class="mr-2"
            color="primary"
            rounded="pill"
            variant="elevated"
            v-bind="props"
          >
            <v-icon start>mdi-rocket-launch</v-icon>
            <span class="lets-go-text">{{ t('nav.letsGo') }}</span>
            <v-icon end>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list rounded="lg">
          <v-list-item
            prepend-icon="mdi-login"
            @click="loginDialog = true"
          >
            <v-list-item-title>{{ t('nav.login') }}</v-list-item-title>
          </v-list-item>

          <v-list-item
            prepend-icon="mdi-account-plus"
            @click="$router.push('/signup')"
          >
            <v-list-item-title>{{ t('nav.signUp') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
            class="mr-2 flag-button-circle"
            icon
            v-bind="props"
          >
            <div class="flag-circle-wrapper">
              <span :class="`fi fi-${locale === 'en' ? 'gb' : 'pl'} fis`" />
            </div>
          </v-btn>
        </template>

        <v-list rounded="lg">
          <v-list-item
            :active="locale === 'en'"
            @click="setLocale('en')"
          >
            <template #prepend>
              <div class="flag-circle-wrapper-menu">
                <span class="fi fi-gb fis" />
              </div>
            </template>
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>

          <v-list-item
            :active="locale === 'pl'"
            @click="setLocale('pl')"
          >
            <template #prepend>
              <div class="flag-circle-wrapper-menu">
                <span class="fi fi-pl fis" />
              </div>
            </template>
            <v-list-item-title>Polski</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Hero Section -->
    <v-container class="hero-section">
      <v-row align="center" class="fill-height" justify="center">
        <v-col class="text-center" cols="12" lg="7" md="9">
          <div
            class="fade-in-up"
            :style="{ animationDelay: '0.1s' }"
          >
            <h1 class="text-h2 text-md-h1 font-weight-bold mb-4">
              {{ t('hero.title') }}
              <span class="gradient-text"> {{ t('hero.titleHighlight') }}</span>
            </h1>
          </div>

          <div
            class="fade-in-up"
            :style="{ animationDelay: '0.2s' }"
          >
            <p class="text-h6 text-md-h5 mb-8 text-medium-emphasis">
              {{ t('hero.subtitle') }}
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
              @click="scrollToPricing"
            >
              <v-icon start>mdi-rocket-launch</v-icon>
              {{ t('hero.cta') }}
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
            {{ t('howItWorks.title') }} <span class="gradient-text">{{ t('howItWorks.titleHighlight') }}</span>
          </h2>
          <p class="text-h6 text-medium-emphasis">
            {{ t('howItWorks.subtitle') }}
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
                      {{ t('common.step') }} {{ index + 1 }}
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

    <!-- Pricing Section -->
    <v-container id="pricing" class="py-16">
      <v-row justify="center">
        <v-col class="text-center mb-8" cols="12">
          <h2 class="text-h3 font-weight-bold mb-4">
            {{ t('pricing.title') }} <span class="gradient-text">{{ t('pricing.titleHighlight') }}</span>
          </h2>
          <p class="text-h6 text-medium-emphasis">
            {{ t('pricing.subtitle') }}
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <!-- Standard Pricing Card -->
        <v-col class="mb-8" cols="12" lg="10" md="10">
          <v-card class="pricing-card" elevation="8" rounded="xl">
            <v-row class="ma-0" no-gutters>
              <!-- Left Side - Price -->
              <v-col class="pa-8 pa-md-12 d-flex flex-column justify-center align-center pricing-left" cols="12" md="4">
                <div class="text-center">
                  <div class="text-h1 text-md-display-1 font-weight-bold gradient-text mb-4">
                    {{ t('pricing.price') }}
                  </div>
                  <div class="text-h5 text-medium-emphasis mb-6">
                    {{ t('pricing.domainCost') }}
                  </div>
                  <v-btn
                    block
                    class="text-h6 py-6"
                    color="primary"
                    rounded="lg"
                    size="x-large"
                    to="/signup"
                    variant="elevated"
                  >
                    <v-icon start>mdi-login</v-icon>
                    {{ t('auth.login.button') }}
                  </v-btn>
                </div>
              </v-col>

              <!-- Right Side - Features -->
              <v-col class="pa-8 pa-md-12" cols="12" md="8">
                <h3 class="text-h5 font-weight-bold mb-6">{{ t('pricing.whatsIncluded') }}</h3>
                <v-row>
                  <v-col
                    v-for="(feature, index) in pricingFeatures"
                    :key="index"
                    cols="12"
                    sm="6"
                  >
                    <div class="d-flex align-start mb-2">
                      <v-icon
                        :color="feature.color"
                        class="mr-3 mt-1"
                        size="20"
                      >
                        {{ feature.icon }}
                      </v-icon>
                      <div>
                        <div class="font-weight-bold text-body-1 mb-1">
                          {{ feature.title }}
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                          {{ feature.description }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Custom Pricing Card -->
        <v-col cols="12" lg="10" md="10">
          <v-card class="pricing-card" elevation="8" rounded="xl">
            <v-row class="ma-0" no-gutters>
              <!-- Left Side - Custom Label -->
              <v-col class="pa-8 pa-md-12 d-flex flex-column justify-center align-center pricing-left" cols="12" md="4">
                <div class="text-center">
                  <div class="text-h1 text-md-display-1 font-weight-bold gradient-text mb-4">
                    {{ t('pricing.custom.title') }}
                  </div>
                  <div class="text-h5 text-medium-emphasis mb-6">
                    {{ t('pricing.custom.subtitle') }}
                  </div>
                  <v-btn
                    block
                    class="text-h6 py-6"
                    color="secondary"
                    rounded="lg"
                    size="x-large"
                    variant="elevated"
                    @click="scrollToContact"
                  >
                    <v-icon start>mdi-email-outline</v-icon>
                    {{ t('pricing.custom.cta') }}
                  </v-btn>
                </div>
              </v-col>

              <!-- Right Side - Features -->
              <v-col class="pa-8 pa-md-12" cols="12" md="8">
                <h3 class="text-h5 font-weight-bold mb-6">{{ t('pricing.custom.whatsIncluded') }}</h3>
                <v-row>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-start mb-2">
                      <v-icon class="mr-3 mt-1" color="primary" size="20">mdi-calculator</v-icon>
                      <div>
                        <div class="font-weight-bold text-body-1 mb-1">
                          {{ t('pricing.custom.features.aiPricing.title') }}
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                          {{ t('pricing.custom.features.aiPricing.description') }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-start mb-2">
                      <v-icon class="mr-3 mt-1" color="secondary" size="20">mdi-puzzle-outline</v-icon>
                      <div>
                        <div class="font-weight-bold text-body-1 mb-1">
                          {{ t('pricing.custom.features.complex.title') }}
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                          {{ t('pricing.custom.features.complex.description') }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-start mb-2">
                      <v-icon class="mr-3 mt-1" color="accent" size="20">mdi-database-outline</v-icon>
                      <div>
                        <div class="font-weight-bold text-body-1 mb-1">
                          {{ t('pricing.custom.features.backend.title') }}
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                          {{ t('pricing.custom.features.backend.description') }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-start mb-2">
                      <v-icon class="mr-3 mt-1" color="success" size="20">mdi-account-tie</v-icon>
                      <div>
                        <div class="font-weight-bold text-body-1 mb-1">
                          {{ t('pricing.custom.features.team.title') }}
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                          {{ t('pricing.custom.features.team.description') }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-start mb-2">
                      <v-icon class="mr-3 mt-1" color="info" size="20">mdi-infinity</v-icon>
                      <div>
                        <div class="font-weight-bold text-body-1 mb-1">
                          {{ t('pricing.custom.features.revisions.title') }}
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                          {{ t('pricing.custom.features.revisions.description') }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="d-flex align-start mb-2">
                      <v-icon class="mr-3 mt-1" color="warning" size="20">mdi-shield-star-outline</v-icon>
                      <div>
                        <div class="font-weight-bold text-body-1 mb-1">
                          {{ t('pricing.custom.features.support.title') }}
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                          {{ t('pricing.custom.features.support.description') }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Testimonials Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col class="text-center mb-12" cols="12">
          <h2 class="text-h3 font-weight-bold mb-4">
            {{ t('testimonials.title') }}
          </h2>
          <p class="text-h6 text-medium-emphasis">
            {{ t('testimonials.subtitle') }}
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
              {{ t('cta.title') }}
            </h2>
            <p class="text-h6 mb-8 text-white text-opacity-90">
              {{ t('cta.subtitle') }}
            </p>
            <v-btn
              class="px-8"
              color="white"
              rounded="pill"
              size="large"
              to="/signup"
              variant="elevated"
            >
              {{ t('cta.button') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contact Section -->
    <v-container id="contact" class="py-16">
      <v-row justify="center">
        <v-col class="text-center mb-8" cols="12">
          <h2 class="text-h3 font-weight-bold mb-4">
            {{ t('pricing.custom.cta') }}
          </h2>
          <p class="text-h6 text-medium-emphasis">
            {{ locale === 'en' ? 'Tell us about your project and we will get back to you.' : 'Opowiedz nam o swoim projekcie, a my się z Tobą skontaktujemy.' }}
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="contact-card" elevation="6" rounded="xl">
            <v-card-text class="pa-8">
              <v-form>
                <v-text-field
                  class="mb-4"
                  :label="locale === 'en' ? 'Full Name' : 'Imię i nazwisko'"
                  prepend-inner-icon="mdi-account"
                  rounded="lg"
                  variant="outlined"
                />

                <v-text-field
                  class="mb-4"
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  rounded="lg"
                  type="email"
                  variant="outlined"
                />

                <v-text-field
                  class="mb-4"
                  :label="locale === 'en' ? 'Company (Optional)' : 'Firma (Opcjonalnie)'"
                  prepend-inner-icon="mdi-domain"
                  rounded="lg"
                  variant="outlined"
                />

                <v-textarea
                  class="mb-6"
                  :label="locale === 'en' ? 'Project Message' : 'Wiadomość o projekcie'"
                  prepend-inner-icon="mdi-message-text"
                  rounded="lg"
                  rows="5"
                  variant="outlined"
                />

                <v-btn
                  block
                  class="text-h6 py-4"
                  color="primary"
                  rounded="lg"
                  size="large"
                  variant="elevated"
                >
                  <v-icon start>mdi-send</v-icon>
                  {{ locale === 'en' ? 'Send Message' : 'Wyślij wiadomość' }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
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
              {{ t('footer.tagline') }}
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
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useTheme } from 'vuetify'
  import { useAuth } from '@/composables/useAuth'
  import { useLocale } from '@/composables/useLocale'

  const router = useRouter()
  const theme = useTheme()
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth()
  const { locale, setLocale, toggleLocale, t, tm } = useLocale()

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

  function scrollToPricing () {
    const target = document.getElementById('pricing')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function scrollToContact () {
    const target = document.getElementById('contact')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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

  const features = computed(() => [
    {
      icon: 'mdi-brain',
      title: t('features.aiPowered.title'),
      description: t('features.aiPowered.description'),
      color: 'primary',
    },
    {
      icon: 'mdi-code-tags',
      title: t('features.instantDeploy.title'),
      description: t('features.instantDeploy.description'),
      color: 'secondary',
    },
    {
      icon: 'mdi-rocket-launch-outline',
      title: t('features.smartOptimization.title'),
      description: t('features.smartOptimization.description'),
      color: 'accent',
    },
  ])

  const steps = computed(() => [
    {
      icon: 'mdi-message-text',
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      color: 'secondary',
    },
    {
      icon: 'mdi-send',
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      color: 'accent',
    },
    {
      icon: 'mdi-party-popper',
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      color: 'primary',
    },
    {
      icon: 'mdi-rocket-launch',
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      color: 'success',
    },
  ])

  const pricingFeatures = computed(() => [
    {
      icon: 'mdi-clock-fast',
      color: 'primary',
      title: t('pricing.features.deployTime.title'),
      description: t('pricing.features.deployTime.description'),
    },
    {
      icon: 'mdi-headset',
      color: 'secondary',
      title: t('pricing.features.support.title'),
      description: t('pricing.features.support.description'),
    },
    {
      icon: 'mdi-account-star',
      color: 'accent',
      title: t('pricing.features.developers.title'),
      description: t('pricing.features.developers.description'),
    },
    {
      icon: 'mdi-pencil-ruler',
      color: 'success',
      title: t('pricing.features.modifications.title'),
      description: t('pricing.features.modifications.description'),
    },
    {
      icon: 'mdi-shield-check',
      color: 'info',
      title: t('pricing.features.ssl.title'),
      description: t('pricing.features.ssl.description'),
    },
    {
      icon: 'mdi-responsive',
      color: 'warning',
      title: t('pricing.features.mobile.title'),
      description: t('pricing.features.mobile.description'),
    },
    {
      icon: 'mdi-speedometer',
      color: 'error',
      title: t('pricing.features.fast.title'),
      description: t('pricing.features.fast.description'),
    },
    {
      icon: 'mdi-google',
      color: 'primary',
      title: t('pricing.features.seo.title'),
      description: t('pricing.features.seo.description'),
    },
  ])

  const testimonials = computed(() => tm('testimonials.items') as Array<{ text: string; name: string; role: string; avatar?: string }>)

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
.page-bg {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(1200px circle at 10% 10%, rgba(124, 58, 237, 0.18), transparent 55%),
    radial-gradient(900px circle at 90% 20%, rgba(16, 185, 129, 0.16), transparent 55%),
    radial-gradient(700px circle at 50% 80%, rgba(124, 58, 237, 0.12), transparent 60%);
}

.page-bg::before {
  content: '';
  position: absolute;
  inset: -10% 0 0 0;
  background:
    radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.18) 1px, transparent 0) 0 0 / 22px 22px;
  opacity: 0.25;
  pointer-events: none;
  mask-image: radial-gradient(closest-side, rgba(0,0,0,0.75), transparent 85%);
}

.page-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), transparent 35%, rgba(0,0,0,0.06));
  pointer-events: none;
}

.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
}

#pricing {
  scroll-margin-top: 16px;
}

@media (max-width: 600px) {
  .brand-title {
    display: none;
  }

  .lets-go-text {
    display: none;
  }
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

.pricing-card {
  border: 2px solid transparent;
  background: rgb(var(--v-theme-surface)) padding-box,
              linear-gradient(135deg, #7C3AED 0%, #10B981 100%) border-box;
  transition: all 0.3s ease;
  overflow: hidden;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(124, 58, 237, 0.3) !important;
}

.pricing-left {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
  border-right: 2px solid rgba(124, 58, 237, 0.1);
}

@media (max-width: 960px) {
  .pricing-left {
    border-right: none;
    border-bottom: 2px solid rgba(124, 58, 237, 0.1);
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

.contact-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.15);
  background: rgba(var(--v-theme-surface), 0.85);
  backdrop-filter: blur(10px);
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

.flag-circle-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
}

.flag-circle-wrapper .fi {
  font-size: 30px;
  position: absolute;
  transform: scale(1);
}

.flag-circle-wrapper-menu {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  margin-right: 12px;
}

.flag-circle-wrapper-menu .fi {
  font-size: 39px;
  position: absolute;
  transform: scale(1);
}

.flag-button-circle:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
