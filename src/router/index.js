import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Whs from '@/components/Whs'
import ThreeScenes1 from '@/components/ThreeScenes1'
import ThreeScenes2 from '@/components/ThreeScenes2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/whs',
      name: 'Whs',
      component: Whs
    }, {
      path: '/threescenes1',
      name: 'ThreeScenes1',
      component: ThreeScenes1
    }, {
      path: '/threescenes2',
      name: 'ThreeScenes2',
      component: ThreeScenes2
    }
  ]
})
