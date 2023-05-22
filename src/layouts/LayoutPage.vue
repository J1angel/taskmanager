<template>
  <div>
    <Loader/>
    <vue-scroll-progress-bar @complete="handleComplete" height="0.2rem" backgroundColor="linear-gradient(to right, #067bfe, #0885ff)" style="z-index: 10000" />
    <div class="wrapper">
      <!-- TOP Nav Bar -->
      <SideBarStyle1 :items="sidebar" :logo="logo" />
      <NavBarStyle1 :title="'Task Management Tool'" :homeURL="{ name: 'dashboard.home' }" :logo="logo">
        <template slot="responsiveRight">
          <ul class="navbar-nav ml-auto navbar-list">
            <li class="nav-item">
              <a href="#" class="search-toggle iq-waves-effect">
                <CreateTaskModal />
              </a>
            </li>
          </ul>
        </template>
        <template slot="right">
          <ul class="navbar-list">
            <li>
              <a href="#" class="search-toggle iq-waves-effect bg-primary text-white">
                <img :src="userProfile" class="img-fluid rounded" alt="user">
              </a>
              <div class="iq-sub-dropdown iq-user-dropdown">
                <div class="iq-card shadow-none m-0">
                  <div class="iq-card-body p-0 ">
                    <div class="bg-primary p-3">
                      <h5 class="mb-0 text-white line-height">{{user.name}}</h5>
                      <span class="text-white font-size-12">Available</span>
                    </div>
                    <div class="d-inline-block w-100 text-center p-3">
                      <a class="iq-bg-danger iq-sign-btn" href="#" role="button" @click="logout">Sign out<i class="ri-login-box-line ml-2"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </NavBarStyle1>
      <!-- TOP Nav Bar END -->
      <div id="content-page" class="content-page">
        <transition name="router-anim">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '../components/sofbox/loader/LoaderPage'
import NavBarStyle1 from '../components/sofbox/navbars/NavBarStyle1'
import SideBarItems from '../menu/json/SideBar'
import profile from '../assets/images/user/11.jpg'
import logo from '../assets/images/logo.png'
import { sofbox } from '@/config/pluginInit'
import store from "@/store";
import SideBarStyle1 from '../components/sofbox/sidebars/SideBarStyle1'
import CreateTaskModal from "@/components/sofbox/modals/CreateTaskModal";

export default {
  name: 'LayoutPage',
  components: {
    Loader,NavBarStyle1,SideBarStyle1, CreateTaskModal
  },
  mounted () {
    sofbox.mainIndex()

  },
  watch: {
  },
  computed:{
    user() {
      return store.getters["TaskData/user"]
    },

  },
  data () {
    return {
      sidebar: SideBarItems,
      userProfile: profile,
      logo: logo,
      showNavTicket:'',
      numberOfTicket:'',
      nums: '',
      notification:[]
    }
  },
  methods:{
    handleComplete () {},
    logout(){
      store.dispatch('TaskData/logout')
    }
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
</style>
