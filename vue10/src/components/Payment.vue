<template>
    <div>
      <Head head-title="在线支付" go-back="true"></Head>
      <!--倒计时容器-->
      <div class="show_time_amount">
        <section>
          <header class="time_last">支付剩余时间</header>
          <p class="time">{{remaining}}</p>
        </section>
      </div>
      <div class="pay_way">选择支付方式</div>
      <!--支付方式-->
      <section class="pay_way_list">
        <section class="pay_item">
          <div class="pay_icon_container">
            <div class="zhifubao"></div>
            <span>支付宝</span>
          </div>
          <div class="choose_img" @click="payWay = 1" :class="{choosed_way: payWay == 1}"></div>
        </section>
        <section class="pay_item">
          <div class="pay_icon_container">
            <div class="vx"></div>
            <span>微信</span>
          </div>
          <div class="choose_img" @click="payWay = 2" :class="{choosed_way: payWay == 2}"></div>
        </section>
      </section>
      <!--确认支付-->
      <p class="confirm_pay" @click="confirmPay">确认支付</p>
      <AlertTip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></AlertTip>
    </div>
</template>

<script>
    import Head from "../Header/Head";
    import AlertTip from "../common/AlertTip";
    export default {
        name: "Payment",
       components: {AlertTip, Head},
        data() {
          return {
            //倒计时
            countNum:900,
            //支付方式
            payWay:1,
            showAlert:false,
            alertText:''
          }
        },
        mounted(){
          this.remainingTime();
        },
        beforeDestroy(){
          clearInterval(this.timer);
        },
        computed :{
          //时间倒计时
          remaining() {
            let minute = parseInt(this.countNum/60);
            if (minute < 10) {
              minute = '0' + minute;
            }
            let second = parseInt(this.countNum%60);
            if (second < 10) {
              second = '0' + second;
            }
            return '00 : ' + minute + ' : ' + second;
          }
        },
        methods: {
          //倒计时
          remainingTime(){
            clearInterval(this.timer);
            this.timer = setInterval(() => {
              this.countNum --;
              if (this.countNum == 0) {
                clearInterval(this.timer);
                this.showAlert = true;
                this.alertText = '支付超时';
              }
            }, 1000);
          },
          //确认支付
          confirmPay() {
            this.showAlert = true;
            this.alertText = '当前环境无法支付，请打开官方APP进行付款';
            this.$router.push('/order')
          }
        }
    }
</script>

<style scoped>
  .show_time_amount {
    margin-top: 1.95rem;
    background-color: #fff;
    padding: .7rem;
    text-align: center;
  }
  .time_last {
    font-size: .6rem;
    color: #666;
    margin-top: 1rem;
  }
  .time {
    font-size: 1.5rem;
    color: #333;
    margin: .3rem 0 1rem;
  }
  /*支付方式*/
  .pay_way {
    background-color: #f1f1f1;
    padding: 0 .7rem;
    font-size: .7rem;
    color: #666;
    line-height: 1.8rem;
  }
  .pay_way_list {
    background-color: #fff;
  }
  .pay_item {
    padding: .4rem .7rem;
    line-height: 2.6rem;
    border-bottom: .025rem solid #f5f5f5;
  }
  .pay_way_list .pay_item,.pay_icon_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pay_icon_container span {
    font-size: .7rem;
    color: #666;
  }
  .zhifubao {
    width: 2rem;
    height: 2rem;
    background: url("../img/zhifubao.png") no-repeat;
    background-size: cover;
    margin-right: .2rem;
  }
  .choose_img {
    width: 1rem;
    height: 1rem;
    background: url("../img/duihao.png") no-repeat;
    background-size: cover;
  }
  .choosed_way {
    width: 1rem;
    height: 1rem;
    background: url("../img/duihao2.png") no-repeat;
    background-size: cover;
  }
  .vx {
    width: 2rem;
    height: 2rem;
    background: url("../img/vx.png") no-repeat;
    background-size: cover;
    margin-right: .2rem;
  }
  /*确认支付*/
  .confirm_pay {
    background-color: #4cd964;
    font-size: .7rem;
    color: #fff;
    text-align: center;
    line-height: 1.8rem;
    border-radius: .2rem;
    margin: .5rem .7rem 0;
    font-weight: 700;
  }
</style>
