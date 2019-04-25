import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Vuetify from 'vuetify'
import Offer from '../components/Offer'
import Product from '../components/Product'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          component: Offer
        },
        {
          path: 'jewellery/:productId',
          component: Product
        }
      ]
    }
  ]
})
