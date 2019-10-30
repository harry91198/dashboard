<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Recent Jobs</h3>
        </div>
        <div class="col text-right">
          <!-- <a href="#!" class="btn btn-sm btn-primary">Explore on Etherscan</a> -->
        </div>
      </div>
    </div>
    <base-pagination
      v-model="currentPage"
      :pageCount="pageCount"
      :perPage="perPage"
      aria-controls="my-table"
      class="px-3"
    ></base-pagination>
    <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->

    <div class="table-responsive">

      <base-table thead-classes="thead-light"
                  :data="dataPage"
                  :per-page="perPage"
:current-page="currentPage">
<!-- res.push({epoch: data.epoch, id: data.id, action: events[i].event, url: data.url, selector: data.selector, repeat: data.repeat,
  creator: data.creator, credit: data.credit, timestamp: data.timestamp }) -->

        <template slot="columns">
          <th>Epoch</th>
          <th>Job ID</th>
          <th>Creator</th>
          <th>Age</th>
          <th>Action</th>
          <th>Name</th>
          <th>URL</th>
          <th>Selector</th>
          <th>Repeat</th>
          <!-- <th>Credit</th> -->
        </template>

        <template slot-scope="{row}">
          <th scope="row"  style=" vertical-align: middle;">
            {{row.epoch}}
          </th>
          <td  style=" vertical-align: middle;">
            {{row.id}}
          </td>
          <td scope="row">
            <div class="jazz-box">
              <jazzicon :address=row.staker :diameter="30" />
              <div>{{row.creator}}</div>
            </div>
          </td>
          <td  style=" vertical-align: middle;">
            {{row.timestamp}}
          </td>
          <td  style=" vertical-align: middle;">
              <span class="badge badge-primary">{{row.action}} </span>
          </td>
          <td  style=" vertical-align: middle;">
            {{row.name}}
          </td>
          <td  style=" vertical-align: middle;">
            {{row.url}}
          </td>
          <td  style=" vertical-align: middle;">
            {{row.selector}}
          </td>
          <td  style=" vertical-align: middle;">
            <i class="fa fa-check"   v-if="row.repeat" ></i>
            <i class="fa fa-times" v-else ></i>

          </td>
          <!-- <td  style=" vertical-align: middle;">
            {{row.credit}}
          </td> -->
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'jobs-table',
    props: ['tableData'],
    data() {
      return {
        perPage: 10,
        currentPage: 1
      }
  },
  computed: {
  rows() {
    return this.tableData.length
},
  pageCount() {
    return Math.floor(this.tableData.length / this.perPage)
},
  dataPage() {
      return this.tableData.slice(this.perPage*(this.currentPage-1),this.perPage*(this.currentPage))
  }
}
}

</script>
<style>
</style>
