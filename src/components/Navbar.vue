<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">My Vue APIs</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/">Home </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about"> About</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/gadget"> Gadget</router-link>
                </li>
            </ul>
            <div class="mr-sm-2">
                
            </div>
            <div class="mr-sm-2">
                <app-weather></app-weather>
            </div>
            <div class="log">
                <div class="btn btn-primary btn-sm" @click="onLogin" v-if="!authorized">Login</div>
                <img v-show="$store.state.user" :src="profilePicture" alt="profile" class="login-icon" @click="userModalShow = !userModalShow" >
                <b-modal v-model="userModalShow" class="text-center">
                    <p>Would you like to...</p>
                    <div slot="modal-footer" class="w-100">
                        <b-btn size="sm" class="float-center modal-btn btn btn-danger" variant="primary" @click="onLogout">
                        LogOut
                        </b-btn>
                        <b-btn size="sm" class="float-center modal-btn btn" variant="primary" @click="goToUserProfile">
                        User Profile
                        </b-btn>
                    </div>
                </b-modal>
            </div>
        </div>
        </nav>
    </div>
</template>

<script>
import Weather from "@/components/Weather.vue";

export default {
    name: 'Navbar',
    data() {
        return {
            userModalShow: false
        }
    },
    computed: {
        authorized() {
            return this.$store.getters.isAuthenticated
        },
        profilePicture () {
            return (this.$store.getters.user) ? this.$store.getters.user.data.photoURL : `/static/man.gif`
        
        }
    },
    components: {
        appWeather: Weather
    },
    methods: {
        onLogin() {
            this.$store.dispatch('loginWithFB')
            console.log('after login ' ,this.$store.getters.user)
        },
        onLogout() {
            this.userModalShow = !this.userModalShow
            this.$store.dispatch('logoutFB')
        },
        goToUserProfile() {
            this.userModalShow = !this.userModalShow
            this.$router.push({ name: 'userProfile', params: { userId: this.$store.getters.user.data.uid}})
        }
    },
}
</script>

<style>
.nav-item {
    margin-left: 1em;
    margin-right: 1em;
}
.nav-item a {
    color: white;
}
.login-icon {
    border-radius: 50%;
    width: 2.5em !important;
}

</style>


