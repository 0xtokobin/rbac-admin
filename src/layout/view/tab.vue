<script lang="ts" setup>
import type { IObject } from '#/global'
import { useSystemStore } from '@/hooks/use-system-store'
import { Settings } from '@/constants/settings'
import { arrayRecursion } from '@/utils/common'

export interface Tab {
  label: string
  name: string
}

const { t } = useI18n()

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
  tabList.value.push({ label: data.meta.menuName, name: data.path })
  nowTab.value = data.path
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
    Settings.AdminFirstRoute,
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
  <div flex items-center justify-between class="slot" :class="`wingscloud-admin-${systemStore.settings.TabStyle}`">
    <el-tabs
      v-model="nowTab" type="card" closable tab-position="top"
      :style="systemStore.isMobile ? 'width: 76%' : 'width: 94%'" @tab-click="tabClick" @tab-remove="tabRemove"
    >
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <div class="operation">
      <el-dropdown @command="clickOperationMenu">
        <el-button size="small" type="primary">
          <span text-3 mr-2>{{ t('app.tab.more') }}</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="current">
              {{
                t('app.tab.close')
              }}
            </el-dropdown-item>
            <el-dropdown-item command="other">
              {{
                t('app.tab.closeOther')
              }}
            </el-dropdown-item>
            <el-dropdown-item command="all">
              {{
                t('app.tab.closeAll')
              }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slot {
  box-sizing: border-box;
  height: var(--wingscloud-tab-height);
  padding: 0 var(--wingscloud-main-padding);
  background-color: var(--wingscloud-tab-bg-color) !important;
  border-bottom: 1px solid var(--wingscloud-tab-border-color);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-tabs__header) {
  margin: 0 !important;
  border: none !important;

  --at-apply: flex items-center;
}

:deep(.el-tabs__nav) {
  border: none !important;
}

:deep(.el-tabs__item) {
  height: var(--el-tabs-header-height);
  line-height: var(--el-tabs-header-height);
  border-left: none !important;
}

:deep(.el-tabs__item.is-active) {
  border: none;
  border-bottom: 2px solid var(--el-color-primary) !important;
}

.slot.wingscloud-admin-round {
  height: auto;
  background-color: var(--wingscloud-main-fill) !important;
  border-bottom: 1px solid rgba($color: #000, $alpha: 0%);

  :deep(.el-tabs__item) {
    height: 30px;
    line-height: 30px;
    border-left: none !important;
  }

  :deep(.el-tabs__item.is-active) {
    background-color: var(--el-bg-color) !important;
    border-bottom: 0 !important;
    border-radius: 6px;
  }
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
