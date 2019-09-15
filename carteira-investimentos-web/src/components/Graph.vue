<template>
    <highcharts :options="chartOptions"></highcharts>
</template>

<script>

import {Chart} from 'highcharts-vue'


export default {
    components: {
        highcharts: Chart
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Bovespa'
                },
                xAxis: {
                    categories: ['Teste1 ', 'Teste2', 'Teste3']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Bovespa',
                    data: [1, 0, 4]
                }, {
                    name: 'Sei la',
                    data: [5, 7, 3]
                }]
            }
        }
    }
}
</script>

<style>

</style>