<template>
    <div class="container my-5 py-5">
        <div class="jumbotron py-5">
            <h1>User Profile: {{this.$store.getters.user.data.displayName}}</h1>
            <div class="row sub-title">
                <div class="col">
                    {{ this.$store.getters.user.data.email}}
                </div>
            </div>
            <hr class="my-4">
            <h4>Saved RSS:</h4>
            <div class="row" >
                <div class="col-sm" v-for="(x, index) in savedRssList" :key="index">
                    <p><img :src="x.data.feed.image" alt="icon" class="rssIcon"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import router from "../router.js";

export default {
  name: "userProfile",
  data() {
    return {};
  },
  computed: {
    savedRssList: function() {
      if (this.$store.getters.content) return this.$store.getters.content;
    }
  },
  mounted() {
    let mytoken = localStorage.getItem("myToken");
    if (!mytoken) {
      router.replace("/");
    }
  }
};
</script>


<style>
.profile {
  margin-top: 5em;
}

.rssIcon {
  height: 4em;
  width: 8em;
}
</style>
