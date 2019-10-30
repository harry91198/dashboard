<template>
    <div>
        <base-header style="backgroundColor:#40429b" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
        </base-header>
        <div class="container">

            <div class="row mt-5">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <div class="nav-wrapper">
    <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
        <li class="nav-item">
            <div class="nav-link mb-sm-3 mb-md-0" style="cursor: pointer"  v-bind:class="{ active: activeTab[0]}" id="tabs-icons-text-3-tab" data-toggle="tab" @click="activate(0)" role="tab" aria-controls="tabs-icons-text-1" :aria-selected=activeTab[0]><i class="fas fa-chart-bar mr-2"></i>Votes </div>
        </li>
        <li class="nav-item">
            <div class="nav-link mb-sm-3 mb-md-0"  style="cursor: pointer"  v-bind:class="{ active: activeTab[1]}" id="tabs-icons-text-3-tab" data-toggle="tab" @click="activate(1)"  role="tab" aria-controls="tabs-icons-text-2" :aria-selected=activeTab[1]><i class="fas fa-chart-bar  mr-2"></i>Blocks</div>
        </li>
        <li class="nav-item">
            <div class="nav-link mb-sm-3 mb-md-0" style="cursor: pointer"   v-bind:class="{ active: activeTab[2]}" id="tabs-icons-text-3-tab" data-toggle="tab" @click="activate(2)" role="tab" aria-controls="tabs-icons-text-3" :aria-selected=activeTab[2]><i class="fas fa-chart-bar  mr-2"></i>Jobs</div>
        </li>
        <li class="nav-item">
            <div class="nav-link mb-sm-3 mb-md-0" style="cursor: pointer"   v-bind:class="{ active: activeTab[3]}" id="tabs-icons-text-3-tab" data-toggle="tab" @click="activate(3)"  role="tab" aria-controls="tabs-icons-text-3" :aria-selected=activeTab[3]><i class="fas fa-chart-bar mr-2"></i>Staking</div>
        </li>
    </ul>
</div>
<div class="card shadow">
    <div class="card-body">
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show"   v-bind:class="{ active: activeTab[0]}" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                <page-visits-table :tableData="PageVisitsTable.tableData"></page-visits-table>
    </div>
            <div class="tab-pane fade show"  v-bind:class="{ active: activeTab[1]}"  id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                <blocks-table :tableData="BlocksTable.tableData"></blocks-table>
            </div>
            <div class="tab-pane fade show"  v-bind:class="{ active: activeTab[2]}" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                <jobs-table :tableData="JobsTable.tableData"></jobs-table>
            </div>
            <div class="tab-pane fade show"  v-bind:class="{ active: activeTab[3]}" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                <staking-table :tableData="StakingTable.tableData"></staking-table>
            </div>
        </div>
    </div>
</div>

                </div>
            </div>

            <!--End tables-->

    </div>
    </div>
</template>
<script>
  // Charts
  // import * as chartConfigs from '@/components/Charts/config';
  // import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';

  // Tables

  // import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  import BlocksTable from './Dashboard/BlocksTable';
  import JobsTable from './Dashboard/JobsTable';
  import StakingTable from './Dashboard/StakingTable';

  import { url } from '@/utils/commons'

  export default {
    components: {
      // LineChart,
      // BarChart,
      PageVisitsTable,
      StakingTable,
      BlocksTable,
      JobsTable,
    },
    data() {
      return {
          lastDataPoint:'',
          numStakers:'',
          totalStake:'',
          epoch:'',
          activeTab:[true,false,false,false],

        SocialTrafficTable: {
            tableData: []
        },
        PageVisitsTable: {
            tableData: []
        },
        BlocksTable: {
            tableData: []
        },
        JobsTable: {
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
          // extraOptions: chartConfigs.blueChartOptions,
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
        async activate(num) {
            this.activeTab=[false,false,false,false]
            this.activeTab[num]=true
            if(num===1) {
                // if (!BlocksTable.tableData || BlocksTable.tableData.length === 0) {
                    await this.initBlocksTable()
                // }/
            }
            else if (num===2) {
                // if (!JobsTable.tableData || JobsTable.tableData.length === 0) {
                await this.initJobsTable()
            // }
            }
            else if (num===3) {
                // if (StakingTable.tableData === undefined || StakingTable.tableData.length === 0) {

                await this.initStakingTable()
                // }
            }

        },
    //   async initBigChart(index) {
    //     let data = await this.axios.get(url+'job/1')
    //     // console.log('d',data)
    //     // console.log('d',data.data)
    //     // console.log('length',Object.keys(data.data).length)
    //     let data2 = []
    //     let labels = []
    //     for(let i = 0; i < Object.keys(data.data).length; i++) {
    //         data2.push((data.data[i].value/100))
    //         labels.push(this.moment.unix(Number(data.data[i].timestamp)).format('DD-MMM HH:mm'))
    //     }
    //     this.lastDataPoint = String(data2[data2.length-1])
    //     // console.log('d2',data2)
    //     let chartData = {
    //       datasets: [
    //         {
    //           label: 'Price',
    //           data: data2
    //         }
    //       ],
    //       labels: labels,
    //     };
    //     this.bigLineChart.chartData = chartData;
    //     this.bigLineChart.activeIndex = index;
    // },
    async initTables() {
        // console.log('initing')
        // let data = await this.axios.get(url+'votes/1')
        // // console.log(data.data)
        // let totalStake = 0
        // for(let i = 0; i < (data.data.message).length; i++) {
        //     // this.SocialTrafficTable.tableData.push({staker: data.data.message[i].staker, value: Number(data.data.message[i].value), weight: Number(data.data.message[i].weight)})
        //     // console.log('weight', Number(data.data.message[i].weight))
        //     totalStake+=Number(data.data.message[i].weight)
        // }
        // // totalStake = String(totalStake)+ " SCH"
        // for(let i = 0; i < (data.data.message).length; i++) {
        //     this.SocialTrafficTable.tableData.push({staker: data.data.message[i].staker,
        //         value: Number(data.data.message[i].value),
        //         stake: Number(data.data.message[i].weight),
        //         weight: Math.round(Number(data.data.message[i].weight) * 10000 / totalStake) / 100})
        //     // console.log('weight', Number(data.data.message[i].weight))
        //     // totalStake+=Number(data.data.message[i].weight)
        // }
        // this.numStakers = String((data.data.message).length)
        // this.totalStake = String(totalStake)
        let data2 = await this.axios.get(url+'voteEvents/')
        // console.log(data2.data.message)
        let age
        for(let i = (data2.data.message).length-1; i>=0; i--) {
            age = this.moment.unix(data2.data.message[i].timestamp).fromNow()
            this.PageVisitsTable.tableData.push({epoch: data2.data.message[i].epoch,
                 staker: data2.data.message[i].staker,
                 action: data2.data.message[i].action,
                 value: Array.isArray(data2.data.message[i].value)?data2.data.message[i].value.join(","):data2.data.message[i].value,
                 timestamp: age})
        }
    },

    async initBlocksTable() {
        // <!-- res.push({epoch: data.epoch, staker: staker, action: events[i].event, medians: data.medians, jobIds: data.jobIds, timestamp: data.timestamp }) -->
        this.BlocksTable.tableData = []
        let data2 = await this.axios.get(url+'blockEvents/')
        // console.log(data2.data.message)

        let age
        for(let i = (data2.data.message).length-1; i>=0; i--) {
            age = this.moment.unix(data2.data.message[i].timestamp).fromNow()
            this.BlocksTable.tableData.push({epoch: data2.data.message[i].epoch,
                 staker: data2.data.message[i].staker,
                 action: data2.data.message[i].action,
                 medians: (data2.data.message[i].medians.join(",")),
                 lowerCutoffs: (data2.data.message[i].lowerCutoffs.join(",")),
                 higherCutoffs: (data2.data.message[i].higherCutoffs.join(",")),
                  jobIds: (data2.data.message[i].jobIds.join(",")),
                 iteration: (data2.data.message[i].iteration),
                  biggestStakerId: (data2.data.message[i].biggestStakerId),
                  timestamp: age})
        }
    },
    async initStakingTable() {
        // <!-- res.push({epoch: data.epoch, staker: staker, action: events[i].event, value: data.amount, timestamp: data.timestamp }) -->
        this.StakingTable.tableData = []
        let data2 = await this.axios.get(url+'stakingEvents/')
        // console.log(data2.data.message)
        let age
        let data
        let change
        for(let i = (data2.data.message).length-1; i>=0; i--) {
            age = this.moment.unix(data2.data.message[i].timestamp).fromNow()
            data = data2.data.message[i]
            change = data.newStake - data.previousStake
            if(isNaN(change)) change = 0
            this.StakingTable.tableData.push({
                epoch: data.epoch,
                staker: data.staker,
                action: data.action,
                newStake: Math.round(data.newStake/1e16)/100,
                change: Math.round(change/1e16)/100,
               timestamp: age})
        }
    },
    async initJobsTable() {
        // res.push({epoch: data.epoch, id: data.id, action: events[i].event, url: data.url, selector: data.selector, repeat: data.repeat,
        //   creator: data.creator, credit: data.credit, timestamp: data.timestamp })

        this.JobsTable.tableData = []
        let data2 = await this.axios.get(url+'jobEvents/')
        // console.log(data2.data.message)
        let age
        let data
        for(let i = (data2.data.message).length-1; i>=0; i--) {
            data = data2.data.message[i]

            age = this.moment.unix(data.timestamp).fromNow()
            this.JobsTable.tableData.push({
                epoch: data.epoch,
                id: data.id,
                action: data.action,
                name: data.name,
                url: data.url,
                selector: data.selector,
                repeat: data.repeat,
                creator: data.creator,
                credit: data.credit,
                timestamp: age
            })
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
      // this.initBigChart(0);
      this.initTables();
      // this.initBlocksTables();
      // this.initCards();
     // this.bigLineChart.allData=[5,5,5]
    }

};

// app.get('/jobEvents/', async function (req, res) {
//   result = await api.getJobEvents()
//   console.log(result)
//   res.json({'message': result})
// })
// app.get('/blockEvents/', async function (req, res) {
//   result = await api.getBlockEvents()
//   console.log(result)
//   res.json({'message': result})
// })
// app.get('/stakingEvents/', async function (req, res) {
//   result = await api.getStakingEvents()
//   console.log(result)
//   res.json({'message': result})
// })
</script>
<style></style>
