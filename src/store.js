import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: null,
        user: null,
        authorized: false
    },
    mutations: {
        authUser(state, userData) {
            state.accessToken = userData.accessToken
            state.authorized = userData.authorized
        },
        storeUser(state, userData) {
            state.user = userData
        },
        clearUser(state) {
            state.user = null
            state.authorized = false
            state.accessToken = null
        }
    },
    actions: {
        statusChangeCallback({commit, dispatch}, response) {
            console.log('vm in stat callback', response.status)
            if(response.status === 'connected') {
                console.log('connected ' ,response)
                commit('authUser', {
                    accessToken: response.authResponse.accessToken,
                    authorized: true,
                })
                localStorage.setItem('myToken', response.authResponse.accessToken);
                localStorage.setItem('myId', response.authResponse.userID);
                localStorage.setItem('expirationDate', response.authResponse.expiresIn);
                dispatch('getProfile');
                // vm.authorized = true
                // vm.getProfile()
            } else if(response.status === 'not_authorized') {
                // vm.authorized = false
                commit('authUser', {
                    accessToken: null,
                    authorized: false,
                })
                router.replace('/');
            } else if(response.status === 'unknown') {
                // vm.profile = {}
                // vm.authorized = false
                commit('clearUser')
                router.replace('/');
            } else {
                // vm.authorized = false
                commit('clearUser')
                router.replace('/');
            }
            
        },
        init({dispatch}) {
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
                    console.log('in init get status')
                    dispatch('statusChangeCallback', response);
                }, true);
            };
        },
        getProfile({commit}) {
            FB.api('/me?fields=name,id,email', response => {
                commit('storeUser', {
                    user: response
                })
            })
            
        },
        login({dispatch}) {
            FB.login(response => {
                console.log('login ', response)
                dispatch('statusChangeCallback', response);
                
            }, {
                scope: 'email, public_profile', 
                return_scopes: true
            });
            
        },
        logout({dispatch}) {
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('myToken')
            localStorage.removeItem('myId')
            FB.logout(response => {
                dispatch('statusChangeCallback', response);
            })
            // if(this.state.accessToken) {
            //     FB.logout(response => {
            //         dispatch('statusChangeCallback', response);
            //     })
            // }
            
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuthenticated(state) {
            return state.authorized
        }
    }
});