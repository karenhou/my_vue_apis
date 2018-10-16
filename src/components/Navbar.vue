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
                <div class="btn btn-primary btn-sm" @click="login" v-if="!authorized">Login</div>
                <img v-show="profile.name" :src="profilePicture" alt="profile" class="login-icon" @click="userModalShow = !userModalShow" >
                <b-modal v-model="userModalShow" class="text-center">
                    <p>Would you like to...</p>
                    <div slot="modal-footer" class="w-100">
                        <b-btn size="sm" class="float-center modal-btn btn btn-danger" variant="primary" @click="logout">
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
            profile: {},
            authorized: false,
            userModalShow: false
        }
    },
    computed: {
        profilePicture () {
            return (this.profile.id) ? `https://graph.facebook.com/${this.profile.id}/picture?width=300` : `/static/man.gif`
        },
        msg () {
            if (this.profile.name) {
                return `Welcome <b><i> ${this.profile.name} </i></b> to Vue.js App`
            } else {
                return 'Login Facebook to Enjoy the App'
            }
        },
    },
    components: {
        appWeather: Weather
    },
    methods: {
        statusChangeCallback(response) {
            let vm = this
            console.log('vm in stat callback', response)
            if(response.status === 'connected') {
                vm.authorized = true
                vm.getProfile()
            } else if(response.status === 'not_authorized') {
                vm.authorized = false
            } else if(response.status === 'unknown') {
                vm.profile = {}
                vm.authorized = false
            } else {
                vm.authorized = false
            }
            this.$router.push({ name: 'home'});
        },
        getProfile() {
            let vm = this
            FB.api('/me?fields=name,id,email', function (response) {
                console.log('res in getProfile', response)
                vm.$set(vm, 'profile', response)
            })
            
        },
        login() {
            let vm = this
            FB.login(function(response) {
                vm.statusChangeCallback(response)
            }, {
                scope: 'email, public_profile', 
                return_scopes: true
            });
            
        },
        logout() {
            this.userModalShow = !this.userModalShow
            let vm = this
            FB.logout(response => {
                vm.statusChangeCallback(response)
            })
        },
        goToUserProfile() {
            this.userModalShow = !this.userModalShow
            this.$router.push({ name: 'userProfile', params: { userId: this.profile.id, profile: this.profile }})
        }
    },
    mounted () {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '903689369825176',
                cookie     : true,
                xfbml      : true,
                version    : 'v3.1'
            });
            FB.AppEvents.logPageView();
            console.log('fbAsyncInit')

            FB.getLoginStatus(response => {
                this.statusChangeCallback(response);
            }, true);
        };
        console.log('loaded navbar')
    }
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


