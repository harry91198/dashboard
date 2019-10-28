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
                    <h1>Schell Faucet</h1>
<p class = "description">
                    <b>Note: Use Ethereum compatible browser and set network to Görli. Make sure you have some eth for tx. </b> </p>
                    <p class = "description">1. Get some Görli Ether from <a target ="_blank" href="https://faucet.goerli.mudit.blog/">here</a></p>
                    <p class = "description">2. Enter your address and click the button below </p>
                    <p class = "description">3. 1000 Görli SCH will be given once per address</p>
                    <div class="form-group">

                    <input  v-model = "address" placeholder="0xdeadbeef" class="form-control" />
</div>                    <div class="form-group">


                    <div class="btn btn-primary" @click = "submit"> Get SCH </div> </div>
                    <div class="form-group">
<div class="btn btn-primary" @click = "getBalance"> Check SCH Balance </div> </div>
<p class="description">
    {{balanceText}}
    <!-- Your SCH balance: {{balance}} -->
</p>
                <!-- </form> -->
        </div></div>
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

    </div>
</template>
<script>

import { enableEth, faucet, getSchBalance } from '@/utils/commons'

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
          address:null,
          balance: 0,
          balanceText: ''



        // redBarChart: {
        //   chartData: {
        //     labels: ['gog', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //     datasets: [{
        //       label: 'Sales',
        //       data: [25, 20, 30, 22, 17, 29]
        //     }]
        //   }
        // }
      }
    },
    methods: {
         async submit () {
             let res  = await enableEth()
             if (res) await faucet(this.address)
          // this.refresh()
      }, async getBalance() {
          let res  = await enableEth()

          this.balanceText = ''
          this.balance = await getSchBalance(this.address)
          this.balanceText = "Your SCH balance:" + String(Math.round(this.balance/1e16)/100)
      }
    },
    mounted() {
      // this.getBalance();
     // this.bigLineChart.allData=[5,5,5]
    }
  };
</script>
<style></style>
