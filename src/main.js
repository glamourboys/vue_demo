import Vue from "vue";
import "./cube-ui";
import './api/register' // 注册的createAPI 引入到全局
import App from "./App.vue";

/* 全局引用样式 */
import 'common/stylus/index.styl'
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
