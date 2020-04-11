import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddSmoothie from '../components/AddSmoothie';
import EditSmoothie from '../components/EditSmoothie.vue';

Vue.use(VueRouter)

// 'name' is the name of the route
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-smoothie',
    name: 'AddSmoothie',
    component: AddSmoothie
  },
  {
    path: '/edit-smoothie/:smoothie_slug',
    name: 'EditSmoothie',
    component: EditSmoothie
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;