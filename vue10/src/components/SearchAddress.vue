<template>
  <div class="searchAddress_container">
    <Head head-title="搜索" go-back="true"></Head>
    <form class="form_search">
      <input type="search" name="search" placeholder="请输入小区/写字楼/学校等" v-model="searchValue">
      <button @click.prevent="searchPlace()">搜索</button>
    </form>
    <ul class="address_list" v-if="searchData">
      <li v-for="(item,index) in searchData" :key="index" @click="choosedAddress(item)">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
      </li>
    </ul>
    <div v-else class="empty_tips">
      <p>找不到地址？</p>
      <p>尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号等）可稍后输入哦</p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Head from "../Header/Head";
  export default {
    name: "SearchAddress",
    components: {Head},
    data() {
      return {
        //输入框的内容
        searchValue:'',
        //搜索的结果
        searchData:'',
        cityid:null
      }
    },
    mounted() {
      this.cityid = this.$store.state.cityid;
    },
    methods: {
      searchPlace() {
        if(this.searchValue) {
          Vue.axios.get('https://elm.cangdu.org/v1/pois?cityid='+parseInt(this.cityid)+'&keyword='+this.searchValue+'&type=search').then((res)=>{
            // console.log(res.data);
            this.searchData = res.data;
          })
        }
      },
      choosedAddress(item) {
        this.$store.commit("chooseAddress",item);
        // console.log(item);
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  p,ul,h4 {
    margin-bottom: 0;
  }
  .searchAddress_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 204;
    overflow-y: auto;
    padding-top: 1.95rem;
  }
  /*搜索框*/
  .form_search {
    padding: .7rem;
    display: flex;
  }
  .form_search input {
    font-size: .65rem;
    color: #999;
    flex: 4;
    background-color: #f1f1f1;
    margin-right: .6rem;
    height: 1.5rem;
    border-radius: .15rem;
    padding: 0 .4rem;
    outline: none;
    border: none;
  }
  .form_search button {
    flex: 1;
    font-size: .65rem;
    color: #fff;
    background-color: #3190e8;
    border-radius: .15rem;
    outline: none;
    border: none;
  }
  .empty_tips {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
  }
  .empty_tips p {
    font-size: .5rem;
    color: #aaa;
    line-height: .7rem;
    text-align: center;
  }
  /*搜索地址的列表*/
  .address_list {
    padding: .7rem;
  }
  .address_list li {
    padding: .7rem 0;
    border-bottom: .025rem solid #f5f5f5;
    line-height: 1rem;
  }
  .address_list li h4 {
    font-size: .75rem;
    color: #555;
  }
  .address_list li p {
    font-size: .65rem;
    color: #999;
  }
</style>
