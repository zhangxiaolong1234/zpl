<template>
    <div class="loading_container">
      <div class="load_img" :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}">
      </div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        data() {
          return {
            positionY:null,
            timer:null
          }
        },
        mounted() {
          this.timer = setInterval(()=>{
            this.positionY++;
          },600)
        },
        beforeDestroy() {
          clearInterval(this.timer);
        }
    }
</script>

<style scoped>
  .loading_container {
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 2.5rem;
    height: 2.5rem;
  }
  @keyframes load {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .load_img {
    width: 100%;
    height: 100%;
    background: url("../img/loading.png") no-repeat 0 0;
    background-size: 2.5rem auto;
    transform: translateY(0);
    animation: load .6s infinite ease-in-out;
    position: relative;
  }
</style>
