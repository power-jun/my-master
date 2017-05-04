import VueRouter from 'vue-router'

import Body from 'layout/Body'
import Header from 'layout/Header'

// import Movie from 'movie/Movie'
// import Project from 'project/Project'
// import Tourism from 'tourism/Tourism'

// 按需加载
const Movie = r => require.ensure([], () => r(require('movie/Movie')));
const Project = r => require.ensure([], () => r(require('project/Project')));
const Tourism = r => require.ensure([], () => r(require('tourism/Tourism')));

const routers = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: '主页',
      components: {
        header: Header,
        body: Body
      },
      children: [
        {
          name: '电影',
          path: '/movie',
          component: Movie
        },
        {
          name: '项目',
          path: '/project',
          component: Project
        },
        {
          name: '旅游',
          path: '/tourism',
          component: Tourism
        }
      ]
    }
  ]
});

export default routers;
