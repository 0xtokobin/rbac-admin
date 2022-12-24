<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader';

defineOptions({
  name: 'ExampleMap',
});

const map = shallowRef(null);

const initMap = () => {
  AMapLoader.load({
    key: 'c3644efe346ab528f359188054441f7e',
    version: '2.0',
    plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation', 'AMap.HawkEye'],
  }).then((AMap) => {
    map.value = new AMap.Map('container', {
      viewMode: '3D',
      zoom: 5,
      center: [116.397436, 39.909165],
      dragEnable: true,
      scrollWheel: true,
      doubleClickZoom: true,
      keyboardEnable: true,
    });
  });
};

onMounted(() => {
  initMap();
});
</script>
<template>
  <crud-card>
    <div id="container"></div>
  </crud-card>
</template>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 500px;
  margin: 0;
  padding: 0;
}
</style>
