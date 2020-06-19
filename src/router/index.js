import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Adminpage from '../views/Adminpage.vue'
import Teacherlogin from '../views/Teacherlogin.vue'
import Question from '../views/Question.vue'
import Details from '../views/Details.vue'
import Editor from '../views/Editor.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/adminpage',
    name: 'Adminpage',
    component: Adminpage,
    meta: {
      requireadminAuth: true
    }
  },
  {
    path: '/teacherlogin',
    name: 'Teacherlogin',
    component: Teacherlogin
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
    meta: {
      requireteacherAuth: true
    }
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var currentAdmin = localStorage.getItem("loggedadmin");
  var requireadminAuth = to.matched.some(record => record.meta.requireadminAuth);
  if (requireadminAuth && currentAdmin == 'false') next('admin')
  else if (!requireadminAuth && currentAdmin == 'true') next();
  else next()

  var currentTeacher = localStorage.getItem("loggedteacher");
  var requireteacherAuth = to.matched.some(record => record.meta.requireteacherAuth);
  if (requireteacherAuth && currentTeacher == 'false') next('teacherlogin')
  else if (!requireteacherAuth && currentTeacher == 'true') next();
  else next()

  var currentUser = localStorage.getItem("loggeduser");
  var requireAuth = to.matched.some(record => record.meta.requireAuth);
  if (requireAuth && currentUser == 'false') next('/')
  else if (!requireAuth && currentUser == 'true') next();
  else next()

})


export default router
