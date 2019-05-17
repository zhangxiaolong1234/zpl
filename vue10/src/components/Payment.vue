<template>
  <div class="payment">
    <!--第一导航栏部分-->
    <div class="zplson1">
      <router-link :to="{path:'/vipcard'}"><</router-link>
      <span class="zpl1">在线支付</span>
    </div>
    <p class="zpl3">支付剩余时间</p>
    <div class="zpl2">
      <span>00 : {{minutes}} : {{seconds}}</span>
    </div>
    <p class="zpl4">选择支付方式</p>
    <!--支付宝-->
    <div class="zpl5">
      <div class="zpl6"><img src="../images/images/zhifubao.png" alt="">
        <span>支付宝</span>
      </div>
      <div class="zpl7" @click="aaa">
        <img src="../images/images/未选中.png" alt="" v-if="guang">
        <img src="../images/images/选中.png" alt="" v-else>
      </div>
    </div>
    <!--微信-->
    <div class="zpl5">
      <div class="zpl6">
        <img src="../images/images/weixin.png" alt="">
        <span>微信</span>
      </div>
      <div class="zpl7" @click="bbb">
        <img src="../images/images/未选中.png" alt="" v-if="liang">
        <img src="../images/images/选中.png" alt="" v-else>
      </div>
    </div>
    <div class="zpl8" @click="ddd">
      确认支付
    </div>
    <!--弹框-->
    <div class="zpl9" v-if=" showAlert">
      <img src="../images/images/警告.png" alt="">
      <div v-text="alertText"></div>
      <button style="width: 12rem;background: #4cd964;font-size: 0.9rem" @click="ccc">确认</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Payment",
    //状态
    data() {
      return {
        minutes: 15,//分
        seconds: 0,//秒
        guang:true,//显示未选中
        liang:false,//显示选中
        showAlert:true,//控制弹框显隐
        alertText:null,//弹框中的文字
      }
    },
    //方法
    methods: {
      num(n) {
        return n < 10 ? '0' + n : '' + n
      },
      timer() {
        var _this = this
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59
            _this.minutes -= 1
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0
            window.clearInterval(time)
          } else {
            _this.seconds -= 1
          }
        }, 1000)
      },
      //点支付宝选中支付宝
      aaa(){
        this.guang = false;
        this.liang = true;
        console.log("111");
      },
      //点微信选中微信
      bbb(){
        this.liang=false;
        this.guang = true;
        console.log("222");
      },
      //点击隐藏弹框
      ccc(){
        this.showAlert=false;//控制弹框显隐
      },
      //点击确认支付
      ddd(){
        this.showAlert=true;//控制弹框显示
        this.alertText='当前环境无法支付,请打开官方App进行付款';
      },
    },
    //挂载
    mounted() {
      this.timer();
      this.alertText='暂不开放支付功能';
    },
    watch: {
      second: {
        handler(newVal) {
          this.num(newVal)

        }
      },
      minute: {
        handler(newVal) {
          this.num(newVal)
        }
      }
    }
  }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .payment{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    overflow-y: hidden;
  }
  .zplson1{
    width: 100%;
    overflow: hidden;
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
  .zpl2{
    width: 100%;
    height: 4rem;
    background: white;
    text-align: center;
    font-size: 1.5rem;
  }
  .zpl3{
    width: 100%;
    background: white;
    text-align: center;
    font-size: 0.8rem;
    padding-top: 1rem;
  }
  .zpl4{
    width: 100%;
    font-size: 0.8rem;
    padding: 0.5rem;
  }
  .zpl5{
    width: 100%;
    padding:0.6rem 1rem;
    overflow: hidden;
    border-top: 0.01rem solid gainsboro;
    background: white;
  }
  .zpl6 img{
    width: 17%;
  }
  .zpl7 img{
    width: 100%;
  }
  .zpl6{
    width: 90%;
    float: left;
  }
  .zpl6 span{
    font-size: 0.8rem;
  }
  .zpl7{
    width: 10%;
    float: right;
  }
  .zpl8{
    width: 90%;
    background: #4cd964;
    text-align: center;
    line-height: 1.7rem;
    font-size: 0.8rem;
    margin: 0.5rem;
    color: white;
    border-radius: 5%;
  }
  .zpl9{
    width: 12rem;
    height: 8.5rem;
    background: white;
    position: absolute;
    left: 2rem;
    bottom: 12rem;
    text-align: center;
    font-size: 0.7rem;
  }
  .zpl9 button{
    color: white;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .zpl9 img{
    width: 35%;
    height: 4rem;
  }
</style>

