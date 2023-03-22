import { ElMessage } from 'element-plus'
import { GET } from '../utils/request.axios'
import type { Callback } from '#/global'
import type { CountDownForm } from '#libs/common/count-down'

export const useCountDown = () => {
  const { t } = useI18n()

  const countDownForm = reactive<CountDownForm>({
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
        t('base.placeholder.enter', { label: t('base.mobile.mobile') }),
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
      const res = await GET('/common/mobile/smscode', {
        mobile,
        type,
      })
      if (res.code === 0) {
        ElMessage.success(t('base.mobile.success'))
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
