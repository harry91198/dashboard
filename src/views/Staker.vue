<template>
    <div>
        <base-header style="backgroundColor:#40429b" class="pb-6 pb-8 pt-5 pt-md-8">
        <!-- Staker: {{address}} -->
            <!-- Card stats -->
            <!-- <div class="row">
                <div>Staker</div>
            </div> -->

                <div class="row">
                
                    <div class="col-xl-3 col-lg-6">
                        <stats-card title="Stake"
                                    type="gradient-red"
                                    :sub-title="String(stakeBalance)"
                                    icon="ni ni-atom"
                                    class="mb-4 mb-xl-0"
                        >
                        </stats-card>
                    </div>
                    <div class="col-xl-3 col-lg-6">
                        <stats-card title="Eth"
                                    type="gradient-orange"
                                    :sub-title="String(ethBalance)"
                                    icon="ni ni-chart-pie-35"
                                    class="mb-4 mb-xl-0"
                                    >
                        </stats-card>
                    </div>
                    <div class="col-xl-3 col-lg-6">
                        <stats-card title="Sch"
                                    type="gradient-green"
                                    :sub-title="String(schBalance)"
                                    icon="ni ni-money-coins"
                                    class="mb-2 mb-xl-0"
                                    >
                        </stats-card>
                    </div>
                    <!-- <stats-card title="Staker"
                                type="gradient-red"
                                :sub-title="address"
                                icon="ni ni-atom"
                                class="mb-4 mb-xl-0"
                                ethTitle="ETH"
                                schTitle="SCH"
                                :ethAmount="ethBalance"
                                :schAmount="schBalance"
                    >

{{ $route.params.address }}
                    </stats-card> -->



                </div>

                <!-- <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Stakers"
                                type="gradient-orange"
                                :sub-title="numStakers"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div> -->
                <!--
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Stake"
                                type="gradient-green"
                                :sub-title="totalStake"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Epoch"
                                type="gradient-info"
                                :sub-title="epoch"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >


                    </stats-card>
                </div>

            </div> -->
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Stake over time</h6>
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
                    <!-- <social-traffic-table :tableData="SocialTrafficTable.tableData"></social-traffic-table> -->
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <staking-table :tableData="StakingTable.tableData"></staking-table>
                </div>
            </div>

            <!--End tables-->
        </div>

    </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import StakingTable from './Dashboard/StakingTable';

  // import BarChart from '@/components/Charts/BarChart';

  // Tables

  // import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  // import PageVisitsTable from './Dashboard/PageVisitsTable';
  import { url } from '@/utils/commons'

  export default {
    components: {
      LineChart,
      StakingTable
      // BarChart,
      // PageVisitsTable,
      // SocialTrafficTable,
    },
    data() {
      return {
          lastDataPoint:'',
          numStakers:'',
          totalStake:'',
          epoch:'',
          address: this.$route.params.address,
          stakeBalance: 0,
          ethBalance: 0,
          schBalance: 0,
          
        SocialTrafficTable: {
            tableData: []
        },
        StakingTable: {
            tableData: []
        },
        bigLineChart: {
          allData: [
            [0, 1, 2, 3,1],
            // [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
        },
          extraOptions: chartConfigs.blueChartOptions,
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
      async getBalance() {
          let data = await this.axios.get(url + 'getEthbalance/'+this.address)
          let data1 = await this.axios.get(url + 'getSchbalance/'+this.address)
          let data2 = await this.axios.get(url + 'getStake/' + this.address)
          this.ethBalance = Math.round(Number(data.data.message)/1e16)/100
          this.schBalance = Math.round(Number(data1.data.message)/1e16)/100
          this.stakeBalance = Math.round(Number(data2.data.message)/1e16)/100
    },
      async initBigChart() {
          let data = await this.axios.get(url+'stakerEvents/'+this.address)

        // console.log('d',data)
        // console.log('d',data.data)
        // console.log('length',Object.keys(data.data).length)
        let data2 = []
        let labels = []
        for(let i = 0; i < Object.keys(data.data.result).length; i++) {
            data2.push(Math.round(data.data.result[i].newStake/1e16)/100)
            labels.push(this.moment.unix(Number(data.data.result[i].timestamp)).format('DD-MMM HH:mm'))
        }
        this.lastDataPoint = String(data2[data2.length-1])
        // console.log('d2',data2)
        let chartData = {
          datasets: [
            {
              label: 'Stake',
              data: data2
            }
          ],
          labels: labels,
        };
        this.bigLineChart.chartData = chartData;
        //table
        this.StakingTable.tableData = []
        let data3 = data
        // console.log(data2.data.message)
        let age
        let _data
        let change
        for(let i = (data3.data.result).length-1; i>=0; i--) {
            age = this.moment.unix(data3.data.result[i].timestamp).fromNow()
            _data = data3.data.result[i]
            change = _data.newStake - _data.previousStake
            if(isNaN(change)) change = 0
            this.StakingTable.tableData.push({
                epoch: _data.epoch,
                staker: _data.staker,
                action: _data.action,
                newStake: Math.round(_data.newStake/1e16)/100,
                change: Math.round(change/1e16)/100,
               timestamp: age})
        }
        // this.bigLineChart.activeIndex = index;
    }
    // async initStakingTable() {
    //     // <!-- res.push({epoch: data.epoch, staker: staker, action: events[i].event, value: data.amount, timestamp: data.timestamp }) -->
    //     this.StakingTable.tableData = []
    //     let data2 = await this.axios.get('https://api.razor.network/stakerEvents/'+this.address)
    //     // console.log(data2.data.message)
    //     let age
    //     let data
    //     let change
    //     for(let i = (data2.data.result).length-1; i>=0; i--) {
    //         age = this.moment.unix(data2.data.result[i].timestamp).fromNow()
    //         data = data2.data.result[i]
    //         change = data.newStake - data.previousStake
    //         if(isNaN(change)) change = 0
    //         this.StakingTable.tableData.push({
    //             epoch: data.epoch,
    //             staker: data.staker,
    //             action: data.action,
    //             newStake: data.newStake,
    //             change: change,
    //            timestamp: age})
    //     }
    // },
        // async initTables() {
        //     // console.log('initing')
        //     let data = await this.axios.get(url+'votes/1')
        //     // console.log(data.data)
        //     let totalStake = 0
        //     for(let i = 0; i < (data.data.message).length; i++) {
        //         // this.SocialTrafficTable.tableData.push({staker: data.data.message[i].staker, value: Number(data.data.message[i].value), weight: Number(data.data.message[i].weight)})
        //         // console.log('weight', Number(data.data.message[i].weight))
        //         totalStake+=Number(data.data.message[i].weight)
        //     }
        //     // totalStake = String(totalStake)+ " SCH"
        //     for(let i = 0; i < (data.data.message).length; i++) {
        //         this.SocialTrafficTable.tableData.push({staker: data.data.message[i].staker,
        //             value: Number(data.data.message[i].value),
        //             stake: Number(data.data.message[i].weight),
        //             weight: Math.round(Number(data.data.message[i].weight) * 10000 / totalStake) / 100})
        //         // console.log('weight', Number(data.data.message[i].weight))
        //         // totalStake+=Number(data.data.message[i].weight)
        //     }
        //     this.numStakers = String((data.data.message).length)
        //     this.totalStake = String(totalStake)
        //     let data2 = await this.axios.get(url+'voteEvents/1')
        //     // console.log(data2.data.message)
        //     let age
        //     for(let i = (data2.data.message).length-1; i>=0; i--) {
        //         age = this.moment.unix(data2.data.message[i].timestamp).fromNow()
        //         this.PageVisitsTable.tableData.push({epoch: data2.data.message[i].epoch, staker: data2.data.message[i].staker, action: data2.data.message[i].action, value: (data2.data.message[i].value), timestamp: age})
        //     }
        // },
    // async initCards() {
    //     // console.log('initing')
    //     let data = await this.axios.get(url+'epoch')
    //     // console.log(data.message)
    //     this.epoch = String(data.data.message)
    //
    //
    // }
},
    mounted() {
      this.getBalance();
      this.initBigChart();
      // this.initStakingTable();
      // this.initTables();
      // this.initCards();
     // this.bigLineChart.allData=[5,5,5]
    }

};
</script>
<style></style>
