<template>
  <div class="news-content">
   <div class="editor-news">
     <router-link tag="a" :to="'/publish'">Publish News<i class="el-icon-edit"></i></router-link>
   </div>
    <el-row v-for="(item, index) in news" :key="item.id">
      <el-row class="article-header">
        <el-col :span="20">
          <a href="" class="article-title">{{item.title}}</a>
        </el-col>
        <el-col :span="4" v-show="item.date" :class="['article-date',!!item.date ? 'text-r': '']">
          <i class="el-icon-date"></i> {{item.date}}
        </el-col>
      </el-row>
      <el-row v-show="item.imgSrc" class="news-img-box">
        <el-col :span="24"><img src="../../assets/images/react-redux.jpg" alt=""></el-col>
      </el-row>
      <el-row class="news-cont-box">
        <el-col :span="24">{{item.content}}</el-col>
      </el-row>
      <p class="text-r">
        <router-link tag="a" :to="'/home/page'+ index" class="look-more">查看全文<i class="el-icon-d-arrow-right"></i></router-link>
      </p>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        news: [{
            title: 'React 和 Redux 快速开发实战',
            content: '今天聊一聊 react + redux 环境快速搭建，以及实战一个 TodoList，可能是有史以来最简洁的方法哦，是不是很期待，当时橙子也是很吃惊这样的搭建速度。本文适合有 react 和 redux 基础的同学看，当然你也可以看完本文去学基础。下面进入正题',
            imgSrc: '../../assets/images/react-redux.jpg',
            date: '2017-03-02'
          },
          {
            title: '微信小程序实战',
            content: '微信小程序经过几个月的内侧，在今年的 1 月 9 日正式上线，在微信通讯录页面就可以搜索你想找的小程序，然后在发现页最底部就会有你曾经浏览过的小程序的入口。一番体验后比橙子想象的效果好的多，所以自己起手也写了一个。下面具体介绍细节。想写小程序的大家都知道只有企业账户可以发布，但是开发却不需要企业账号，但是我们需要实名认证我们的小程序账号',
            imgSrc: '../../assets/images/weixin.jpeg',
            date: '2017-04-05'
          },
          {
            title: '微信小程序实战',
            content: '微信小程序经过几个月的内侧，在今年的 1 月 9 日正式上线，在微信通讯录页面就可以搜索你想找的小程序，然后在发现页最底部就会有你曾经浏览过的小程序的入口。一番体验后比橙子想象的效果好的多，所以自己起手也写了一个。下面具体介绍细节。想写小程序的大家都知道只有企业账户可以发布，但是开发却不需要企业账号，但是我们需要实名认证我们的小程序账号',
            imgSrc: '../../assets/images/weixin.jpeg',
            date: '2017-04-05'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/mixin';
  .news-content>.el-row {
    margin-bottom: 20px;
    padding-bottom: 20px;
    margin-right: 25px;
    background: $fc;
    box-shadow: 1px 3px 10px #aaa;
  }

  .article-header {
    border-left: 5px solid #666;
    padding: 15px 25px;
    .article-title {
      color: #696969;
      margin-left: 0px;
      font-weight: 400;
      line-height: 1.3;
      margin-bottom: 20px;
      font-size: 26px;
      transition: color .3 ease-in;
      &:hover {
        color: #b0a0aa;
      }
    }
    .article-date,
    .el-icon-date {
      color: #aaa;
    }
  }

  .news-img-box {
    img {
      display: block;
      @include maxWidth(100%);
      height: auto;
      margin: 0 auto;
    }
  }

  .news-cont-box {
    color: #333;
    font-size: 14px;
    line-height: 32px;
    padding: 15px 25px;
  }

  .look-more {
    @include publicButton;
    i {
      color: $fc;
      margin-left: 5px;
    }
  }

  .editor-news {
    padding: 10px 0;
    margin-right: 25px;
    text-align: center;
    margin-bottom: 20px;
    background: #f60;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    a {
      color: #fff;
    }
    i {
      color: #20a0ff;
      margin-left: 10px;
    }
  }
</style>
