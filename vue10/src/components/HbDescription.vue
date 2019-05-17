<template>
    <div class="hbdescription">
      <!--第一导航栏部分-->
      <div class="zplson1">
        <router-link :to="{path:'/benefit'}"><</router-link>
        <span class="zpl1">红包说明</span>
        <p>{{num1}}</p>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "hbDescription",
      data(){
          return{
            num1:'',//获取到红包说明的数据
          }
      },
      mounted(){
        Vue.axios.get('https://elm.cangdu.org/v3/profile/explain')
          .then((res)=>{
            this.num1 = res.data.hongbaoContent;
            console.log(this.num1);
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
  .hbdescription{
    width: 100%;
    height: 100%;
    background: gainsboro;
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
</style>
