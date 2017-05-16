import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import '../utils/filters'

import Login from '@/pages/Login'
import Home from '@/pages/Home'
import ArticleList from '@/pages/ArticleList'
import EditArticle from '@/pages/EditArticle'

Vue.use(Router);
Vue.use(ElementUI);
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/articleList',
      name: 'ArticleList',
      component: ArticleList,
      children:[
        {path: 'editArticle', component: EditArticle}
      ]

    }
  ]
})
