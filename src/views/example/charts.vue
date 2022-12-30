<script lang="ts" setup>
import * as echarts from 'echarts';

defineOptions({
  name: 'ExampleCharts',
});

onMounted(() => {
  const chartDom = document.getElementById('main');
  let myChart = null;
  if (chartDom) {
    myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
    option && myChart.setOption(option);
  }
});
</script>
<template>
  <crud-card>
    <div id="main" w-full h-xl></div>
  </crud-card>
</template>
