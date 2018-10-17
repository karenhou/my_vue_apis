<template>
  <!-- <div id="app">
    <div id="nav">
      <app-navbar></app-navbar>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->
  <div id="app">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    appNavbar: Navbar
  },
  created(){
    // console.log('in app access token ' ,this.$store.getters.token)
    this.$store.dispatch('loginWithCreditials')
    // this.$store.getter.token
    // this.$store.dispatch('init')
  }
}
</script>
