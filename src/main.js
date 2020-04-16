import Vue from 'vue'
import App from './App.vue'
// import VueTheMask from 'vue-the-mask'
import VueRouter from 'vue-router'
import Form from '@/components/pages/Form.vue';
import Home from '@/components/pages/Home.vue';
import Terms from '@/components/pages/Terms.vue';
Vue.use(VueRouter);


const VueInputMask = require('vue-inputmask').default

Vue.use(VueInputMask)

const routes = [
  {path: '/', component: Home},
  {name: 'form', path: '/form', component: Form, props: (route) => ({ price: route.query.price, date: route.query.date, category: route.query.category }) },
  {path: '/terms', component: Terms},
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
