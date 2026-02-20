<template>
  <v-container class="pa-0" fluid>
    <!-- App Bar -->
    <v-app-bar
      class="px-4 px-md-8"
      color="surface"
      elevation="1"
    >
      <v-btn
        icon
        variant="text"
        @click="$router.push('/dashboard')"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="text-h5 font-weight-bold ml-4">
        <span class="gradient-text">Page Configuration</span>
      </v-toolbar-title>

      <v-spacer />

      <v-chip
        class="mr-4"
        :color="pageStatus === 'live' ? 'success' : 'warning'"
        variant="flat"
      >
        <v-icon start>{{ pageStatus === 'live' ? 'mdi-check-circle' : 'mdi-clock' }}</v-icon>
        {{ pageStatus }}
      </v-chip>

      <v-btn
        class="mr-2"
        color="primary"
        :disabled="!generatedHtml"
        prepend-icon="mdi-eye"
        rounded="lg"
        variant="outlined"
        @click="handlePreview"
      >
        Preview
      </v-btn>

      <v-btn
        color="primary"
        :loading="deploying"
        prepend-icon="mdi-rocket-launch"
        rounded="lg"
        variant="elevated"
        @click="handleDeploy"
      >
        Deploy
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-container class="py-8">
      <v-row>
        <v-col cols="12">
          <v-card elevation="2" rounded="xl">
            <v-card-text class="pa-8">
              <v-form ref="configForm">
                <!-- Basic Information Section -->
                <div class="mb-8">
                  <h2 class="text-h5 font-weight-bold mb-6">
                    <v-icon class="mr-2" color="primary">mdi-information</v-icon>
                    Basic Information
                  </h2>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="config.name"
                        class="mb-4"
                        label="Page Name"
                        prepend-inner-icon="mdi-text"
                        rounded="lg"
                        :rules="[v => !!v || 'Page name is required']"
                        variant="outlined"
                      />
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="config.domain"
                        class="mb-4"
                        hint="e.g., mypage.buildai.com"
                        label="Domain Name"
                        persistent-hint
                        prepend-inner-icon="mdi-web"
                        rounded="lg"
                        :rules="[v => !!v || 'Domain is required', v => /^[a-zA-Z0-9-_.]+$/.test(v) || 'Invalid domain format']"
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="config.icon"
                        :items="iconOptions"
                        label="Page Icon"
                        prepend-inner-icon="mdi-shape"
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
                        <template #selection="{ item }">
                          <v-icon class="mr-2">{{ item.value }}</v-icon>
                          {{ item.title }}
                        </template>
                      </v-select>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-menu
                            v-model="primaryColorMenu"
                            :close-on-content-click="false"
                          >
                            <template #activator="{ props }">
                              <v-text-field
                                v-model="config.primaryColor"
                                label="Primary Color"
                                prepend-inner-icon="mdi-palette"
                                readonly
                                rounded="lg"
                                v-bind="props"
                                variant="outlined"
                              />
                            </template>
                            <v-color-picker
                              v-model="config.primaryColor"
                              mode="hex"
                              show-swatches
                            />
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu
                            v-model="secondaryColorMenu"
                            :close-on-content-click="false"
                          >
                            <template #activator="{ props }">
                              <v-text-field
                                v-model="config.secondaryColor"
                                label="Secondary Color"
                                prepend-inner-icon="mdi-palette"
                                readonly
                                rounded="lg"
                                v-bind="props"
                                variant="outlined"
                              />
                            </template>
                            <v-color-picker
                              v-model="config.secondaryColor"
                              mode="hex"
                              show-swatches
                            />
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>

                <v-divider class="my-8" />

                <!-- AI Generation Section -->
                <div class="mb-8">
                  <h2 class="text-h5 font-weight-bold mb-2">
                    <v-icon class="mr-2" color="primary">mdi-brain</v-icon>
                    AI Page Description
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-6">
                    Describe how you want your page to look and function. Be as detailed as possible - the AI will use this to generate your page.
                  </p>

                  <v-textarea
                    v-model="config.description"
                    auto-grow
                    counter
                    hint="Example: Create a modern landing page with a hero section featuring a gradient background, a call-to-action button, and three feature cards below. Include a contact form at the bottom."
                    label="Page Description"
                    persistent-hint
                    placeholder="Describe your page design, layout, features, colors, and functionality..."
                    prepend-inner-icon="mdi-text-box"
                    rounded="lg"
                    :rows="8"
                    :rules="[v => !!v || 'Description is required', v => v.length >= 50 || 'Description should be at least 50 characters']"
                    variant="outlined"
                  />

                  <v-alert
                    v-if="generateError"
                    class="mt-4"
                    color="error"
                    icon="mdi-alert-circle"
                    variant="tonal"
                  >
                    {{ generateError }}
                  </v-alert>
                </div>

                <v-divider class="my-8" />

                <!-- Form Settings Section -->
                <div class="mb-8">
                  <h2 class="text-h5 font-weight-bold mb-2">
                    <v-icon class="mr-2" color="primary">mdi-form-select</v-icon>
                    Form Settings
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-6">
                    Configure form submission settings if your page includes forms
                  </p>

                  <v-switch
                    v-model="config.hasForm"
                    class="mb-4"
                    color="primary"
                    hide-details
                    label="This page includes a contact/submission form"
                  />

                  <v-expand-transition>
                    <div v-if="config.hasForm">
                      <v-text-field
                        v-model="config.formEmail"
                        class="mb-4"
                        hint="Form submissions will be sent to this email"
                        label="Notification Email"
                        persistent-hint
                        prepend-inner-icon="mdi-email"
                        rounded="lg"
                        :rules="config.hasForm ? [v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid'] : []"
                        type="email"
                        variant="outlined"
                      />

                      <v-text-field
                        v-model="config.successMessage"
                        class="mb-4"
                        hint="Message shown after successful form submission"
                        label="Success Message"
                        persistent-hint
                        prepend-inner-icon="mdi-check-circle"
                        rounded="lg"
                        variant="outlined"
                      />

                      <v-text-field
                        v-model="config.redirectUrl"
                        hint="Optional: Redirect users to this URL after submission"
                        label="Redirect URL (Optional)"
                        persistent-hint
                        prepend-inner-icon="mdi-link"
                        rounded="lg"
                        variant="outlined"
                      />
                    </div>
                  </v-expand-transition>
                </div>

                <v-divider class="my-8" />

                <!-- SEO Settings Section -->
                <div class="mb-8">
                  <h2 class="text-h5 font-weight-bold mb-2">
                    <v-icon class="mr-2" color="primary">mdi-search-web</v-icon>
                    SEO & Metadata
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-6">
                    Optimize your page for search engines
                  </p>

                  <v-text-field
                    v-model="config.metaTitle"
                    class="mb-4"
                    counter="60"
                    hint="Recommended: 50-60 characters"
                    label="Page Title"
                    persistent-hint
                    prepend-inner-icon="mdi-format-title"
                    rounded="lg"
                    variant="outlined"
                  />

                  <v-textarea
                    v-model="config.metaDescription"
                    class="mb-4"
                    counter="160"
                    hint="Recommended: 150-160 characters"
                    label="Meta Description"
                    persistent-hint
                    prepend-inner-icon="mdi-text"
                    rounded="lg"
                    :rows="3"
                    variant="outlined"
                  />

                  <v-combobox
                    v-model="config.keywords"
                    chips
                    clearable
                    hint="Press Enter to add keywords"
                    label="Keywords"
                    multiple
                    persistent-hint
                    prepend-inner-icon="mdi-tag-multiple"
                    rounded="lg"
                    variant="outlined"
                  />
                </div>

                <v-divider class="my-8" />

                <!-- Analytics Section -->
                <div class="mb-8">
                  <h2 class="text-h5 font-weight-bold mb-2">
                    <v-icon class="mr-2" color="primary">mdi-chart-line</v-icon>
                    Analytics & Tracking
                  </h2>
                  <p class="text-body-2 text-medium-emphasis mb-6">
                    Configure analytics and tracking codes
                  </p>

                  <v-switch
                    v-model="config.enableAnalytics"
                    class="mb-4"
                    color="primary"
                    hide-details
                    label="Enable Google Analytics"
                  />

                  <v-expand-transition>
                    <v-text-field
                      v-if="config.enableAnalytics"
                      v-model="config.analyticsId"
                      class="mb-4"
                      hint="e.g., G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                      label="Google Analytics ID"
                      persistent-hint
                      prepend-inner-icon="mdi-google-analytics"
                      rounded="lg"
                      variant="outlined"
                    />
                  </v-expand-transition>

                  <v-textarea
                    v-model="config.customScripts"
                    hint="Add custom JavaScript or tracking codes (e.g., Facebook Pixel, Hotjar)"
                    label="Custom Scripts (Optional)"
                    persistent-hint
                    placeholder="<script>...</script>"
                    prepend-inner-icon="mdi-code-tags"
                    rounded="lg"
                    :rows="4"
                    variant="outlined"
                  />
                </div>

                <!-- Action Buttons -->
                <div class="d-flex gap-4 justify-end mt-8">
                  <v-btn
                    class="mr-2"
                    color="grey"
                    rounded="lg"
                    size="large"
                    variant="outlined"
                    @click="$router.push('/dashboard')"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    class="mr-2"
                    color="secondary"
                    prepend-icon="mdi-content-save"
                    rounded="lg"
                    size="large"
                    variant="outlined"
                    @click="handleSave"
                  >
                    Save Draft
                  </v-btn>
                  <v-btn
                    class="mr-2"
                    color="primary"
                    :disabled="hasGenerated"
                    :loading="generating"
                    prepend-icon="mdi-brain"
                    rounded="lg"
                    size="large"
                    variant="elevated"
                    @click="handleGenerate"
                  >
                    {{ hasGenerated ? 'Already Generated' : 'Generate & Preview' }}
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="500">
      <v-card rounded="xl">
        <v-card-text class="pa-8 text-center">
          <v-icon
            class="mb-4"
            color="success"
            size="64"
          >
            mdi-check-circle
          </v-icon>
          <h2 class="text-h5 font-weight-bold mb-4">
            Deployment Successful! 🎉
          </h2>
          <p class="text-body-1 mb-6">
            Your page has been generated and deployed successfully.
          </p>
          <v-btn
            block
            color="primary"
            :href="`https://${config.domain}`"
            prepend-icon="mdi-open-in-new"
            rounded="lg"
            size="large"
            target="_blank"
          >
            View Live Page
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Warning Dialog -->
    <v-dialog v-model="warningDialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-text class="pa-8 text-center">
          <v-icon
            class="mb-4"
            color="warning"
            size="64"
          >
            mdi-alert
          </v-icon>
          <h2 class="text-h5 font-weight-bold mb-4">
            One-Time Generation Warning
          </h2>
          <p class="text-body-1 mb-4">
            On the unpaid version, each page can only be generated <strong>once</strong>.
          </p>
          <p class="text-body-2 text-medium-emphasis mb-6">
            Make sure your configuration is correct before proceeding. Once generated, you cannot regenerate this page.
          </p>
          <div class="d-flex gap-4 justify-center">
            <v-btn
              color="grey"
              rounded="lg"
              size="large"
              variant="outlined"
              @click="warningDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              rounded="lg"
              size="large"
              variant="elevated"
              @click="confirmGenerate"
            >
              I Understand, Generate
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Progress Dialog -->
    <v-dialog v-model="progressDialog" max-width="500" persistent>
      <v-card rounded="xl">
        <v-card-text class="pa-8">
          <div class="text-center mb-6">
            <v-icon
              class="mb-4"
              color="primary"
              size="64"
            >
              mdi-brain
            </v-icon>
            <h2 class="text-h5 font-weight-bold mb-2">
              Generating Your Page
            </h2>
            <p class="text-body-2 text-medium-emphasis">
              {{ progressMessage }}
            </p>
          </div>

          <v-progress-linear
            class="mb-4"
            color="primary"
            height="8"
            :model-value="progressPercent"
            rounded
          />

          <div class="text-center">
            <p class="text-h6 font-weight-bold gradient-text">
              {{ progressPercent }}% Complete
            </p>
            <p class="text-caption text-medium-emphasis mt-2">
              Step {{ currentStep }} of 4
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { usePages } from '@/composables/usePages'

  const route = useRoute()
  const { saveGeneratedHtml, fetchPageById, updatePage } = usePages()

  const configForm = ref()
  const deploying = ref(false)
  const generating = ref(false)
  const generateError = ref('')
  const generatedHtml = ref('')
  const successDialog = ref(false)
  const pageStatus = ref<'draft' | 'live'>('draft')
  const pageId = ref<string | null>(null)
  const hasGenerated = ref(false)
  const warningDialog = ref(false)
  const progressDialog = ref(false)
  const progressPercent = ref(0)
  const progressMessage = ref('')
  const currentStep = ref(0)

  const config = ref({
    name: '',
    domain: '',
    icon: 'mdi-web',
    primaryColor: '#7C3AED',
    secondaryColor: '#10B981',
    description: '',
    hasForm: false,
    formEmail: '',
    successMessage: 'Thank you for your submission!',
    redirectUrl: '',
    metaTitle: '',
    metaDescription: '',
    keywords: [] as string[],
    enableAnalytics: false,
    analyticsId: '',
    customScripts: '',
  })

  const iconOptions = [
    { title: 'Web', value: 'mdi-web' },
    { title: 'Home', value: 'mdi-home' },
    { title: 'Blog', value: 'mdi-post' },
    { title: 'Shop', value: 'mdi-shopping' },
    { title: 'Contact', value: 'mdi-email' },
    { title: 'About', value: 'mdi-information' },
    { title: 'Gallery', value: 'mdi-image-multiple' },
    { title: 'Services', value: 'mdi-briefcase' },
    { title: 'Portfolio', value: 'mdi-folder-image' },
    { title: 'Pricing', value: 'mdi-currency-usd' },
  ]

  const primaryColorMenu = ref(false)
  const secondaryColorMenu = ref(false)

  onMounted(() => {
    // Load page configuration based on route params
    const params = route.params as { id?: string }
    const paramId = typeof params.id === 'string' ? params.id : undefined
    if (paramId) {
      pageId.value = paramId
      loadPageConfig(paramId)
    }
  })

  function buildClaudePrompt () {
    const keywords = config.value.keywords.length ? config.value.keywords.join(', ') : 'none'
    const analyticsLine = config.value.enableAnalytics && config.value.analyticsId
      ? `Include Google Analytics with ID: ${config.value.analyticsId}.`
      : 'No analytics script.'
    const formLine = config.value.hasForm
      ? `Include a contact form that sends to ${config.value.formEmail || 'a placeholder email'}, with success message: "${config.value.successMessage}" and optional redirect to: ${config.value.redirectUrl || 'none'}.`
      : 'Do not include a form.'

    return [
      'You are a senior web designer and frontend engineer.',
      'CRITICAL: Return a COMPLETE, VALID HTML5 document with these exact elements:',
      '- <!DOCTYPE html>',
      '- <html lang="en">',
      '- <head> with meta tags, title, styles',
      '- <body> with all content',
      '- </body>',
      '- </html>',
      'Do NOT wrap the response in markdown code blocks (no ```html). Return ONLY the raw HTML.',
      'IMPORTANT: Every HTML file MUST have <body> tag with all page content inside it.',
      'Use a modern, responsive landing page layout with accessibility best practices.',
      `Page name: ${config.value.name}.`,
      `Domain: ${config.value.domain}.`,
      `Primary color: ${config.value.primaryColor}.`,
      `Secondary color: ${config.value.secondaryColor}.`,
      `Icon reference: ${config.value.icon}.`,
      `SEO title: ${config.value.metaTitle || config.value.name}.`,
      `SEO description: ${config.value.metaDescription || config.value.description.slice(0, 160)}.`,
      `SEO keywords: ${keywords}.`,
      `Custom scripts to include verbatim at end of body: ${config.value.customScripts || 'none'}.`,
      `Additional instructions: ${config.value.description}.`,
      formLine,
      analyticsLine,
      'Include a hero section, feature grid, social proof, and a call-to-action section.',
      'Use the provided description to guide layout, copy, and styling.',
      'FINAL REMINDER: The response must start with <!DOCTYPE html> and end with </html>',
    ].join('\n')
  }

  async function handleGenerate () {
    if (hasGenerated.value) {
      generateError.value = 'This page has already been generated. Each page can only be generated once.'
      return
    }

    const { valid } = await configForm.value.validate()
    if (!valid) return

    // Show warning dialog first
    warningDialog.value = true
  }

  async function confirmGenerate () {
    warningDialog.value = false
    generateError.value = ''
    generating.value = true
    progressDialog.value = true
    progressPercent.value = 0
    currentStep.value = 0

    try {
      const workerUrl = import.meta.env.VITE_CLAUDE_WORKER_URL as string | undefined
      if (!workerUrl) {
        throw new Error('Missing VITE_CLAUDE_WORKER_URL')
      }

      let accumulatedHtml = ''
      const basePrompt = buildClaudePrompt()

      // Step 1: Initial structure (25%)
      currentStep.value = 1
      progressMessage.value = 'Creating page structure and header...'
      progressPercent.value = 0

      const response1 = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 10_000,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: basePrompt + '\n\nSTEP 1/4: Create the DOCTYPE, html, head section with all meta tags and styles, and BEGIN the body with the hero section. Stop after the hero section.',
          }],
        }),
      })

      if (!response1.ok) throw new Error('Step 1 failed')
      const data1 = await response1.json()
      accumulatedHtml = extractHtml(data1)
      progressPercent.value = 25

      // Step 2: Main content (50%)
      currentStep.value = 2
      progressMessage.value = 'Building features and content sections...'

      const response2 = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 10_000,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: `Here is the HTML so far:\n${accumulatedHtml}\n\nSTEP 2/4: Continue the body section. Add the feature grid and main content sections. Do NOT close the body or html tags yet. Only return the additional HTML to append.`,
          }],
        }),
      })

      if (!response2.ok) throw new Error('Step 2 failed')
      const data2 = await response2.json()
      accumulatedHtml += '\n' + extractHtml(data2)
      progressPercent.value = 50

      // Step 3: Additional sections (75%)
      currentStep.value = 3
      progressMessage.value = 'Adding forms and interactive elements...'

      const response3 = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 10_000,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: `Here is the HTML so far:\n${accumulatedHtml}\n\nSTEP 3/4: Continue adding social proof section, testimonials, and call-to-action sections. Do NOT close the body or html tags yet. Only return the additional HTML to append.`,
          }],
        }),
      })

      if (!response3.ok) throw new Error('Step 3 failed')
      const data3 = await response3.json()
      accumulatedHtml += '\n' + extractHtml(data3)
      progressPercent.value = 75

      // Step 4: Finalization (100%)
      currentStep.value = 4
      progressMessage.value = 'Finalizing and polishing your page...'

      const response4 = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 10_000,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: `Here is the HTML so far:\n${accumulatedHtml}\n\nSTEP 4/4 FINAL: Add footer section, close the body and html tags properly, and add any custom scripts if needed. Polish and complete the page. Return only the final closing sections to append.`,
          }],
        }),
      })

      if (!response4.ok) throw new Error('Step 4 failed')
      const data4 = await response4.json()
      accumulatedHtml += '\n' + extractHtml(data4)
      progressPercent.value = 100

      // Clean up the final HTML
      let finalHtml = accumulatedHtml.trim()

      // Ensure proper HTML structure
      if (!finalHtml.includes('<!DOCTYPE html>')) {
        finalHtml = '<!DOCTYPE html>\n' + finalHtml
      }
      if (!finalHtml.includes('</html>')) {
        finalHtml += '\n</html>'
      }
      if (!finalHtml.includes('</body>') && finalHtml.includes('<body')) {
        finalHtml = finalHtml.replace('</html>', '</body>\n</html>')
      }

      console.log('Generated HTML length:', finalHtml.length)
      console.log('First 200 chars:', finalHtml.substring(0, 200))
      generatedHtml.value = finalHtml

      // Save to Firebase
      if (pageId.value) {
        const saved = await saveGeneratedHtml(pageId.value, finalHtml)
        if (saved) {
          console.log('Generated HTML saved to Firebase')
          await updatePage(pageId.value, { hasGenerated: true })
          hasGenerated.value = true
        } else {
          console.warn('Failed to save generated HTML to Firebase')
        }
      }

      progressDialog.value = false
      openPreviewWindow(finalHtml)
    } catch (error_: any) {
      console.error('Claude generation error:', error_)
      generateError.value = error_.message || 'Failed to generate page'
      progressDialog.value = false
    } finally {
      generating.value = false
    }
  }

  function extractHtml(data: any): string {
    const textBlocks = Array.isArray(data.content)
      ? data.content.filter((block: { type: string }) => block.type === 'text')
      : []
    let html = textBlocks.map((block: { text: string }) => block.text).join('\n').trim()

    // Extract HTML from markdown code blocks if Claude wrapped it
    const htmlMatch = html.match(/```html\n([\s\S]*?)\n```|```\n([\s\S]*?)\n```/)
    if (htmlMatch) {
      html = htmlMatch[1] || htmlMatch[2]
    }

    return html.trim()
  }

  function openPreviewWindow(html: string) {
    if (!html || html.trim().length === 0) {
      generateError.value = 'No HTML content to preview.'
      return
    }

    try {
      const previewWindow = window.open('', '_blank')
      if (!previewWindow) {
        generateError.value = 'Popup blocked. Please allow popups for preview.'
        return
      }

      const doc = previewWindow.document
      doc.open()
      doc.write(html)
      doc.close()
      console.log('Preview opened in new window')
    } catch (error) {
      console.error('Error opening preview window:', error)
      generateError.value = 'Failed to open preview window'
    }
  }

  function handlePreview () {
    if (!generatedHtml.value || generatedHtml.value.trim().length === 0) {
      generateError.value = 'Generate a page first to preview it.'
      return
    }

    openPreviewWindow(generatedHtml.value)
  }

  async function loadPageConfig (_pageId: string) {
    try {
      const page = await fetchPageById(_pageId)
      if (!page) {
        console.warn('Page not found')
        return
      }

      // Load configuration from Firebase
      config.value = {
        name: page.name,
        domain: page.domain || '',
        icon: page.icon,
        primaryColor: page.primaryColor || '#7C3AED',
        secondaryColor: page.secondaryColor || '#10B981',
        description: page.description,
        hasForm: page.hasForm || false,
        formEmail: page.formEmail || '',
        successMessage: page.successMessage || 'Thank you for your submission!',
        redirectUrl: page.redirectUrl || '',
        metaTitle: page.metaTitle || '',
        metaDescription: page.metaDescription || '',
        keywords: page.keywords || [],
        enableAnalytics: page.enableAnalytics || false,
        analyticsId: page.analyticsId || '',
        customScripts: page.customScripts || '',
      }

      // Load generated HTML if available
      if (page.generatedHtml) {
        generatedHtml.value = page.generatedHtml
      }

      // Load generation status
      hasGenerated.value = page.hasGenerated || false

      pageStatus.value = page.status
    } catch (error) {
      console.error('Error loading page config:', error)
    }
  }

  async function handleSave () {
    const { valid } = await configForm.value.validate()
    if (!valid) return

    if (!pageId.value) {
      generateError.value = 'No page ID found'
      return
    }

    try {
      // Save the full configuration to Firebase
      const success = await updatePage(pageId.value, {
        name: config.value.name,
        description: config.value.description,
        icon: config.value.icon,
        domain: config.value.domain,
        primaryColor: config.value.primaryColor,
        secondaryColor: config.value.secondaryColor,
        hasForm: config.value.hasForm,
        formEmail: config.value.formEmail,
        successMessage: config.value.successMessage,
        redirectUrl: config.value.redirectUrl,
        metaTitle: config.value.metaTitle,
        metaDescription: config.value.metaDescription,
        keywords: config.value.keywords,
        enableAnalytics: config.value.enableAnalytics,
        analyticsId: config.value.analyticsId,
        customScripts: config.value.customScripts,
        status: 'draft',
      })

      if (success) {
        console.log('Configuration saved successfully')
        // Show success feedback
        generateError.value = ''
      } else {
        generateError.value = 'Failed to save configuration'
      }
    } catch (error) {
      console.error('Error saving configuration:', error)
      generateError.value = 'Failed to save configuration'
    }
  }

  async function handleDeploy () {
    const { valid } = await configForm.value.validate()
    if (!valid) return

    deploying.value = true

    // Simulate AI generation and deployment
    setTimeout(() => {
      deploying.value = false
      pageStatus.value = 'live'
      successDialog.value = true
      console.log('Deploying page with config:', config.value)
      // In real app: await generateAndDeployPage(config.value)
    }, 3000)
  }
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #7C3AED 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
