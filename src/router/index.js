import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BlogPost from '../views/BlogPost.vue'
import About from '../views/About.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const routes = [
  {
    path: '/',
    name: 'About',
    component: About
  },
  {
    path: '/blog',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: { layoutFree: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router 