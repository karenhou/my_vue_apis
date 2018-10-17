<template>
    <div class="profile container">
        <div class="jumbotron">
            <h1>This is the user Profile of {{this.$store.getters.user.user.name}}</h1>
            <p>profile: {{ this.$store.getters.user.user.email }} </p>
            <p>id: {{this.$store.getters.user.user.id}}</p>
        </div>
    </div>
</template>

<script>
import router from '../router.js'

export default {
    name: 'userProfile',
    // props: ['profile'],
    data() {
        return {

        }
    },
    mounted() {
        console.log('in profile ', this.$store.getters.isAuthenticated)
        if(!this.$store.getters.isAuthenticated) {
            router.replace('/')
        }
    }
    
}
</script>


<style>
.profile {
    margin-top: 5em;
}
</style>
