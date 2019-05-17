<template>
    <div class="home">
      <!--头部-->
      <Head signin-up="home">
        <span slot="logo" class="head_logo" @click="reload">ele.me</span>
      </Head>
      <!--定位城市-->
      <nav class="navbar-text">
        <div class="city_tip">
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <router-link :to="'/city/' + guessCityid" class="guess_city">
          <span>{{guessCity}}</span>
          <Icon type="ios-arrow-forward" />
        </router-link>

      </nav>
      <!--热门城市-->
      <section id="hot_city_container">
        <h4 class="city_title">热门城市</h4>
        <ul class="citylistul clear">
          <router-link  tag="li" v-for="item in hotCity" :to="'/city/' + item.id" :key="item.id">
            {{item.name}}
          </router-link>
        </ul>
      </section>
      <!--排序城市-->
      <section class="group_city_container">
        <ul class="letter_classify">
          <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="letter_classify_li">
            <h4 class="city_title">{{key}}
              <span v-if="index == 0">（按字母排序）</span>
            </h4>
            <ul class="groupcity_name_container citylistul clear">
              <router-link  tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                {{item.name}}
              </router-link>
            </ul>
          </li>
        </ul>
      </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Head from '../Header/Head';
    export default {
        name: "Home",
        components: {Head},
      data() {
          return {
            //定位城市的id
            guessCityid:'',
            //定位城市的名称
            guessCity:'',
            //热门城市的名称
            hotCity:'',
            //城市的列表
            groupcity:''
          }
        },
        mounted() {
          //获取定位城市的数据
          Vue.axios.get('/v1/cities?type=guess').then((res)=>{
            this.guessCityid = res.data.id;
            this.guessCity = res.data.name;
          });
          //获取热门城市的数据
          Vue.axios.get('/v1/cities?type=hot').then((res)=>{
            this.hotCity = res.data;
          });
          //获取分类城市的数据
          Vue.axios.get('/v1/cities?type=group').then((res)=>{
            this.groupcity = res.data;
          });
        },
        methods:{
          //点击图标刷新页面
          reload(){
            window.location.reload();
          }
        },
        computed: {
          //将获取的城市从A-Z分类
          sortgroupcity(){
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
              if (this.groupcity[String.fromCharCode(i)]) {
                sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
              }
            }
            return sortobj
          }
        }
    }
</script>

<style scoped>
    ul,h4{
      margin-bottom: 0;
    }
    .home {
      width: 100%;
      height: 100%;
    }
    .navbar-text {
      width: 100%;
      border-top: 1px solid #e4e4e4;
      background-color: #fff;
      padding-top: 0.35rem;
      padding-bottom: 0;
      margin-bottom: .4rem;
    }
    .city_tip {
      display: flex;
      justify-content: space-between;
      line-height: 1.45rem;
      padding: 0 .45rem;
    }
    .city_tip span:first-child{
      font-size: .55rem;
      color: #666;
    }
    .city_tip span:nth-child(2) {
      font-weight: 900;
      font-size: .475rem;
      color: #9f9f9f;
    }
    .guess_city {
      display: flex;
      align-items: center;
      height: 1.8rem;
      padding: 0 .45rem;
      border-top: 1px solid #e4e4e4;
      border-bottom: 2px solid #e4e4e4;
      font: .75rem/1.8rem Microsoft YaHei;
      position: relative;
    }
    .guess_city span {
      color: #007bff;
    }
    .guess_city .ivu-icon {
      position: absolute;
      top:0.5rem;
      right: 0.5rem;
      width: .6rem;
      height: 0.6rem;
      color: #999;
      font-weight: 700;
    }
    #hot_city_container {
      background-color: #fff;
      margin-bottom: .4rem;
    }
    .city_title {
      color: #666;
      text-indent: .45rem;
      border-top: 2px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      font: .55rem/1.45rem Helvetica Neue;
    }
    .citylistul li{
      list-style: none;
      float: left;
      text-align: center;
      color: #3190e8;
      border-bottom: .025rem solid #e4e4e4;
      border-right: .025rem solid #e4e4e4;
      width: 25%;
      height: 1.75rem;
      font: .6rem/1.75rem Microsoft YaHei;
    }
    .letter_classify_li {
      margin-bottom: .4rem;
      background-color: #fff;
      border-bottom: 1px solid #e4e4e4;
    }
    .clear {
      overflow: hidden;
    }
    .city_title span {
      font-size: .475rem;
      color: #999;
    }
    .groupcity_name_container li {
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
</style>
