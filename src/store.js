import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import firebase from 'firebase'
import db from '@/firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accessToken: null,
        user: null,
        authorized: false,
        selectedList: []
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
            state.selectedList = null
        },
        storeList(state, userData) {
            state.selectedList.push(userData)
        }
    },
    actions: {
        updateProfile({commit}, userData) {
            console.log('update profile' ,this.state.user.data.uid)
            commit('storeList', userData)
            db.collection('users').where('user_id', '==',this.state.user.data.uid).get().then(snapshot => {
                // console.log('snap ', snapshot)
                // console.log(userData)
                snapshot.forEach((doc) => {
                    db.collection('users').doc(doc.id).update({
                      rssList: this.state.selectedList
                    }).then(()=> {
                        // commit('storeList', userData)
                    })
                  });
            })
        },
        getProfile({commit}, uid) {
            //console.log('get profile user', state.user.data)
            db.collection('users').where('user_id', '==', uid).get().then(snapshot => {
                // console.log('in get profile ', doc)
                snapshot.forEach((doc) => {
                    console.log(doc.data().rssList)
                    commit('storeList', doc.data().rssList)
                  });
            })
        },
        loginWithCreditials({commit, dispatch, state}){
            let mytoken = localStorage.getItem('myToken')
            // console.log('in auto login mytoken = ', mytoken)

            if(mytoken == null) return

            var credential = firebase.auth.FacebookAuthProvider.credential(mytoken);

            firebase.auth().signInAndRetrieveDataWithCredential(credential).then(result =>{
                // console.log('auto signin ', result)
                commit('authUser', {
                    accessToken: result.credential.accessToken,
                    authorized: true,
                })

                commit('storeUser', {
                    data: result.user.providerData[0]
                })
                console.log('udi ', result.user.providerData[0].uid)
                dispatch('getProfile', result.user.providerData[0].uid)
            });
            //console.log('in auto login ', this.state.getters.user)
            // console.log('in auto login ', this.state.user)
           
        },
        loginWithFB({commit}) {
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.setCustomParameters({
                'display': 'popup'
              });

            firebase.auth().signInWithPopup(provider).then(result => {
                console.log(result)
                if(result.additionalUserInfo.isNewUser === true) {
                    db.collection('users').add({
                        user_name: result.user.providerData[0].displayName,
                        user_id: result.user.providerData[0].uid,
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
                console.log(result.user.providerData[0])
                localStorage.setItem('myToken', result.credential.accessToken);
            }).catch(error => {
                console.log(error)
            });
            
        },
        logoutFB({commit}) {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                commit('clearUser')
              }).catch(error => {
                // An error happened.
                console.log(error)
              });
              localStorage.removeItem('myToken')
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
        }
    }
});