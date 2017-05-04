import VueRouter from 'vue-router'

import Body from 'layout/Body'
import Header from 'layout/Header'
import HomeNews from 'homeNews/homeNews'

// import Movie from 'movie/Movie'
// import Project from 'project/Project'
// import Tourism from 'tourism/Tourism'

const Movie = r => require.ensure([], () => r(require('movie/Movie')));
const Project = r => require.ensure([], () => r(require('project/Project')));
const Tourism = r => require.ensure([], () => r(require('tourism/Tourism')));

const routers = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'News',
      component: Body,
      children: [
        {
          name: 'News',
          path: '/home',
          component: HomeNews
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
    }
  ]
});

export default routers;
