import { useSystemStore } from '@/hooks/use-system-store'

export const useLanguage = () => {
  const systemStore = useSystemStore()

  const { messages, locale } = useI18n()

  const currentLanguage = computed(() => {
    return locale.value
  })

  const changeLanguage = (
    value: string | number | Record<string, any> | undefined,
  ) => {
    locale.value = value as string
    systemStore.changeLanguage({
      alias: value,
      name: messages.value[value as string].name,
    })
    location.reload()
  }

  return {
    currentLanguage,
    changeLanguage,
    languages: messages.value,
  }
}
