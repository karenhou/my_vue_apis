import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from '@/firebase/init'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rssAPIKeys: '1eeiobvm5s07o4thvz1xttbunqs3ufo1dddout7c',
        accessToken: null,
        user: null,
        authorized: false,
        selectedList: [],
        rssContent:[],
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
            state.selectedList = []
            state.rssContent = []
        },
        storeList(state, userData) {
            state.selectedList.push(userData)
        },
        storeContent(state, userData) {
            state.rssContent.push(userData.data)
        },
    },
    actions: {
        updateProfile({commit, state, dispatch}, userData) {
            commit('storeList', userData)
            db.collection('users').where('user_id', '==', state.user.data.uid).get().then(snapshot => {
                snapshot.forEach((doc) => {
                    db.collection('users').doc(doc.id).update({
                        rssList: state.selectedList
                    }).then(()=> {
                        dispatch('updateContent', userData)
                    })
                });
            })
        },
        updateContent({commit}, userData) {
                let api =
        "https://api.rss2json.com/v1/api.json?api_key=" + this.state.rssAPIKeys + "&rss_url=" + userData.link;
            axios
                .get(api)
                .then(response => {
                    commit('storeContent', {data: response.data})
                })
                .catch(err => {
                    console.log('updateContent err ' + err.response);
                });
        },
        //after loading user profile, call to generate all content
        getContent({commit}) {
            this.state.selectedList.forEach(x => {
                let api =
        "https://api.rss2json.com/v1/api.json?api_key=" + this.state.rssAPIKeys + "&rss_url=" + x.link;
            axios
                .get(api)
                .then(response => {
                    commit('storeContent', {data: response.data})
                })
                .catch(err => {
                    console.log('getContent err ' + err.response);
                });
            })
        },
        getProfile({commit, dispatch}, uid) {
            let temp = []
            db.collection('users').where('user_id', '==', uid).get().then(snapshot => {
                snapshot.forEach((doc) => {
                    temp = [...doc.data().rssList]
                });
                temp.forEach(x => {
                    commit('storeList', x)
                })
                dispatch('getContent')
            }).catch(err => {
                console.log('error in getprofile ', err)
            })
        },
        loginWithCreditials({commit, dispatch}){
            let mytoken = localStorage.getItem('myToken')
            let uid = localStorage.getItem('uid')

            if(mytoken == null) return

            var credential = firebase.auth.FacebookAuthProvider.credential(mytoken);

            firebase.auth().signInAndRetrieveDataWithCredential(credential).then(result =>{

                commit('authUser', {
                    accessToken: result.credential.accessToken,
                    authorized: true,
                })

                commit('storeUser', {
                    data: result.user.providerData[0]
                })

                dispatch('getProfile', uid)
            });
        },
        loginWithFB({commit, dispatch}) {
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.setCustomParameters({
                'display': 'popup'
              });

            firebase.auth().signInWithPopup(provider).then(result => {
                if(result.additionalUserInfo.isNewUser === true) {
                    db.collection('users').add({
                        user_name: result.user.providerData[0].displayName,
                        user_id: result.user.providerData[0].uid,
                        rssList: [],
                        email: result.user.providerData[0].email,
                    })
                }
          
                commit('authUser', {
                    accessToken: result.credential.accessToken,
                    authorized: true,
                })
                
                commit('storeUser', {
                    data: result.user.providerData[0]
                })
                localStorage.setItem('myToken', result.credential.accessToken);
                localStorage.setItem('uid', result.user.providerData[0].uid);
                dispatch('getProfile', result.user.providerData[0].uid)
            }).catch(error => {
                console.log('err in login with FB ', error)
            });
            
        },
        logoutFB({commit}) {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                commit('clearUser')
                localStorage.removeItem('myToken')
                localStorage.removeItem('uid')
              }).catch(error => {
                // An error happened.
                console.log('logoutFB ', error)
              });
              
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        isAuthenticated(state) {
            return state.authorized
        },
        token(state) {
            return state.accessToken
        },
        list(state) {
            return state.selectedList
        },
        content(state) {
            return state.rssContent
        },
    }
});