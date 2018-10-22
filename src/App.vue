<template>
  <div>
    <app-navbar></app-navbar>
    <router-view></router-view>
    <footer class="py-3 myFooter">
      <div class="container">
        <span class="text-muted">Footer</span>
      </div>
    </footer>
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
    appNavbar: Navbar,
  },
  created(){
    this.$store.dispatch('loginWithCreditials')
  }
}
</script>

<style>
.myFooter {
  background: #343a40;
  color:white;
}
</style>
