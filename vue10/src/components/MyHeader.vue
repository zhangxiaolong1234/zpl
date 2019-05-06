<template>
    <div class="header">
      <router-link :to="{path:'/home'}">首页</router-link>
      <router-link :to="{path:'/mine'}">个人中心</router-link>
      <router-link :to="{path:'/product'}">商品展示</router-link>
    </div>
</template>

<script>
    export default {
        name: "MyHeader"
    }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 15%;
    background-color: skyblue;
  }
  .header a {
    font-size: 25px;
  }
</style>
