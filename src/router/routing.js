import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue'; 
import AllProfiles from '../components/AllProfiles.vue';
import Processed from '../components/Processed.vue';
import NoProcessed from '../components/NoProcessed.vue';

const routes = [
  { path: '/', name: "home", component: App },
  { path: '/all', name: "all", component: AllProfiles },
  { path: '/processed', name: "processed", component: Processed },
  { path: '/no_processed', name: "no_processed", component: NoProcessed },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/all');
  } else {
    next();
  }
});

export default router;