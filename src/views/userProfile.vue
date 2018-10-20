<template>
    <div class="profile container">
        <div class="jumbotron">
            <h1>User Profile: {{this.$store.getters.user.data.displayName}}</h1>
            <div class="row sub-title">
                <div class="col">
                    {{ this.$store.getters.user.data.email}}
                </div>
            </div>
            
            <p><span></span><span></span></p>
            <hr class="my-4">
            <h4>Saved RSS:</h4>
            <div class="row" >
                <div class="col-sm" v-for="(x, index) in savedRssList" :key="index">
                    <p><img :src="x.data.feed.image" alt="icon" class="rssIcon"></p>
                </div>
            </div>
        </div>
        <!-- <div class="jumbotron">
            <div class="row ">
                <div class="col-md-4">
                    <img src="https://via.placeholder.com/100x205" class="w-100">
                </div>
                <div class="col-md-8 px-3">
                    <div class="card-block px-3">
                    <h4 class="card-title">Lorem ipsum dolor sit amet</h4>
                    <hr class="my-4">
                    <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <p class="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        </div> -->
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
