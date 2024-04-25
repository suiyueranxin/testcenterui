<template>
    <div v-if="isDataReady">
        <div v-if="chartType == 'line'">
            <line-chart :data="source" :options="options"></line-chart>
        </div>
        <div v-if="chartType == 'pie'">
            <pie-chart :data="source" :options="options"></pie-chart>
        </div>
        <div v-if="chartType == 'donut'">
            <donut-chart :data="source" :options="options"></donut-chart>
        </div>
    </div>
</template>

<script>
    //import block
    import {Line,Pie,Doughnut} from 'vue-chartjs';

    //class block
    export default {
        name: 'reportChart',
        props: {
            chartType: {
                type: String,
                default: 'line'
            },
            query: {
                type: String,
                default: '/api/report/countBy?by=assignee&&filters=issueType=Feature'
            },
            source: {
                type: Object,
                default() {
                    return {
                        labels: [],
                        datasets: []
                    };
                }
            },
            options: {
                type: Object,
                default() {
                    return {
                        responsive: false,
                        maintainAspectRatio: false
                    };
                }
            },
            isDataReady: {
                type: Boolean,
                default: false
            }
        },
        data() {
        },
        components: {
            'line-chart': {
                extends: Line,
                props: ['data', 'options'],
                mounted() {
                    this.renderChart(this.data, this.options)
                }
            },
            'pie-chart': {
                extends: Pie,
                props: ['data', 'options'],
                mounted() {
                    this.renderChart(this.data, this.options)
                }
            },
            'donut-chart': {
                extends: Doughnut,
                props: ['data', 'options'],
                mounted() {
                    this.renderChart(this.data, this.options)
                }
            }
        },
        methods: {
            
        }
    }
</script>

<style>
</style>