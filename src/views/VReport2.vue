<template>
    <div>
        <n3-container>
            <n3-row>
                <h1>{{title}}</h1>
                <h5>{{subTitle}}</h5>

            </n3-row>

            <!--Time period-->
            <n3-row>
                <n3-step :labels="['w1','w2','w3','w4']" :current="3"></n3-step>
            </n3-row>

            <!--Overall-->
            <n3-row>
                <h2>Overall Status</h2>
                <h3>{{status}}</h3>
            </n3-row>
            <n3-row>
                <n3-column :col=6>
                    <h5>Features developed</h5>
                    <line-chart :data="jira.features" :options="display.chart.opt" :width="display.chart.width" :height="display.chart.height"></line-chart>
                </n3-column>
                <n3-column :col=6>
                    <h5>Bugs</h5>
                    <donut-chart :data="jira.bugs" :options="display.chart.opt" :width="display.chart.width" :height="display.chart.height"></donut-chart>
                </n3-column>
            </n3-row>

            <!--Block list-->
            <n3-row>
                <h2>Block issues</h2>
                <n3-data-table :source="jira.blockIssues.data" :columns="jira.blockIssues.columns">
                </n3-data-table>
            </n3-row>

            <!--High bugs-->
            <n3-row>
                <h2>High bugs</h2>
                <n3-data-table :source="jira.highBugs.data" :columns="jira.highBugs.columns">
                </n3-data-table>
            </n3-row>

            <!--Test-->
            <n3-row>
            </n3-row>

        </n3-container>
    </div>
</template>

<script>
import {
    Line,
    Pie,
    Doughnut
} from 'vue-chartjs'
export default {
    name: 'weekReport',
    data: {
        title: '',
        subTitle: '',
        status: '',
        jira: {
            features: null,
            bugs: null,
            blockIssues: null,
            highBugs: null,
        },
        display: {
            chart: {
                opt: {
                    responsive: false,
                    maintainAspectRatio: false
                },
                width: 500,
                height: 400
            }
        }
    },
    methods: {
        _queryJiraData() {
            this.$http.get('/api/report')
            .then(function(response) {
                this.jira.features=this._convertToChartData(response.features);
                this.jira.bugs=this._convertToChartData(response.bugs);
                this.jira.blockIssues=this._convertToTableData(response.blockIssues);
                this.jira.highBugs=this._convertToTableData(response.highBugs);
            })
            .catch(function(response) {
                console.log(response);
            });
        },
        _convertToChartData(jsonres) {

        },
        _covertToTableData(jsonres) {

        }
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
    mounted() {
        _queryJiraData();
    },
}
</script>

<style>
</style>