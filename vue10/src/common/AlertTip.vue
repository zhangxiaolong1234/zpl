<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confirm_button" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
    export default {
        name: "AlertTip",
        data() {
          return {
            positionY: 0,
            timer: null,
          }
        },
        props: ['alertText'],
        methods: {
          closeTip(){
            this.$emit('closeTip')
          }
        }
    }
</script>

<style scoped>
  .alert_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
  }
  .tip_text_container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -6rem;
    margin-left: -6rem;
    width: 12rem;
    animation: tipMove .4s;
    background-color: #fff;
    padding-top: .6rem;
    border: 1px;
    border-radius: .25rem;
  }
  .tip_text_container,.tip_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .tip_icon {
    width: 3rem;
    height: 3rem;
    border: .15rem solid #f8cb86;
    border-radius: 50%;
  }
  .tip_icon span:first-of-type {
    width: .12rem;
    height: 1.5rem;
    background-color: #f8cb86;
  }
  .tip_icon span:nth-of-type(2) {
    width: .2rem;
    height: .2rem;
    border: 1px;
    border-radius: 50%;
    margin-top: .2rem;
    background-color: #f8cb86;
  }
  .tip_text {
    font-size: .7rem;
    color: #333;
    line-height: .9rem;
    text-align: center;
    margin-top: .8rem;
    padding: 0 .4rem;
  }
  .confirm_button {
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    margin-top: .8rem;
    background-color: #4cd964;
    width: 100%;
    text-align: center;
    line-height: 1.8rem;
    border: 1px;
    border-bottom-left-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }
</style>
