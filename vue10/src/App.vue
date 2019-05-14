<template>
    <div id="app">
      <!--<Wode></Wode>-->
      <!--<Reset></Reset>-->
      <!--<Balance></Balance>-->
      <!--<Balancecard></Balancecard>-->
      <!--<Benefit></Benefit>-->
      <!--<Info></Info>-->
      <!--<Integral></Integral>-->
      <!--<Register></Register>-->
      <!--<Seek></Seek>-->
      <router-view/>
    </div>
</template>

<script>
  import Vue from 'vue'
  import resize from './js/resize';
  import Wode from './components/Wode'
  import Reset from "./components/Reset";
  import Balance from "./components/Balance";
  import Balancecard from "./components/Balancecard";
  import Benefit from "./components/Benefit";
  import Info from "./components/Info";
  import Integral from "./components/Integral";
  import Register from "./components/Register";
  export default {
    name: 'App',
    components: {Register, Integral, Info, Benefit, Balancecard, Balance, Reset, Wode},
    mounted(){
      Vue.axios.get('https://elm.cangdu.org/promotion/v2/users/1/hongbaos?limit=20&offset=0').then((res)=>{
        console.log(res.data);
        // this.hongbao = res.data;
        this.$store.state.youhui= res.data;
      });
    },

  }
</script>

<style>
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
  * {
    margin: 0;
    padding: 0;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
  }
  html,body {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
