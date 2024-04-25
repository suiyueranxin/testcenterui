<template>
    <div>
        <n3-container>
            <n3-row>
                <h1>{{title}}</h1>
                <h5>{{subTitle}}</h5>
            </n3-row>

            <!--Time period-->
            <n3-row>
                <n3-step v-if="!!isDataReady.period" :labels="source.period.labels" :current="source.period.current"></n3-step>
            </n3-row>

            <!--Overall-->
            <n3-row>
                <h2>Overall Status</h2>
                <h3>{{source.status}}</h3>
            </n3-row>
            <n3-row>
                <n3-column :col=6>
                    <h5>Features developed</h5>
                    <donut-chart v-if="!!isDataReady.feature" :data="source.feature" :options="chartOpt" :width="width" :height="height"></donut-chart>
                </n3-column>
                <n3-column :col=6>
                    <h5>Bugs</h5>
                    <donut-chart v-if="!!isDataReady.bug" :data="source.bug" :options="chartOpt" :width="width" :height="height"></donut-chart>
                </n3-column>
            </n3-row>
            <n3-row>
                <n3-column :col=6>
                    <h5>Count bug by assignee</h5>
                    <bar-chart v-if="!!isDataReady.bugByAssignee" :data="source.bugByAssignee" :options="chartOpt" :width="width" :height="height"></bar-chart>
                </n3-column>
                <!--
                <n3-column :col=6>
                    <h5>All</h5>
                    <n3-data-table v-if="!!isDataReady.all" :source="source.all.rows" :columns="source.all.columns"></n3-data-table>
                </n3-column>
            -->
            </n3-row>


            <!--Block list-->
            <n3-row>
                <n3-column :col=12>
                    <h2>Block Issues</h2>
                    <n3-data-table v-if="!!isDataReady.blockedFeature" :source="source.blockedFeature.rows" :columns="source.blockedFeature.columns" :pagination="pagination"></n3-data-table>
                </n3-column>
            </n3-row>
            <!--High bugs-->

            <n3-row>
                <n3-column :col=12>
                    <h2>High bugs</h2>
                    <n3-data-table v-if="!!isDataReady.highBug" :source="source.highBug.rows" :columns="source.highBug.columns" :pagination="pagination"></n3-data-table>
                </n3-column>
            </n3-row>

            <n3-row>
                <n3-column :col=12>
                    <h2>Code coverage</h2>
                    <h3>Summary</h3>
                </n3-column>
            </n3-row>
            <!--Front: Unit Test-->
            <n3-row>
                <n3-column :col=6>
                    <div>
                        <n3-button type="success" @click="generateUnitCoverage">Front Unit</n3-button>
                        <!--
                        <a href="http://localhost:8080/coverage/index.html">Report</a>
                        -->
                    </div>
                    <n3-card v-if="!!isDataReady.front" width="50%" style="padding:20px">
                        <p>Statements   : {{coverage.front.statements}}</p>
                        <p>Branches     : {{coverage.front.branches}}</p>
                        <p>Functions    : {{coverage.front.functions}}</p>
                        <p>Lines        : {{coverage.front.lines}}</p>
                    </n3-card>
                </n3-column>
                <n3-column :col=6>
                    <!--todo: play and stop-->
                    <n3-button type="success">Backend API </n3-button>
                    <n3-card v-if="!!isDataReady.backend" width="50%" style="padding:20px">
                        <p>Instructions   : {{coverage.backend.instructions}}</p>
                        <p>Branches     : {{coverage.backend.branches}}</p>
                        <p>Methods    : {{coverage.backend.methods}}</p>
                        <p>Lines        : {{coverage.backend.lines}}</p>
                        <p>Classes        : {{coverage.backend.classes}}</p>
                    </n3-card>
                </n3-column>
            </n3-row>

            <!--Backend: API Test-->
            <n3-row>
                <n3-column :col=12>
                    <h3>report</h3>
                    <n3-tabs>
                        <!--todo: history-->
                        <n3-tab header="Front">
                            <iframe src="http://localhost:8080/coverage/analytics/front/index.html" width="100%" height="600px"></iframe>
                            <!-- <n3-data-table :source="coverage.backend.rows" :columns="coverage.backend.columns"></n3-data-table> -->
                        </n3-tab>
                        <n3-tab header="Backend">
                            <iframe src="http://localhost:8080/coverage/analytics/backend/index.html" width="100%" height="600px"></iframe>
                            <!-- <n3-data-table :source="coverage.backend.rows" :columns="coverage.backend.columns"></n3-data-table> -->
                        </n3-tab>
                    </n3-tabs>
                </n3-column>
            </n3-row>
        </n3-container>
    </div>
</template>

<script>
import {
    Line,
    Pie,
    Doughnut,
    HorizontalBar,
    Bar
} from 'vue-chartjs';
export default {
    name: 'weekReport',
    props: {
        title: {
            type: String,
            default: 'ThinClient Analytics'
        },
        subTitle: {
            type: String,
            default: this.sprint
        },
        colorpalette: {
            type: Array,
            default() {
                return  ['#41cac0','#19d567','#2db7f5','#f50','#fa0', '#39b2a9', '#30d073', '#43bcf3', '#f9702b', '#f5b73b']
            }
        },
        pagination: {
            type: Object,
            default() {
                return {
                  current:1,
                  total:10,
                  pagesize:5
                }
            }
        },
        sprint: {
            type: String,
            default: "Wave 2 Takt 2"
        },
        startDate: {
            type: String,
            default: "2018-05-02"
        },
        endDate: {
            type: String,
            default: "2018-06-01"
        }
    },
    data() {
        return {
            isDataReady: {
                feature: false,
                bug: false,
                bugByAssignee: false,
                blockedFeature: false,
                highBug: false,
                all: false,
                front: false,
                backend: false,
                period: false,
                status: false
            },
            source: {
                feature: {},
                bug: {},
                bugByAssignee: {},
                blockedFeature: {
                    rows: [],
                    columns: []
                },
                highBug: {
                    rows: [],
                    columns: []
                },
                all: {
                    rows: [],
                    columns: []
                },
                period: {
                    labels: [],
                    current: 1
                },
                status: "Initial"
            },
            querySource: {
                feature: {
                    queryString: "countBy?by=status&filters=issueType=Feature",
                    view: "Doughnut",
                    path: "report"
                },
                bug: {
                    queryString: "countBy?by=status&filters=issueType=Bug",
                    view: "Doughnut",
                    path: "report"
                },
                bugByAssignee: {
                    queryString: "countBy?by=assignee&filters=issueType=Bug",
                    view: "Line",
                    path: "report"
                },
                blockedFeature: {
                    queryString: "list?filters=issueType=Feature,status=Blocked",
                    view: "Table",
                    path: "report"
                },
                highBug: {
                    queryString: "list?filters=issueType=Bug,priority=High",
                    view: "Table",
                    path: "report"
                },
                // all: {
                //     queryString: "TC_Analytics",
                //     view: "Table",
                //     path: "report"
                // },
                front: {
                    queryString: "TC Analytics Front?regen=false",
                    view: "Coverage",
                    path: "coverage"
                },
                backend: {
                    queryString: "TC Analytics Backend?regen=false",
                    view: "Coverage",
                    path: "coverage"
                },
                period: {
                    queryString: ["week?startDate=",this.startDate,"&endDate=",this.endDate].join(""),
                    view: "Period",
                    path: "report"
                },
                status: {
                    queryString: "status",
                    view: "Status",
                    path: "report"
                }
            },
            chartOpt: {
                responsive: false,
                maintainAspectRatio: false
            },
            width: 500,
            height: 400,
            coverage: {
                front: {
                    statements: "",
                    branches: "",
                    functions: "",
                    lines: ""
                },
                backend: {
                    instructions: "",
                    branches: "",
                    methods: "",
                    lines: "",
                    classes: ""
                }
            }
        };
    },
    watch: {},
    mounted() {
        this.renderSubTitle();
        for (let query in this.querySource) {
            let path = this.querySource[query].path;
            let queryName = query;
            let queryString = this.querySource[query].queryString;
            let viewType = this.querySource[query].view;
            this.buildQuery(path, queryName, queryString, viewType);
        }
        let self = this;
        Event.listen("dataReady", function(data) {
            self.isDataReady[data.whichDataReady] = true;
        });
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
        },
        'bar-chart': {
            extends: HorizontalBar,
            props: ['data', 'options'],
            mounted() {
                this.renderChart(this.data, this.options)
            }
        }
    },
    computed: {},
    methods: {
        getHttpPath(path, queryString) {
            return '/api/'+path+'/'+queryString;
        },
        buildQuery(path, queryName, queryString, viewType) {
            let self = this;

            this.$http.get(self.getHttpPath(path,queryString))
            .then(function(response) {
                let result = self.responseAsView(response, viewType);
                if (path == "report") {
                    self.source[queryName] = result;
                } else if (path == "coverage") {
                    self.coverage[queryName] = result;
                }
                let edata = {
                    whichDataReady: queryName
                };
                Event.fire('dataReady', edata)
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        responseAsView(response, viewType) {
            console.log("respnseAsView:" + JSON.stringify(response));
            let result = {};
            if (viewType == "Doughnut" || 
                viewType == "Line" || 
                viewType == "Pie" || 
                viewType == "HorizontalBar" || 
                viewType ==  "Bar" )
            {
                result.labels = [];
                result.datasets = [{
                    label: "",
                    backgroundColor: this.colorpalette,
                    borderColor: this.colorpalette,
                    data: []
                }];
                if (response && response.data && response.data.length) {
                    response.data.forEach(function(row) {
                        let label = row.slice(0, row.length-1).join(",");
                        let calValue = row[row.length-1];
                        result.labels.push(label);
                        result.datasets[0].data.push(calValue);
                    });
                }
            } else if (viewType == "Table" ) {
                result.rows = [];
                result.columns = [];
                if (response && response.data && response.data.length) {
                    result.rows = response.data;
                    let sampleRecord = result.rows[0];
                    for (let colName in sampleRecord) {
                        let column = {
                            "title": colName,
                            "dataIndex": colName,
                            "sort": true,
                            // "width": '100px',
                            "filter": true
                        }
                        //add jira link
                        if (colName == "Jira Id") {
                            column["render"] = (text) => {
                                return `<a href="https://ubtjira.smec.sap.corp/browse/${text}" target="_blank">${text}</a>`
                            }
                        }
                        result.columns.push(column);
                    }
                }
            } else if (viewType == "Coverage") {
                result = {};
                if (response && response.data && response.data.length) {
                    response.data.forEach(function(row) {
                        result[row.type] = row.rate;
                    });
                }
            } else if (viewType == "Period") {
                result = {
                    labels : [],
                    current: 1
                };
                if (response && response.data) {
                    let total = response.data.total;
                    let current = response.data.current;
                    result.current = current;
                    for(let i=0; i<total; i++) {
                        result.labels.push(i+1);
                    }
                }
            } else if (viewType == "Status") {
                result = "Initial";
                if (response && response.data) {
                    result = response.data;
                }
            }
            return result;
        },
        generateUnitCoverage() {
            console.log("generateUnitCoverage");
            this.buildQuery("coverage", "font", "TC Analytics Front?regen=true", "Coverage");
        },
        renderSubTitle() {
            this.subTitle = [this.startDate, " ~ ", this.endDate, "(" , this.sprint, ")"].join(" ");
        }
    }
    
}
</script>

<style>
    /*a {
        font-style:italic;
        text-decoration:underline;
    }*/
    a:link {
        color:blue;
    }
    a:visited {
        color:blue;
    }
    a:hover {
        color:red;
    }
    a:active {
        color:yellow;
    }
</style>