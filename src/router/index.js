import Vue from 'vue';
import Router from 'vue-router';

// 导入组件
import Login from '@/components/login/login.vue';
import Home from '@/components/home/home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'home', path: '/home', component: Home },
  ],
});
