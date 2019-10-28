<template>
<div>
  <base-header style="backgroundColor:#40429b" class="pb-6 pb-8 pt-5 pt-md-8">
    <div class="col-xl-3 col-lg-6 mb-4">
      <div class="row">
        <h1 style="color:white">Datafeed</h1>
        <select v-model="selected" @change="init(selected)" class="form-control">
          <option disabled selected :value="null">Select a datafeed</option>
          <option v-for="job in jobs" :value="job.id" :key="job.id">{{ job.url }}</option>
        </select>
      </div>
    </div>

    <div class="row" v-if="selected">
      <div class="col-xl-3 col-lg-6">
        <stats-card title="Last Datapoint" type="gradient-red" :sub-title="lastDataPoint" icon="ni ni-atom" class="mb-4 mb-xl-0" />
      </div>
      <div class="col-xl-3 col-lg-6">
        <stats-card title="Job ID" type="gradient-orange" :sub-title="selected" icon="ni ni-chart-pie-35" class="mb-4 mb-xl-0" />
      </div>
      <div class="col-xl-3 col-lg-6">
        <stats-card title="Total Stake" type="gradient-green" :sub-title="totalStake" icon="ni ni-money-coins" class="mb-4 mb-xl-0" />
      </div>
      <div class="col-xl-3 col-lg-6">
        <stats-card title="Epoch" type="gradient-info" :sub-title="epoch" icon="fas fa-hourglass-end" class="mb-4 mb-xl-0" />
      </div>
    </div>
  </base-header>

  <div class="container-fluid mt-7" v-if="selected">
    <div class="row">
      <div class="col-xl-12 mb-5 mb-xl-0">
        <card type="default" header-classes="bg-transparent">
          <div slot="header" class="row align-items-center">
            <div class="col">
              <h6 class="text-light text-uppercase ls-1 mb-1">Data</h6>
            </div>
            <div class="col">
            </div>
          </div>
          <line-chart :height="350" ref="bigChart" :chart-data="bigLineChart.chartData" :extra-options="bigLineChart.extraOptions">
          </line-chart>

        </card>
      </div>
    </div>
    <!-- End charts-->

    <!--Tables-->
    <div class="row mt-5" v-if="stakers.length > 0">
      <div class="col-xl-12">
        <social-traffic-table :tableData="stakers"></social-traffic-table>
      </div>
    </div>
    <div class="row mt-5" v-if="transactions.length > 0">
      <div class="col-xl-12 mb-5 mb-xl-0">
        <page-visits-table :tableData="transactions"></page-visits-table>
      </div>
    </div>
  </div>

</div>
</template>
<script>
// Charts
import * as chartConfigs from '@/components/Charts/config';
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
      lastDataPoint: '',
      numStakers: '',
      totalStake: '',
      epoch: '',

      stakers: [],
      transactions: [],
      jobs: [],
      selected: null,
      bigLineChart: {
        allData: [
          [0, 1, 2, 3, 1],
          // [0, 20, 5, 25, 10, 30, 15, 40, 40]
        ],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: [],
        },
        extraOptions: chartConfigs.blueChartOptions,
      }
    }
  },
  methods: {
    async getJobs() {
      let data = await this.axios.get(url+'jobs')
      for (let i = 0; i < data.data.message.length; i++) {
        this.jobs.push({
          'url': data.data.message[i].url,
          'id': data.data.message[i].id
        })
      }
      // console.log(this.jobs)

    },
    async initBigChart(jobId) {
      let data = await this.axios.get(url+'job/' + jobId)
      // console.log('d',data)
      // console.log('d',data.data)
      // console.log('length',Object.keys(data.data).length)
      let data2 = []
      let labels = []
      for (let i = 0; i < Object.keys(data.data).length; i++) {
        data2.push((data.data[i].value / 100000000))
        labels.push(this.moment.unix(Number(data.data[i].timestamp)).format('DD-MMM HH:mm'))
      }
      this.lastDataPoint = String(data2[data2.length - 1])

      // console.log('d2',data2)
      let chartData = {
        datasets: [{
          label: 'Price',
          data: data2
        }],
        labels: labels,
      };
      this.bigLineChart.chartData = chartData;
      // this.bigLineChart.activeIndex = index;
    },
    async initTables (jobId) {
      const [ stakers, transactions ] = await Promise.all([
        this.axios.get(url+'votes/' + jobId).then(res => res.data),
        this.axios.get(url+'voteEvents/' + jobId).then(res => res.data)
      ])

      let totalStake = stakers.message.reduce((acc, message) => acc + Number(message.weight), 0)
      this.totalStake = Math.round(Number(totalStake/1e16))/100

      const _stakers = []

      for (let i = 0; i < stakers.message.length; i++) {
        _stakers.push({
          staker: stakers.message[i].staker,
          value: Number(stakers.message[i].value),
          stake: Math.round(Number(stakers.message[i].weight)/1e16)/100,
          weight: Math.round(Number(stakers.message[i].weight) * 10000 / totalStake) / 100
        })
      }

      this.stakers = _stakers
      this.numStakers = String(stakers.message.length)
      // this.totalStake = String(totalStake)

      const _transactions = []

      let age
      for(let i = (transactions.message).length-1; i>=0; i--) {
          age = this.moment.unix(transactions.message[i].timestamp).fromNow()

        _transactions.push({
          epoch: transactions.message[i].epoch,
          staker: transactions.message[i].staker,
          action: transactions.message[i].action,
          value: (transactions.message[i].value),
          timestamp:age
        })
      }

      this.transactions = _transactions
    },
    async initCards() {
      // console.log('initing')
      let data = await this.axios.get(url+'epoch')
      // console.log(data.message)
      this.epoch = String(data.data.message)
    },
    async init(jobId) {
      await this.initCards()
      await this.initBigChart(jobId)
      await this.initTables(jobId)
    }
  },
  mounted() {
    this.getJobs()
  }
}
</script>
<style></style>
