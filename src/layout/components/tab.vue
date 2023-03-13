<script lang="ts" setup>
import type { IObject } from '#/global'
import { RouteEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import { arrayRecursion } from '@/utils/common'

export interface Tab {
  label: IObject
  name: string
}

const { t, locale } = useI18n()

const route = useRoute()
const router = useRouter()

const systemStore = useSystemStore()

const tabList = ref<Tab[]>([])
const nowTab = ref(route.path)
const homeTab = ref<Tab | undefined>(undefined)

const findTab = (path: string): IObject => {
  const res = { isFind: false, path: '', index: 0, length: 0 }
  if (tabList.value.length > 0) {
    res.length = tabList.value.filter((item: IObject, index: number) => {
      if (item.name === path) {
        res.path = path
        res.index = index
        return item
      }
      else {
        return false
      }
    }).length
  }
  res.length === 0 ? (res.isFind = false) : (res.isFind = true)
  return res
}

const addTab = (data: IObject, isPushTab?: boolean): void => {
  isPushTab = isPushTab || false
  tabList.value.push({ label: data.meta.i18n, name: data.path })
  if (isPushTab)
    router.push({ path: data.path })
}

const tabClick = (e: any): void => {
  router.push({ path: e.props.name })
  nowTab.value = e.props.name
}

const tabRemove = (e: string | number): void => {
  if (tabList.value.length === 1)
    return
  const { isFind, index } = findTab(e.toString())
  const nowTabRes = findTab(nowTab.value)
  if (isFind) {
    tabList.value.splice(index, 1)
    if (nowTabRes.index === index && nowTabRes.index !== 0)
      router.push({ path: tabList.value[index - 1].name })

    else if (nowTabRes.index === 0)
      router.push({ path: tabList.value[0].name })
  }
}

const clickOperationMenu = (command: string | number | object): void => {
  if (command === 'current') {
    tabRemove(nowTab.value)
  }
  else if (command === 'other') {
    nowTab.value = ''
    tabList.value = []
    addTab(route)
  }
  else if (command === 'all') {
    nowTab.value = ''
    tabList.value = []
    addTab(homeTab, true)
  }
}

onBeforeMount(() => {
  homeTab.value = arrayRecursion(
    'path',
    systemStore.menuRoutes,
    RouteEnum.ROUTE_FIRST,
  )
  const { isFind, path } = findTab(route.path)
  if (isFind)
    nowTab.value = path

  else
    addTab(route)
})

watch(
  () => route.path,
  () => {
    nowTab.value = route.path
    const { isFind, path } = findTab(route.path)
    if (isFind)
      nowTab.value = path

    else
      addTab(route)
  },
)
</script>

<template>
  <div flex items-center justify-between style="background-color: var(--el-bg-color-overlay);padding: 0 20px;">
    <el-tabs
      v-model="nowTab" mr-4 type="card" closable tab-position="top"
      :style="systemStore.isMobile ? 'max-width: 80%' : 'width: 88%'" @tab-click="tabClick" @tab-remove="tabRemove"
    >
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label[locale]" :name="item.name" />
    </el-tabs>
    <el-dropdown @command="clickOperationMenu">
      <el-button size="small" type="primary">
        <span text-3 mr-2>{{ t('app.more') }}</span>
        <el-icon>
          <ArrowDown />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="current">
            {{
              t('app.closeCurrent')
            }}
          </el-dropdown-item>
          <el-dropdown-item command="other">
            {{
              t('app.closeOther')
            }}
          </el-dropdown-item>
          <el-dropdown-item command="all">
            {{
              t('app.closeAll')
            }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin: 0 !important;
  border: none !important;

  --at-apply: flex items-center;
}

:deep(.el-tabs__nav) {
  border: none !important;
}

:deep(.el-tabs__item) {
  border-left: none !important;
}

:deep(.el-tabs__item.is-active) {
  border: none;
  border-bottom: 2px solid var(--el-color-primary) !important;
}

:deep(.el-tabs__nav-next) {
  --at-apply: flex items-center;

  top: 50% !important;
  line-height: var(--el-tabs-header-height) !important;
  transform: translateY(-50%) !important;
}

:deep(.el-tabs__nav-prev) {
  --at-apply: flex items-center;

  top: 50% !important;
  line-height: var(--el-tabs-header-height) !important;
  transform: translateY(-50%) !important;
}
</style>
