<template>
  <div class="usecart">
    <!--第一导航栏部分-->
    <div class="zplson1">
      <router-link :to="{path:'/vipcard'}"><</router-link>
      <span class="zpl1">会员中心</span>
    </div>
    <div class="zpl2">
      <p>成功兑换后将关联到当前账号: <span>喊你打开为空的</span></p>
    </div>
    <div class="zpl3">
      <input type="text" placeholder="请输入10位卡号"  v-model="kaHao"  @input="reg" maxlength="10">
      <input type="text" placeholder="请输入6位密码" v-model="miMa" @input="reg" maxlength="6">
    </div>
    <div class="zpl4">
      <!--兑换-->
      <input type="text" placeholder="兑换" :disabled="disabled" @click="aaa" :class="{green:isgreen}">
    </div>
    <div class="zpl5">
      <h6>-温馨提示-</h6>
      <p>新兑换的会员服务，权益以「会员说明」为准。</p>
      <p>月卡：30次减免配送费。</p>
      <p>季卡：90次减免配送费。</p>
      <p>年卡：360次减免配送费。</p>
      <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
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
    name: "Usecart",
    data(){
      return{
        kaHao:null,//卡号
        miMa:null,//密码
        isgreen:false,//控制按钮的颜色
        showAlert:false,//控制弹框显隐
        alertText:null,//弹框中的文字
        disabled:true,//刚开始禁止点击兑换按钮
      }
    },
    methods:{
      reg(){
        var a = /^\d{10}$/;
        var b = /^\d{6}$/;
        if(a.test(this.kaHao) && b.test(this.miMa)){
          this.disabled = false;
          this.isgreen = true;
        }else{
          this.isgreen = false;
          this.disabled = true;
        }
      },
      aaa(){
        this.disabled = false;
        this.showAlert=true;
        this.alertText='无效的卡号';
      },
      ccc(){
        this.showAlert=false;
      },
    },
  }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .usecart{
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
    font-size: 0.6rem;
    padding: 0.5rem;
  }
  .zpl2 span{
    font-size: 0.8rem;
  }
  input{
    outline: none;
    width: 100%;
    font-size: 0.7rem;
    line-height: 1.5rem;
  }
  .zpl4{
    width: 90%;
    font-size: 0.8rem;
    line-height: 2rem;
    text-align: center;
    margin:1rem 0.5rem;
    background: #ccc;
    color: white;
    border-radius: 5%;
  }
  .zpl4 input{
    text-align: center;
    /*background: green;*/
  }
  .zpl5 p{
    font-size: 0.6rem;
    color: #ccc;
    padding-left: 2.5rem;
  }
  h6{
    text-align: center;
    margin-bottom: 1rem;
    color: #ccc;
  }
  .green{
    background: #4cd964;
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

