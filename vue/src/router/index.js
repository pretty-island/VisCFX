import { createRouter, createWebHistory } from 'vue-router'
import Greetings from '../views/Greetings.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'greetings',
        component: Greetings
      },
      {
        path: '/cfx',
        name: 'cfx',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/cfx.vue'),
        redirect: '/cfx/eventMap',
        children: [
          {
            path: 'eventMap',
            component: () => import('../components/EventMap.vue')
          },
          {
            path: 'relationship',
            component: () => import('../components/Relationship.vue')
          }
        ]
      }
    ]
  })
  
  export default router
  