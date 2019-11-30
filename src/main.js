import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Simplemde } from "simplemde";
import ElementUI from "element-ui";

library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(ElementUI);

// router.beforeEach((to, from, next) => {
//
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
