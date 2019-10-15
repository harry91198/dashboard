<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Votes by stakers in last epoch</h3>
        </div>
        <!-- <div class="col text-right">
          <base-button size="sm" type="primary">See all</base-button>
        </div> -->
      </div>
    </div>

    <!-- BasePagination -->
    <base-pagination
      v-model="currentPage"
      :pageCount="pageCount"
      :perPage="perPage"
      aria-controls="my-table"
      class="px-3"
      ></base-pagination>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="dataPage"
                  :per-page="perPage"
                  :current-page="currentPage">
        <template slot="columns">
          <th>Staker</th>
          <th>Value</th>
          <th>Stake</th>
          <th>Weight</th>
        </template>

        <template slot-scope="{row}">
          <td scope="row">
            <div class="jazz-box">
              <jazzicon :address=row.staker :diameter="30" />
              <div><router-link :to= "{name:'staker', params:{address : row.staker }}">{{row.staker}}</router-link></div>
            </div>
        </td>
          <td  style=" vertical-align: middle;">
            {{row.value}}
          </td>
          <td  style=" vertical-align: middle;">
            {{row.stake}}
          </td>
          <td  style=" vertical-align: middle;">
            <div class="d-flex align-items-center">
              <!-- <span class="mr-2">{{row.weight}}%</span> -->
              <base-progress
                             class="pt-0"
                             :show-percentage="true"
                             :value="row.weight"
              />
            </div>
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'social-traffic-table',
    props: ['tableData'],
    data() {
      return {
        perPage: 5,
        currentPage: 1
      }
    },
    computed: {
      rows() {
        return this.tableData.length
      },
      pageCount() {
        return Math.ceil(this.tableData.length / this.perPage)
      },
      dataPage() {
        return this.tableData.slice(this.perPage*(this.currentPage-1),this.perPage*(this.currentPage))
      }
    }
  }
</script>
<style>
</style>
