import Vue from 'vue'
import Router from 'vue-router'
import Testcase from '@/components/Testcase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Testcase',
      component: Testcase
    }
  ]
})
