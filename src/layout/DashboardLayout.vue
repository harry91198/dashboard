<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Razor"
      title="Razor"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Ether',
            icon: 'fab fa-ethereum text-grey',
            path: '/dashboard'
          }"
        />

         <sidebar-item :link="{name: 'Bitcoin', icon: 'fab fa-bitcoin  text-orange', path: '/bitcoin'}"/>
         <sidebar-item :link="{name: 'Explorer Datafeeds', icon: 'fas fa-binoculars text-primary', path: '/custom'}"/>
        <sidebar-item :link="{name: 'Add Datafeed', icon: 'fas fa-search text-primary', path: '/query'}"/>
        <sidebar-item :link="{name: 'Faucet', icon: 'fas fa-shower text-primary', path: '/faucet'}"/>
        <sidebar-item :link="{name: 'Explore Transactions', icon: 'fas fa-chart-bar text-primary', path: '/stats'}"/>
        <!-- <sidebar-item :link="{name: 'Help', icon: 'fa fas-telegram', path: 'https://t.me/razornetwork'}"/> -->
        <li class="nav-item">
            <a

                    class="nav-link"

                    href="https://t.me/razornetwork">

                    <i class="fab fa-telegram text-primary"></i>
                    <span class="nav-link-text">Help</span>
            </a>
        </li>
        <li class="nav-item">
            <a

                    class="nav-link"

                    href="https://razor.network">

                    <i class="fas fa-globe text-primary"></i>
                    <span class="nav-link-text">Back to Homepage</span>
            </a>
        </li>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
