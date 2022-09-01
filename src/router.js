import Vue from 'vue';
import Router from 'vue-router';
import AccountRecovery from './views/AccountRecovery.vue';
import Videos from './views/Home/Videos/';
import ViewVideo from './views/Home/Videos/ViewVideo';
import Player from './views/Home/Player/';
import Users from './views/Home/Users/';
import Settings from './views/Home/Settings/';
import store from '@/store';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Videos,
      meta: {
        guest: true
      }
    },

    {
      path: '/account-recovery',
      name: 'account-recovery',
      component: AccountRecovery,
      meta: {
        guest: true
      }
    },
    {
      path: '/player',
      name: 'player',
      component: Player,
      meta: {
        guest: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        auth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        auth: true
      }
    },
    {
      path: '/:video_id/:title/:channelTitle/:thumbnail',
      name: 'view-video',
      component: ViewVideo,
      props: true,
      meta: {
        guest: true
      }
    }
  ]
});

router.beforeEach( (to, from, next) => {
  if(to.meta.auth && ! store.state.currentUser) {
    next({
      path: '/'
    })
  }
  // else if(to.meta.guest && store.state.currentUser) {
  //   next({
  //     path: '/home'
  //   })
  // }
  else {
    next();
  }
});

export default router;
