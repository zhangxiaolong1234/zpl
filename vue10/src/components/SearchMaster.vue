<template>
    <div class="SearchMaster">
      <div id="head_top">
        <router-link :to="{path:''}"><span class="more"> < </span></router-link>
        <span class="title">搜索</span>
      </div>
      <div class="search">
        <input type="text"  @input="write" v-model="value" @click="clickinput">
        <span class="close" v-show="shower" @click="closevalue">x</span>
        <button @click="SearchInfor">提交</button>
      </div>
      <!--搜索历史列表-->
      <h3 v-show="h3">搜索历史</h3>
      <div class="history" v-show="shower2">
          <div class="list" v-for="(li,index) in historyList">
              <p class="li" >
                <span class="li1">{{li}}</span>
                <span class="li2"  @click="closeliHistory(li,index)">x</span>
              </p>
        </div>
        <p class="lihis" @click="closeHistory" v-show="clearHistory">清空搜索历史</p>
      </div>

      <!--无搜索结果-->
      <div class="noneResult" v-show="noneResult">很抱歉，无搜索结果</div>
      <!--搜索商家列表-->
      <!--<h3 v-show="h3">搜索历史</h3>-->
      <div class="list2" v-for="(li,index) in this.MasterInfor" v-show="shop">
        <div class="pic"><img :src="'//elm.cangdu.org/img/'+li.image_path" alt=""></div>
        <div class="shopinfor">
        <p>{{li.name}}</p>
          <p>月售：{{li.recent_order_num}}单</p>
          <p>{{li.float_minimum_order_amount}}元起送/{{li.distance}}公里</p>
        </div>
      </div>

    </div>
</template>

<script>
  import  Vue from  'vue';
    export default {
        name: "SearchMaster",
      data(){
          return{
            h3:false,
            clearHistory:false,
            shower:false,
            shower2:false,
            noneResult:false,
            shop:false,
            MasterInfor:'',
            value:'请输入商家或美食名称',
            historyList:[],
            image_path:'',
            name:'',
            index:''
          }
      },
      methods:{
        clickinput(){
          this.value='';
        },
        write(){
          if(this.value!=''&&this.value!='请输入商家或美食名称'){
            this.shower=true;
          }
        },
        closevalue(){
          this.historyList.splice(0,0,this.value);
          //console.log(this.historyList);
          this.value='请输入商家或美食名称';
          this.shower=false;
          this.noneResult=false;
          this.h3=true;
          this.shop=false;
          this.shower2=true;
          this.clearHistory=true;
        },
        closeliHistory(li,index){
          this.historyList.splice(index,1);
          if(this.historyList.length==0){
            this.clearHistory=false,
              this.h3=false;
          }
        },
        closeHistory(){
          this.shower2=false;
          this.clearHistory=false,
            this.h3=false;
        },
        SearchInfor(){
          this.shower2=false;
          this.noneResult=false;
          this.h3=false;
          this.clearHistory=false,
          Vue.axios.get('https://elm.cangdu.org/v4/restaurants?geohash=31.22967,121.4762&keyword='+this.value).then((res) => {
            console.log(res.data);
            this.MasterInfor=res.data;
            if(this.MasterInfor.message=='关键词参数错误'||'搜索餐馆数据失败'){
              this.noneResult=true;
            }else{
              this.shop=true;
            }
          });
        }
      }
    }
</script>

<style scoped>
  .hideDiv {
    display: none;
  }
  .SearchMaster{
    width: 100%;
    background-color: #f5f5f5;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
  }
  .more{
    width: 10%;
    color: #fff;
    height: 1.95rem;
    margin-left:.1rem;
    display:block;
    position: absolute;
  }
  .title{
    width: 100%;
    text-align: center;
    height: 1.95rem;
    line-height:1.95rem ;
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    display: inline-block;
  }
  .search{
    background-color: #fff;
    padding: .5rem;
    margin-bottom: .3rem;
  }
  input{
    border: .025rem solid #e4e4e4;
    font-size: .65rem;
    color: #333;
    width: 11rem;
    height: 1.5rem;
    border-radius: .125rem;
    background-color: #f2f2f2;
    font-weight: 700;
    padding: 0 .25rem;
    position: relative;
  }
  .close{
    font-size: 1rem;
    font-weight: lighter;
    position: absolute;
    left: 10.5rem;
    top:2.7rem;
  }

  button{
    width: 3rem;
    border: .025rem solid #3190e8;
    margin-left: .2rem;
    font-size: .65rem;
    color: #fff;
    height: 1.5rem;
    border-radius: .125rem;
    background-color: #3190e8;
    font-weight: 700;
    padding: 0 .25rem;
  }
  h3{
    font-size: .6rem;
    line-height: 1.5rem;
    text-indent: .5rem;
    font-weight: 700;
    color: #333;
  }
  .li{
    font-size: .6rem;
    color: #333;
    font-weight: 400;
    background-color: #fff;
    padding: .5rem 0 .5rem .5rem;
    margin:0;
    border-bottom:2px solid #f5f5f5 ;
  }
  .lihis{
    font-size:.8rem ;
    text-align: center;
    color: cornflowerblue;
    background-color: #fff;
    padding: .5rem 0 .5rem .5rem;
    margin:0;
    border-bottom:2px solid #f5f5f5 ;
  }
  .li1{
    width: 90%;
    display: inline-block;
    overflow: hidden;
  }
  .li2{
    font-size: 1rem;
    font-weight: lighter;
    display: inline-block;
  }
  .noneResult{
    font-size: .6rem;
    font-weight: lighter;
    text-align: center;
    color:#666 ;
    background-color: #fff;
    padding: .5rem 0 .5rem .5rem;
  }
  .list2{
    width: 100%;
    background-color:#fff;
  }
  .pic{
    width: 3rem;
    height: 3rem;
    float: left;
  }
  img{
    width: 3rem;
    height: 3rem;
  }
  .shopinfor{
    width: 13rem;
    height: 4rem;
    overflow: hidden;
    font-size: .6rem;
    margin-bottom: .2rem;
  }
  .shopinfor p{
    margin: 0;
    padding: .2rem 0 .1rem .2rem;

  }
  .shopinfor p:last-child{
    margin-bottom: 1rem;
    margin-right: 3rem;
    border-bottom: 2px #e3e3e3 solid;
  }
</style>
