<template>
    <div class="HbRecommend">
      <div id="head_top">
        <router-link :to="{path:'/benefit'}"><span class="more"> < </span></router-link>
        <span class="title">推荐有奖</span>
        <img src="../images/images/activity.png" alt="">
      </div>
        <div class="content">
          <div class="app">
              <ul class="pic">
                  <li><img src="../images/images/qq.png" alt=""></li>
                  <li><img src="../images/images/weixin.png" alt=""></li>
                  <li><img src="../images/images/fenxiang.png" alt=""></li>
                </ul>
                  <ul class="pic">
                    <li>邀请QQ好友</li>
                    <li>邀请微信好友</li>
                    <li>面对面邀请</li>
                  </ul>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HbRecommend"
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
  #head_top img{
    width: 100%;
  }
  .content{
    width: 100%;
  }
  .app{
    padding: 1rem 0;
    background-color: #fff;
  }
  ul li{
    float: left;
  }
</style>
