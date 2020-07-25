import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

localStorage.setItem("loggedadmin", "false");
localStorage.setItem("loggeduser", "false");
localStorage.setItem("loggedteacher", "false");
localStorage.setItem("coursecode", "");
localStorage.setItem("question", "");
localStorage.setItem("id", "");

const config = {};

firebase.initializeApp(config);

export const db = firebase.firestore();
export var storageRef = firebase.storage().ref();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
