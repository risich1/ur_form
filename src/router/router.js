import Vue from "vue/types/vue";
import VueRouter from 'vue-router'
import Form from '@/components/Form.vue';
import Home from '@/components/Home.vue';


Vue.use(VueRouter);

 const routes = [
     {path: '/', component: Home},
     {path: '/form', component: Form}
 ];
 export default new VueRouter({
    routes,
    mode: 'history'
});