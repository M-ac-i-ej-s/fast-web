/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#7C3AED',
          secondary: '#10B981',
          accent: '#8B5CF6',
          background: '#F8FAFC',
          surface: '#FFFFFF',
        },
      },
      dark: {
        colors: {
          primary: '#8B5CF6',
          secondary: '#10B981',
          accent: '#A78BFA',
          background: '#0F172A',
          surface: '#1E293B',
        },
      },
    },
  },
})
