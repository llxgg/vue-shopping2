import Vue from 'vue';
import Router from 'vue-router';

import { Message } from 'element-ui';


// 导入组件
import Login from '@/components/login/login.vue';
import Home from '@/components/home/home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path:'/',redirect:"/home"},
    { name: 'login', path: '/login', component: Login },
    { name: 'home', path: '/home', component: Home },
  ],
});

router.beforeEach((to,from,next) => {
  // 如果去登录页的，直接放行
  if(to.path == '/login')return next();

// 获取token
var token = sessionStorage.getItem('token');

if(token)return next();

next('/login');

// 提示用户先登录：
Message({
  type:'warning',
  message:'请先登录',
  center:true
})

})


export default router;
