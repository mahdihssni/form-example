import Vue from "vue";
import Vuex, { Store } from "vuex";
import users from './modules/users'

Vue.use(Vuex)

export default new Store({
    modules: {
        users
    }
})
