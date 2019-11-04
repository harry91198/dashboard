<template>
    <div>
        <base-header style="backgroundColor:#40429b" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <!-- <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            -->
            </div>
        </base-header>

        <!--Charts-->
        <!-- <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Bitcoin price</h6>
                                <h5 class="h3 text-white mb-0">Sales value</h5> -->
                            <!-- </div>
                            <div class="col"> -->
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
                            <!-- </div>
                        </div> -->
                        <!-- <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div> -->

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
            <!-- </div> -->
            <!-- End charts-->

            <!--Tables-->
            <div class="container">
            <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">

                    <!-- (url, selector, repeat, eth, account) -->
                <!-- <form  @submit="formSubmit"> -->
                    <h1>Add datafeed</h1>

                    <p class = "description"> <b>Note: Use ethereum compatible browser and set network to Görli. Make sure you have some ether to pay the transaction fees.</b></p>
                <!-- <p class = "description">Example: Use the following URL to fetch price of US stocks from NASDAQ. Substitute AAPL with symbol of any stock.</p> -->
                    <!-- <p class = "description">https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=E1BN9Y09VQ32BQ00</p> -->
                    <!-- <p class = "description">Use selector: Global Quote["05. price"]</p> -->
                    <p class = "description">Example: https://api.gemini.com/v1/pubticker/ltcusd, Selector: last, Name: LTC </p>
                    <p class = "description">Check "Explore custom queries" page after a few minutes to see the result.</p>
                    <br/>
<div class="form-group">
                    <input  v-model = "url" placeholder="JSON URL" class="form-control" />
</div>
<div class="form-group">
                    <input  v-model= "selector" placeholder="JSON selector" class="form-control" />
                </div>
<div class="form-group">
                    <input  v-model= "name" placeholder="Name" class="form-control" />
                </div>
                <div class="form-group">

                    <!-- Repeat: <input type="checkbox"   v-model="repeat" placeholder="selector" class="form-control" /> -->
                    <!-- <input  v-model='eth' placeholder="fees in ether" class="form-control" /> -->
                    <div class = 'row'><div class="btn btn-primary" @click = "testQuery"> Test Query </div> </div>

                    <div class = 'row' ><p class = "description"> {{datumText}}</p> </div>
                    <div class= 'row' ><div class="btn btn-primary" @click = "createJob" :class="{disabled:(!datum || datum===undefined) || name==='' }"> Submit </div> </div>
                </div>
                <!-- </form> -->
        </div>
        </div>
    </div>
      </div>
            <!-- <div class="row mt-5">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <page-visits-table></page-visits-table>
                </div>
                <div class="col-xl-4">
                    <social-traffic-table></social-traffic-table>
                </div>
            </div> -->
            <!--End tables-->
        <!-- </div> -->

</template>
<script>

import { enableEth, createJob, get } from '@/utils/commons'

  // Charts
  // import * as chartConfigs from '@/components/Charts/config';
  // import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';

  // Tables

  // import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  // import PageVisitsTable from './Dashboard/PageVisitsTable';

  export default {
    components: {
      // LineChart,
      // BarChart,
      // PageVisitsTable,
      // SocialTrafficTable,
    },
    data() {
      return {
          error:null,
          url: null,
          selector: null,
          name: '',
          eth: 1,
          account: null,
          repeat: true,
          datum: '',
          datumText: '',
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
         async createJob () {
          let res  = await enableEth()
          if (res) await createJob(this.url, this.selector, this.name, this.repeat, this.eth)
          // this.refresh()
      },
         async testQuery () {
             try {
         this.datumText = ''
           let url = this.url.replace(/(^\w+:|^)\/\//, '')
           url = 'https://razorscan.io/cors-proxy/' + url
           console.log('querying', url)
           let response = await this.axios.get(url)
           // console.log(response)
           this.datum = await get(response.data, this.selector)
            this.datumText = 'Result of the query:'+ String(this.datum)
           // datum = Math.floor(Number(datum) * 100)
           // data.push(datum)
         } catch (e) {
           // console.error(e)
           this.datum = "Error"
         }

          // this.refresh()
      }
      // async initBigChart() {
      //   let data = await this.axios.get(url+'job/1')
      //   // console.log('d',data)
      //   // console.log('d',data.data)
      //   // console.log('length',Object.keys(data.data).length)
      //   let data2 = []
      //   let labels = []
      //   for(let i = 0; i < Object.keys(data.data).length; i++) {
      //       data2.push((data.data[i].value/100))
      //       labels.push(this.moment.unix(Number(data.data[i].timestamp)).format('DD-MMM HH:mm'))
      //   }
      //   // console.log('d2',data2)
      //   let chartData = {
      //     datasets: [
      //       {
      //         label: 'Price',
      //         data: data2
      //       }
      //     ],
      //     labels: labels,
      //   };
      //   this.bigLineChart.chartData = chartData;
      //   // this.bigLineChart.activeIndex = index;
      // }
    },
    mounted() {

      // this.initBigChart();
     // this.bigLineChart.allData=[5,5,5]
    }
  };
</script>
<style></style>
