import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller'
import './common/stylus/index.styl';

//全局注册
Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

// let router = new VueRouter();

// router.map({
// 	'/goods': {
// 		component: goods
// 	}
// });

var router = new VueRouter({
  linkActiveClass: 'active',	//导航栏被激活的时候添加active属性 
  routes: [
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller },
  ]
})

//router.start(app, '#app');
new Vue({
  el: '#app',
  router: router,
  //render: h => h('router-view')
  render: (createElement) => createElement(App)
})

//router.push('/goods');

// new Vue({
//   el: '#app',
//   render: (createElement) => createElement(App)
// })



