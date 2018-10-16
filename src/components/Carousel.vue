<template>
  <div id="carousel" class="container">
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="5000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <b-carousel-slide :img-src=quote.photoRef v-for="(quote, index) in quotes" :key=index>
          <h1 style="font-size:3vw;">"{{quote.body}}"</h1>
          <p>{{quote.author}}</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Carousel',
  data() {
    return {
      quotes: [],
      slide: 0,
      sliding: null,
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    getQuotes() {
      let i = 0;
      let api = 'https://favqs.com/api/qotd'
      while(i < 3) {
        let random = Math.floor(Math.random() * 1084);
        axios
        .get(api)
        .then(response => {
          this.quotes.push({
            author: response.data.quote.author,
            body: response.data.quote.body,
            photoRef: 'https://picsum.photos/1024/480/?' + random
          });
          // console.log('resp' + response)
        })
        .catch(err => {
            console.log('err ' + err);
        });
        i++;
      }
    },
  },
  created(){
    this.getQuotes()
  }
}
</script>


<style>
#about {
  margin-top: 5em;
}
</style>
