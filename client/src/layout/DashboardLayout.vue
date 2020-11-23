<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Principal',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />      
        <sidebar-item :link="{name: 'Pet', icon: ' fas fa-paw text-yellow', path: '/pet'}"/>
        <sidebar-item :link="{name: 'Endereço', icon: 'ni ni-delivery-fast text-green', path: '/endereco'}"/>
        
        <sidebar-item :link="{name: 'Sair', icon: 'ni ni-user-run text-red', path: '/Login'}"/>
         <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/> 
        <sidebar-item :link=" {name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>        
        <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> 

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
