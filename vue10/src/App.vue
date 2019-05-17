<template>
    <div id="app">
      <router-view/>
    </div>
</template>

<script>
  import Vue from 'vue'
  import resize from './js/resize';
  export default {
    name: 'App',
    created() {
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('state') ) {
        this.$store.replaceState( Object.assign( {}, this.$store.state,
          JSON.parse(sessionStorage.getItem('state') ) ) )
      }
      // 页面刷新时将state数据存储到sessionStorage中
      window.addEventListener('beforeunload',()=>{
        sessionStorage.setItem('state',JSON.stringify(this.$store.state) )
      })
    }
  }
</script>

<style>
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
  @import "../node_modules/swiper/dist/css/swiper.css";
  * {
    margin: 0;
    padding: 0;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
  }
  html,body {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
