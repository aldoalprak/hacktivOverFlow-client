import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import AskQuestion from './views/AskQuestion.vue'
import Question from './views/Question.vue'
// import EditQuestion from './views/EditQuestion.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/questions/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/askquestion',
      name: 'askquestion',
      component: AskQuestion
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ],
  mode:"history"
})
