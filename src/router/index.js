import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import View1 from '@/views/View1'
import View2 from '@/views/View2'
import VDoc from '@/views/VDoc'
import VUserCases from '@/views/VUserCases'
import VReport from '@/views/VReport'
import VTestLabs from '@/views/VTestLabs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
    	path: '/doc',
    	component: VDoc
    }, {
    	path: '/usercases',
    	component: VUserCases
    }, {
    	path: '/report',
    	component: VReport
    }, {
      path: '/testlabs',
      component: VTestLabs
    }
  ]
})
