import { createRouter, createWebHistory } from 'vue-router'
import rutas from './src/index'

let rutas_child = []

Array.prototype.push.apply(rutas_child, rutas)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/registro',
      name: 'Registro',
      component: () => import('../views/Registro.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      children: rutas_child
    }
  ]
})
/*ESTRUCTURA MIDDLEWORD EN VUE */
  router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem("token")
    console.log("token: ", token)
    if (token == null || token == "") {
      if (to.name == "Login") {
        next()
      } else {
        next({
          name: "Login"
        })
      }
    } else {
      if (to.name == "Login") {
        next({
          name: "Home"
        })
      } else {
        next()
      }
    }
  })

export default router