<template>
  <div class="container-fluid">
    <app-carousel></app-carousel>
    <app-rss-content></app-rss-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel.vue'
import RssContent from '@/components/RssContent.vue'

export default {
  name: "Home",
  components: {
    appCarousel: Carousel,
    appRssContent: RssContent
  }
};
</script>

<style>
.container-fluid {
  margin-top: 5em;
}

</style>
