<template>
  <div class="">
    <app-carousel></app-carousel>
    <app-rss-content v-if="isAuth"></app-rss-content>
    <app-rss-content-not-auth v-else></app-rss-content-not-auth>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import RssContent from '@/components/RssContent.vue'
import appRssContentNotAuth from '@/components/RssContentNotAuth.vue'

export default {
  name: "Home",
  components: {
    appCarousel: Carousel,
    appRssContent: RssContent,
    appRssContentNotAuth: appRssContentNotAuth
  },
  computed: {
    isAuth: function() {
      return this.$store.getters.isAuthenticated
    }
  },
  created() {
    // if(this.$store.getters.isAuthenticated) {
    //   let uid = localStorage.getItem('uid')
    //   this.$store.dispatch('getProfile', uid)
    // }
  }
};
</script>

<style>


</style>
