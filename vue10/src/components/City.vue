<template>
  <div class="city_container">
    <!--头部-->
    <Head :head-title="cityname" go-back="true">
      <router-link :to="{path:'/home'}" slot="changecity" class="change_city">切换城市</router-link>
    </Head>
    <!--搜索信息-->
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
      </div>
    </form>
    <!--搜索历史-->
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <!--清空所有-->
    <footer v-if="historytitle&&placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Head from '../Header/Head';
  import {setStore,getStore,removeStore} from "../LocalStorage/storeLocalStorage";
  export default {
    name: "City",
    components: {Head},
    data() {
      return {
        // 搜索地址
        inputVaule:'',
        //当前城市的id
        cityid:'',
        //当前城市的名称
        cityname:'',
        // 搜索城市列表
        placelist:[],
        // 历史搜索记录
        placeHistory:[],
        // 默认显示搜索历史头部，点击搜索后隐藏
        historytitle: true,
        //搜索无结果，显示提升信息
        placeNone:false
      }
    },
    mounted() {
      this.cityid = this.$route.params.cityid;
      this.$store.commit('saveCityid',this.cityid);
      Vue.axios.get('/v1/cities/'+this.cityid).then((res)=>{
        this.cityname = res.data.name;
      });
      this.initData();
    },
    methods: {
      //获取最初的历史纪录
      initData() {
        if(getStore('placeHistory')) {
          this.placelist = JSON.parse(getStore('placeHistory'));
        }else {
          this.placelist = []
        }
      },
      //提交信息获取所有的地址
      postpois() {
        if (this.inputVaule) {
          // console.log(this.cityid);
          Vue.axios.get('https://elm.cangdu.org/v1/pois?city_id='+parseInt(this.cityid)+'&keyword='+this.inputVaule+'&type=search').then((res)=>{
            // console.log(res.data);
            this.historytitle = false;
            this.placelist = res.data;
            this.placeNone = res.data.length ? false : true;
          })
        }
      },
      //点击下方信息跳转另一个组件
      nextpage(index,geohash) {
        //获取历史纪录
        let history = getStore('placeHistory');
        let choosePlace = this.placelist[index];
        if(history) {
          let checkrepeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(item=>{
            if(item.geohash == geohash){
              checkrepeat = true;
            }
          })
          if(!checkrepeat) {
            this.placeHistory.push(choosePlace);
          }
        }else {
          this.placeHistory.push(choosePlace);
        }
        setStore('placeHistory',this.placeHistory);
        this.$router.push({path:'/msite',query:{geohash}});
      },
      clearAll() {
        removeStore('placeHistory');
        this.initData();
      }
    }
  }
</script>

<style scoped>
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .city_container {
    width: 100%;
    height: 100%;
  }
  /*头部*/
  .change_city {
    position: absolute;
    right: 0.4rem;
    top:30%;
    font-size: .6rem;
    color: #fff;
  }
  /*form表单*/
  .city_form {
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-top: .4rem;
    margin-top: 1.95rem;
  }
  .city_form div {
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
  .city_input {
    border: 1px solid #e4e4e4;
    padding: 0 .3rem;
    font-size: .65rem;
    color: #333;
  }
  .input_style {
    border-radius: .1rem;
    margin-bottom: .4rem;
    width: 100%;
    height: 1.4rem;
    outline: none;
  }
  .city_submit {
    background-color: #3190e8;
    font-size: .65rem;
    color: #fff;
    border: none;
  }
  /*历史纪录*/
  .pois_search_history {
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-left: .5rem;
    font: .475rem/.8rem Microsoft YaHei;
  }
  .getpois_ul {
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    list-style: none;
  }
  .getpois_ul li {
    margin: 0 auto;
    padding-top: .65rem;
    border-bottom: 1px solid #e4e4e4;
  }
  .pois_name {
    margin: 0 auto .35rem;
    width: 90%;
    font-size: .65rem;
    color: #333;
  }
  .pois_address {
    width: 90%;
    margin: 0 auto .55rem;
    font-size: .45rem;
    color: #999;
  }
  .clear_all_history {
    font-size: .7rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
  }
  .search_none_place {
    margin: 0 auto;
    font: .65rem/1.75rem Microsoft YaHei;
    color: #333;
    background-color: #fff;
    text-indent: .5rem;
  }
</style>
