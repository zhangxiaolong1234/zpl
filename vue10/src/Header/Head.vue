<template>
    <head class="nav fixed-top">
      <slot name="logo"></slot>
      <slot name="search"></slot>
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <Icon type="ios-arrow-back" />
      </section>
      <router-link :to="userInfo? '/wode':'/register'" v-if="signinUp" class="head_login">
        <img src="../img/user.png" alt="" v-if="userInfo" class="user">
        <span class="head_logo head_text" v-else>登录|注册</span>
      </router-link>
      <section class="title_head ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
      </section>
      <slot name="edit"></slot>
      <slot name="msite-title"></slot>
      <slot name="changecity"></slot>
      <slot name="changeLogin"></slot>
    </head>
</template>

<script>
    export default {
        name: "Head",
        data() {
          return {
            userInfo:null
          }
        },
        mounted() {
          this.userInfo = this.$store.state.userInfo;
        },
        props: ['signinUp', 'headTitle', 'goBack'],
    }
</script>

<style scoped>
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nav {
      width: 100%;
      height: 1.95rem;
      background-color: #3190e8;
      position: fixed;
      top:0;
      left: 0;
      z-index: 100;
    }
    .head_login {
      position: absolute;
      right: 1rem;
      top: 0.5rem;
      font-size: .65rem;
    }
    .user {
      width: .8rem;
      height: .8rem;
    }
    .head_logo {
      margin-left: 0.4rem;
      font-weight: 400;
      font-size: .7rem;
      color: #fff;
      width: 2.3rem;
      height: .7rem;
      margin-top: .5rem;
    }
    .ivu-icon-ios-arrow-back {
      width: 1rem;
      height: 1rem;
      line-height: 2.2rem;
      margin-left: .4rem;
      color: #fff;
    }
    .title_head {
      position: absolute;
      top: 20%;
      left: 44%;
      font-size: .8rem;
      color: #fff;
      font-weight: 700;
    }
    .title_text {
      color: #fff;
      font-weight: bolder;
    }
</style>
