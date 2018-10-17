<template>
    <div class="profile container">
        <div class="jumbotron">
            <h1>This is the user Profile of {{this.$store.getters.user.data}}</h1>
            <p>profile: {{ this.$store.getters.user.data.email }} </p>
            <p>id: {{this.$store.getters.user.data.uid}}</p>
            <p>list: {{this.$store.getters.list}}</p>
        </div>
    </div>
</template>

<script>
import router from '../router.js'

export default {
    name: 'userProfile',
    data() {
        return {

        }
    },
    mounted() {
        let mytoken = localStorage.getItem('myToken')
        if(mytoken){
            // console.log('in auto login mytoken = ', mytoken)
        } else {
            router.replace('/')
        }
        // this.$store.dispatch('getProfile', this.$store.getters.user.data.uid)
    }
    
}
</script>


<style>
.profile {
    margin-top: 5em;
}
</style>
