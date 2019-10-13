import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

// 公共样式
import './common/stylus/index.styl';

var app = Vue.extend(App);
var router = new VueRouter({
  linkActiveClass: 'active'
});
// router1.0 配置路由
router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
});
// 挂载点
router.start(app, '#app');
router.go('/goods'); // 初始页面路由：goods
