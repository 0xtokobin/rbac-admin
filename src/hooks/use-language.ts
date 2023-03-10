import { useSystemStore } from '@/hooks/use-system-store'

export const useLanguage = () => {
  const systemStore = useSystemStore()

  const currentLanguage = computed(() => {
    const { locale } = useI18n()
    return locale.value
  })

  const changeLanguage = (
    value: string | number | Record<string, any> | undefined,
  ) => {
    const { messages, locale } = useI18n()
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
  }
}
