<template>
    <div class="balancecard">
      <div class="zplson1">
        <!-- < 按钮部分-->
        <div class="l1">
          <router-link :to="{path:'/integral'}"><</router-link>
          <span class="zpl1">余额问题</span>
        </div>
        <ul><li v-for="item in arr">
          {{item}}
        </li></ul>
      </div>

      <div class="zplson1">
        <!-- < 按钮部分-->
        <div class="l1">
          <router-link :to="{path:'/balance'}"><</router-link>
          <span class="zpl1">积分问题</span>
        </div>
        <ul><li v-for="it in arr1">
          {{it}}
        </li></ul>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "Balancecard",
      data(){
          return{
            val:'',//空字符串用于余额问题
            arr:[],//空数组添加空字符串的内容

            val1:'',//空字符串用于积分问题
            arr1:[],//空字符串用于积分问题

          }
      },
      mounted(){
          Vue.axios.get('https://elm.cangdu.org/v3/profile/explain',).then((res)=>{
           this.val =  res.data.balanceContent;
           console.log(res);
            this.val1 =  res.data.pointtextContent;
           let array = this.arr.push(this.val);
           let array1 = this.arr1.push(this.val1);
            console.log(this.arr);
          });
      },
    }
</script>

<style scoped>
  .balancecard{
    width: 100%;
    height: 100%;
    background: gainsboro;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
  .zplson1{
    width: 100%;
    height: 10%;
    background:#3190e8;
    font-size: 1rem;
    text-align: center;
    line-height: 2rem;
  }
  .l1 a{
    display: block;
    color: white;
    font-size: 1.3rem;
    float:left;
  }
  .l1 span{
    color: white;
  }
  li{
    padding: 1rem;
  }
</style>
