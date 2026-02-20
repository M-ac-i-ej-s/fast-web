/**
 * composables/useLocale.ts
 *
 * Composable for managing locale/language switching
 */

import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export function useLocale() {
  const { locale, t, tm } = useI18n()

  const currentLocale = computed(() => locale.value)
  
  const availableLocales = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  ]

  const setLocale = (newLocale: string) => {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
  }

  const toggleLocale = () => {
    const newLocale = locale.value === 'en' ? 'pl' : 'en'
    setLocale(newLocale)
  }

  return {
    locale: currentLocale,
    availableLocales,
    setLocale,
    toggleLocale,
    t,
    tm,
  }
}
