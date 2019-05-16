<template>
    <div class="HbExchange">
      <div id="head_top">
      <router-link :to="{path:'/benefit'}"><span class="more"> < </span></router-link>
      <span class="title">兑换红包</span>
    </div>
      <div class="content">
        <input type="text" v-model="value" class="input1">
        <div class="cont">
          <input type="text" v-model="value2" class="input2">
          <p class="yanzheng">
            <img  v-html="captchaCodeImg" :src="captchaCodeImg" height="50rem" width="55rem">
            <span>换一张</span>
          </p>
        </div>
        <button class="btn">兑换</button>


      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "HbExchange",
      data(){
          return{
            value:'请输入兑换码',
            value2:'验证码',
            captchaCodeImg:null//验证码
          }
      },
      mounted(){
        //初始化时请求验证码
        Vue.axios.post('https://elm.cangdu.org/v1/captchas').then((res)=>{
          this.captchaCodeImg = res.data.code;
          // console.log(res.data);
        })
      },
    }
</script>

<style scoped>
  .HbExchange{
    width: 100%;
    height: 100%;
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
  .content{
    width: 100%;
  }
  .input1{
    width: 90%;
    display: inline-block;
    margin: 1rem 5% 1rem 5%;
  }
  input{
    font-size:.8rem;
    color: #666;
    border: none;
    padding: .5rem 0 .5rem .3rem;
  }
.input2{
  margin: 0rem 2% 0rem 5%;
  display: block;
  float: left;
}
p{
  margin: 0;
}
  .yanzheng{
    width: 31%;
    height: 2.4rem;
    background-color: #fff;
    display:block;
    float: left;
  }
  .yanzheng span{
    font-size: .6rem;
  }
  .btn{
    color:#fff ;
    width: 90%;
    display: inline-block;
    margin: 1rem 5% 1rem 5%;
    background-color: #5555;
  }
</style>
