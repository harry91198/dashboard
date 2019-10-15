<template>
    <div>
        <base-header style="backgroundColor:#40429b" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Last Price"
                                type="gradient-red"
                                :sub-title="lastDataPoint"
                                icon="ni ni-atom"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last datapoint</span>
                        </template> -->
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Stakers"
                                type="gradient-orange"
                                :sub-title="numStakers"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Stake"
                                type="gradient-green"
                                :sub-title="String(numStakers)"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Epoch"
                                type="gradient-info"
                                :sub-title="epoch"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>
                </div>

            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Bitcoin price</h6>
                                <!-- <h5 class="h3 text-white mb-0">Sales value</h5> -->
                            </div>
                            <div class="col">
                                <!-- <ul class="nav nav-pills justify-content-end">
                                    <li class="nav-item mr-2 mr-md-0">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 0}"
                                           @click.prevent="initBigChart(0)">
                                            <span class="d-none d-md-block">Month</span>
                                            <span class="d-md-none">M</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2 px-3"
                                           href="#"
                                           :class="{active: bigLineChart.activeIndex === 1}"
                                           @click.prevent="initBigChart(1)">
                                            <span class="d-none d-md-block">Week</span>
                                            <span class="d-md-none">W</span>
                                        </a>
                                    </li>
                                </ul> -->
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>

                <!-- <div class="col-xl-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
                            </div>
                        </div>

                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                        >
                        </bar-chart>
                    </card>
                </div> -->
            </div>
            <!-- End charts-->

            <!--Tables-->
            <div class="row mt-5">

                <div class="col-xl-12">
                    <social-traffic-table :tableData="SocialTrafficTable.tableData"></social-traffic-table>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <page-visits-table :tableData="PageVisitsTable.tableData"></page-visits-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  // Charts
  // import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';

  // Tables

  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  import { url } from '@/utils/commons'


  export default {
    components: {
      LineChart,
      // BarChart,
      PageVisitsTable,
      SocialTrafficTable,
    },
    data() {
      return {
          lastDataPoint:'',
          numStakers:'',
          totalStake:'',
          epoch:'',

        SocialTrafficTable: {
            tableData: []
        },
        PageVisitsTable: {
            tableData: []
        },
        bigLineChart: {
          allData: [],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
        },
          extraOptions: {
        //     scales: {
        //         xAxes: [{
        //             type: 'time',
        //             time: {
        //                 unit: 'second'
        //             }
        //         }]
        // }
    }
        }
        // redBarChart: {
        //   chartData: {
        //     labels: ['gog', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //     datasets: [{
        //       label: 'Sales',
        //       data: [25, 20, 30, 22, 17, 29]
        //     }]
        //   }
        // }
      };
    },
    methods: {
      async initBigChart() {
        let data = await this.axios.get(url+'job/2')
        // console.log('d',data)
        // console.log('d',data.data)
        // console.log('length',Object.keys(data.data).length)
        let data2 = []
        let labels = []
        for(let i = 0; i < Object.keys(data.data).length; i++) {
            data2.push((data.data[i].value/100))
            labels.push(this.moment.unix(Number(data.data[i].timestamp)).format('DD-MMM HH:mm'))
        }
        this.lastDataPoint = String(data2[data2.length-1])

        // console.log('d2',data2)
        let chartData = {
          datasets: [
            {
              label: 'Price',
              data: data2
            }
          ],
          labels: labels,
        };
        this.bigLineChart.chartData = chartData;
        // this.bigLineChart.activeIndex = index;
    },
    async initTables() {
        // console.log('initing')
        let data = await this.axios.get(url+'votes/2')
        // console.log(data.data)
        let totalStake = 0
        for(let i = 0; i < (data.data.message).length; i++) {
            // this.SocialTrafficTable.tableData.push({staker: data.data.message[i].staker, value: Number(data.data.message[i].value), weight: Number(data.data.message[i].weight)})
            // console.log('weight', Number(data.data.message[i].weight))
            totalStake+=Number(data.data.message[i].weight)
        }
        this.totalStake = Math.round(Number(totalStake/1e16))/100

        for(let i = 0; i < (data.data.message).length; i++) {
            this.SocialTrafficTable.tableData.push({staker: data.data.message[i].staker,
                value: Number(data.data.message[i].value),
                stake: Math.round(Number(data.data.message[i].weight)/1e16)/100,
                weight: Math.round(Number(data.data.message[i].weight) * 10000 / totalStake) / 100})
            // console.log('weight', Number(data.data.message[i].weight))
            // totalStake+=Number(data.data.message[i].weight)
        }
        // sorting by stake and filter whose stake value is 0 
        this.SocialTrafficTable.tableData.sort((a, b) => b.stake - a.stake).splice(this.SocialTrafficTable.tableData.findIndex(item => item.stake === 0), this.SocialTrafficTable.tableData.length)

        this.numStakers = String((data.data.message).length)
        // this.totalStake = String(totalStake)
        let data2 = await this.axios.get(url+'voteEvents/2')
        // console.log(data2.data.message)
        let age
        for (let i = (data2.data.message).length-1; i>=0; i--) {
            age = this.moment.unix(data2.data.message[i].timestamp).fromNow()
            this.PageVisitsTable.tableData.push({epoch: data2.data.message[i].epoch, staker: data2.data.message[i].staker, action: data2.data.message[i].action, value: (data2.data.message[i].value), timestamp: age})
        }
    },
    async initCards() {
        // console.log('initing')
        let data = await this.axios.get(url+'epoch')
        // console.log(data.message)
        this.epoch = String(data.data.message)
      }
    },
    mounted() {
      this.initBigChart(0);
      this.initTables();
      this.initCards();
     // this.bigLineChart.allData=[5,5,5]
    }
  };
</script>
<style></style>
