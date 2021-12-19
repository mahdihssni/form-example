import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import vueUniqueId from "vue-unique-id";
import vuex from "vuex";
import store from './store'

Vue.use(vueUniqueId);
Vue.use(vuex);
Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    render: (h) => h(App),
}).$mount("#app");
