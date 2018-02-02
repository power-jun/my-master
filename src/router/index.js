import VueRouter from 'vue-router'

import Login from 'login/Login'
import Body from 'layout/Body'
import HomeNews from 'homeNews/homeNews'

// import Movie from 'movie/Movie'
// import Project from 'project/Project'
// import Tourism from 'tourism/Tourism'

const Registed = r => require.ensure([], () => r(require('registed/Registed')));
const Movie = r => require.ensure([], () => r(require('movie/Movie')));
const Project = r => require.ensure([], () => r(require('project/Project')));
const Tourism = r => require.ensure([], () => r(require('tourism/Tourism')));
const PublishNews = r => require.ensure([], () => r(require('homeNews/publishNews')));

const routers = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    children: [{
      path: '/registed',
      name: 'registed',
      component: Registed
    }]
  }, {
    path: '/',
    name: 'News',
    component: Body,
    children: [{
        path: '',
        redirect: '/home'
      },
      {
        name: 'News',
        path: '/home',
        component: HomeNews
      },
      {
        name: 'publish',
        path: '/publish',
        component: PublishNews,
        beforeEnter: (to, from, next) => {
          console.log(to);
          next();
        }
      },
      {
        name: 'Movie',
        path: '/movie/:id',
        component: Movie,
        // redirect: '/home' //重定向
      },
      {
        name: 'Project',
        path: '/project',
        component: Project
      },
      {
        name: 'Tourism',
        path: '/tourism',
        component: Tourism
      }
    ]
  }]
});

export default routers;