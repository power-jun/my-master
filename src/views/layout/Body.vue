<template>
  <el-row class="info-content">
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div class="header-info">
          <el-row>
            <el-col :span="6">
              <p class="person-photo"><img src="/static/img/photo.jpeg" alt=""></p>
            </el-col>
            <el-col :span="18">
              <p class="name">XJ Chen</p>
              <p class="email">506402424@qq.com</p>
            </el-col>
          </el-row>
        </div>
        <div class="slide-nav">
          <el-menu router class="el-menu-vertical-demo" default-active="/movie">
            <el-submenu v-for="nav in navs" :index="nav.title">
              <template slot="title"><i class="el-icon-menu"></i>{{nav.title}}</template>
              <el-menu-item v-for="subnav in nav.subnavs" :index="subnav.router">
                {{subnav.title}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div class="grid-content bg-purple-light">
          <router-view></router-view>
        </div>
      </el-col>
  </el-row>
</template>

<script>

  export default {
    data() {
      return {
        navs: [{
            title: '生活',
            subnavs: [{
              title: '旅游',
              router: '/tourism'
            }]
          },
          {
            title: '工作',
            subnavs: [{
              title: '项目',
              router: '/project'
            }]
          },
          {
            title: '收藏',
            subnavs: [{
              title: '电影',
              router: '/movie'
            }]
          }
        ]
      }
    }
  }

</script>