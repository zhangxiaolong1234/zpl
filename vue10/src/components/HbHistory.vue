<template>
    <div class="hbhistory">
      <!--第一导航栏部分-->
      <div class="zplson1">
        <router-link :to="{path:'/benefit'}"><</router-link>
        <span class="zpl1">历史红包</span>
      </div>
      <div class="son1">
        <ul v-for="(item,index) in guoqi" :key="index">
          <li style="background-color: white">
            <div class="zpl8">
              <span class="">¥</span>
              <span class="zpl11">{{item.amount}}</span>
              <span>.</span>
              <span>0</span>
              <p class="zpl0">满{{item.sum_condition}}元可用</p>
            </div>
            <div class="zpl9">
              <span class="zpl12">普通红包</span>
              <br>
              <span>{{item.end_date}}到期</span>
              <br>
              <span>限收货手机号为 {{item.phone}}</span>
            </div>
            <div class="zpl10">
              <div class="zpl13"><img src="../images/images/过期.png" alt=""></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "HbHistory",
      data(){
          return{
            guoqi:'',//用与存储过期的红包
          }
      },
      mounted(){
          Vue.axios.get('https://elm.cangdu.org/promotion/v2/users/1/expired_hongbaos?limit=20&offset=0')
            .then((res)=>{
              this.guoqi = res.data;
              console.log(this.guoqi);
            })
            .catch((err)=>{
              console.log('请求错误',err);
            })
      },
    }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .hbhistory{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    position: absolute;
    left:0;
    top: 0;
    z-index: 2;
  }
  .zplson1{
    width: 100%;
  }
  .zplson1 a{
    width: 10%;
    display: block;
    color: white;
    font-size: 1rem;
    float:left;
    background: #3190e8;
  }
  .zpl1{
    width: 90%;
    font-size: 1rem;
    color: white;
    float:left;
    background: #3190e8;
    text-align: center;
    line-height: 1.5rem;
  }
  .son1{
    width: 100%;
    margin-top: 2rem;
    /*background: red;*/
  }
  .zpl8{
    width: 23%;
    float: left;
    font-size: 0.7rem;
    border-right: 1px dashed gray;
  }
  li{
    width: 16rem;
    height: 3.2rem;
    text-decoration: none;
    background-color: white;
    margin-top: 1rem;
    background: url('../images/images/expired.png')repeat-x;
  }
  .zpl9{
    width: 60%;
    height: 3.4rem;
    float: left;
    font-size: 0.6rem;
    padding-left:0.5rem;
  }
  .zpl9 span{
    color: gainsboro;
  }
  .zpl10{
    width: 14%;
    margin-top: 0.2rem;
    float: left;
    font-size: 0.7rem;
  }
  .zpl11{
    font-size: 1.5rem;
  }
  .zpl12{
    font-size: 0.8rem;
    color: gainsboro;
  }
  .zpl8 span{
    color: gainsboro;
  }
  .zpl8 p{
    font-size: 0.6rem;
  }
  .zpl13 img{
    width:3rem;
  }
  .zpl0{
    color: gainsboro;
  }
  .zpl14{
    width:100%;
    font-size: 0.8rem;
    background: red;

  }
  .zpl14 p{
    text-align: left;
  }
</style>
