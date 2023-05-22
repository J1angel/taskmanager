<template>
  <!--<div class="iq-sidebar">
    <nav class="iq-sidebar-menu">
      <List :items="items" />
    </nav>
  </div>-->
  <!-- Sidebar  -->
  <div class="iq-sidebar">
    <div class="iq-sidebar-logo d-flex justify-content-between">
      <router-link :to="homeURL">
        <img :src="logo" class="img-fluid" alt="logo">
        <span>TASK MANAGEMENT TOOL</span>
      </router-link>
    </div>
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
export default {
  name: 'SideBarStyle1',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'dashboard.home' }) },
    items: { type: Array },
    logo: { type: String, default: require('../../../assets/images/logo.png') },
    horizontal: { type: Boolean }
  },
  data () {
    return {
    }
  }
}
</script>
