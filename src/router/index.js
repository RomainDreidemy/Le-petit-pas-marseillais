import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Listing from '../views/Listing.vue'
import Article from '../views/Article.vue'
import Recent from '../views/Recent.vue'

import '../assets/css/reset.scss';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil - Le Petit Pas Marseillais',
    }
  },
  {
    path: '/listing',
    name: 'Listing',
    component: Listing,
    meta: {
      title: 'Liste des articles - Le Petit Pas Marseillais',
    }
  },
  {
    path: '/article/:slug',
    name: 'Article',
    component: Article,
    meta: {
      title: 'Article - Le Petit Pas Marseillais',
    },
  },
  {
    path: '/recent',
    name: 'Recent',
    component: Recent,
    meta: {
      title: 'Récent - Le Petit Pas Marseillais',
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
