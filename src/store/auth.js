// In your Vue Router configuration
import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true } // Add this meta field to specify routes that require authentication
    },
    // Add other routes
  ]
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If the route requires authentication, check if the user is authenticated
    if (!store.state.auth.isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      // If the user is authenticated, proceed to the route
      next();
    }
  } else {
    // If the route does not require authentication, proceed as usual
    next();
  }
});

export default router;
