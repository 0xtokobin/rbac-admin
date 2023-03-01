import { ElMessage } from 'element-plus'
import type { Callback } from '#/global'
import { getMobileSmscode } from '@/apis/common/mobile'

export interface Form {
  time: number
  getting: boolean
  send: boolean
  timer: any
}

export const useCountDown = () => {
  const { t } = useI18n()

  const countDownForm = reactive<Form>({
    time: 60,
    getting: false,
    send: false,
    timer: undefined,
  })

  const resetCountDown = (isInit: boolean): void => {
    clearInterval(countDownForm.timer)
    countDownForm.time = 60
    countDownForm.getting = false
    countDownForm.send = !isInit
    countDownForm.timer = undefined
  }

  const getCode = (
    data: string | number | null | undefined,
    callBack: Callback,
  ): void => {
    if (!data) {
      ElMessage.error(
        t('crud.placeholder.enter', { label: t('crud.mobile.mobile') }),
      )
      return
    }
    callBack()
  }

  const getCoding = (): void => {
    countDownForm.getting = true
    countDownForm.send = true
    countDownForm.timer = setInterval(() => {
      if (countDownForm.time > 0 && countDownForm.time <= 60)
        countDownForm.time--

      else
        resetCountDown(false)
    }, 1000)
  }

  const getMobileCode = (mobile: number | string, type: number): void => {
    getCode(mobile, async () => {
      const res = await getMobileSmscode({
        mobile,
        type,
      })
      if (res.code === 0) {
        ElMessage.success(t('crud.mobile.success'))
        getCoding()
      }
    })
  }

  return {
    countDownForm,
    getCode,
    getCoding,
    getMobileCode,
    resetCountDown,
  }
}
