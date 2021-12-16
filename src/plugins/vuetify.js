import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import fa from "vuetify/lib/locale/fa";

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { fa },
        current: "fa",
    },
    icons: {
        iconfont: "fa",
        icons: {
          edit: 'fas fa-edit-alt',
          trash: 'fas fa-trash-alt'
        }
    },
});
