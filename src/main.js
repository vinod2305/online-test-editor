import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

localStorage.setItem('loggedadmin', 'false');
localStorage.setItem('loggeduser', 'false')
localStorage.setItem("loggedteacher", "false");
localStorage.setItem("coursecode", "");

const config = {
  apiKey: "AIzaSyCYLAGM8Z0kM8lt39E1OlEzzKGp-yL5UL4",
  authDomain: "online-test-editor.firebaseapp.com",
  databaseURL: "https://online-test-editor.firebaseio.com",
  projectId: "online-test-editor",
  storageBucket: "online-test-editor.appspot.com",
  messagingSenderId: "1044370627682",
  appId: "1:1044370627682:web:e9c7efeb8d46ac778f453b",
  measurementId: "G-7H1SHF7SWD"
}

firebase.initializeApp(config)

export const db = firebase.firestore()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
