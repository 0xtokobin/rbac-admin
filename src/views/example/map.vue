<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'

const map = shallowRef(null)

const initMap = () => {
  AMapLoader.load({
    key: 'c3644efe346ab528f359188054441f7e',
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation', 'AMap.HawkEye'],
  }).then((AMap) => {
    map.value = new AMap.Map('example-map', {
      viewMode: '3D',
      zoom: 5,
      zooms: [2, 22],
      center: [105.602725, 37.076636],
    })
  })
}

onMounted(() => {
  initMap()
})
</script>

<template>
  <crud-card>
    <div id="example-map" w-full h-xl />
  </crud-card>
</template>
