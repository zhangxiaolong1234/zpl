<template>
    <div class="benefit">
      <!--第一导航栏部分-->
      <div class="zplson1">
        <router-link :to="{path:'register'}"><</router-link>
        <span class="zpl1">我的优惠</span>
      </div>
      <div class="zpl2">
        <div class="zpl3"><router-link :to="{}">红包</router-link></div>
        <div class="zpl4"><router-link :to="{}">商家代金券</router-link></div>
      </div>

      <!--接下来布局 红包 和 代金券两套格式-->
      <!--1.红包-->
      <div class="zpl5">
        <div class="zpl6">
          <p>有<span>0</span>个红包即将到期</p>
          <router-link :to="{}" class="el-icon-question">红包说明</router-link>
          </div>
        <div class="zpl7">
         <ul v-for="(item, index) in hongbao" :key="index">
           <li>
             <div class="zpl8">
               <span class="">$</span>
               <span class="zpl11">{{item.amount}}</span>
               <span>.</span>
               <span>0</span>
               <p>满20元可用</p>
             </div>
             <div class="zpl9">
               <span class="zpl12">分享红包</span>
               <br>
               <span>2017-05-23到期</span>
               <br>
               <span>限收货手机号为 13681711254</span>
             </div>
             <div class="zpl10">
               <div class="zpl13">剩3日</div>
             </div>
           </li>
         </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "Benefit",
      data(){
          return{
            hongbao:'',
          }
      },
      mounted(){
          Vue.axios.get('https://elm.cangdu.org/promotion/v2/users/1/hongbaos?limit=20&offset=0').then((res)=>{
            console.log(res.data);
            this.hongbao = res.data
          })
      },

    }
</script>

<style scoped>
  .benefit{
    width: 100%;
    height: 100%;
    background: gainsboro;
  }
  .zplson1{
    width: 100%;
    height: 8%;
    background:#3190e8;
    font-size: 0.7rem;
    text-align: center;
    line-height: 2.5rem;
  }
  .zplson1 a{
    width: 10%;
    height: 100%;
    display: block;
    color: white;
    font-size: 1.3rem;
    float:left;
    /*background: blue;*/
  }
  .zpl1{
    width: 50%;
    height: 100%;
    font-size: 1rem;
    color: white;
    float:left;
    margin-left: 2rem;
  }
  .zpl2{
      width: 100%;
      height: 8%;
      overflow: hidden;

    }
  .zpl3 {
     width: 50%;
     height: 100%;
     /*background: pink;*/
    float: left;
    text-align: center;
    line-height: 2.5rem;
   }
  .zpl4 {
    width: 50%;
    height: 100%;
    background: green;
    float: right;
    text-align: center;
    line-height: 2.5rem;
  }
  .zpl5{
    width: 100%;
    height: 84%;
    /*background: red;*/
  }
  .zpl6{
    width: 100%;
    height: 10%;
    background: yellow;
    overflow: hidden;
  }
  .zpl6 p{
    width: 70%;
    height: 100%;
    background: orangered;
    float: left;
    font-size: 0.6rem;
    line-height: 1.5rem;
    padding-left:0.3rem ;
  }
  .zpl6 a{
    width: 30%;
    height: 100%;
    background: gray;
    float: right;
    font-size: 0.6rem;
    line-height: 1.5rem;
    padding-left:1rem ;
  }
  .zpl7{
    width: 100%;
    height: 60%;
    background: yellow;
    padding: 0.5rem;
    overflow: hidden;
  }
  .zpl8{
    width: 26%;
    /*height: 100%;*/
    background: pink;
    float: left;
    font-size: 0.7rem;
    border-right: 1px dashed gray;
    /*padding:0.5rem*/

  }
  li{
    text-decoration: none;
  }
  .zpl9{
    width: 60%;
    /*height: 100%;*/
    background: purple;
    float: left;
    font-size: 0.6rem;
    padding-left:0.5rem
  }
  .zpl10{
    width: 14%;
    /*height: 100%;*/
    background: powderblue;
    float: left;
    font-size: 0.7rem;
  }
  .zpl11{
    font-size: 1rem;

  }
  .zpl12{
    font-size: 0.9rem;
  }
  .zpl8 span{
    color: red;
  }
  .zpl8 p{
    font-size: 0.6rem;
  }
  .zpl13{
    color:red;
  }
</style>
