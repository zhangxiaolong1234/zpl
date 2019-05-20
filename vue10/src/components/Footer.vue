<template>
      <section id="foot_guide">
        <section class="guide_item activity" @click = "gotoAddress({path: '/msite', query: {geohash}})">
          <Icon type="ios-home-outline" />
          <span>外卖</span>
        </section>
        <section class="guide_item"  @click = "gotoAddress({path: '/searchMaster'})">
          <Icon type="ios-search" />
          <span>搜索</span>
        </section>
        <section class="guide_item" @click = "gotoAddress({path:'/order'})">
          <Icon type="ios-cart-outline" />
          <span>订单</span>
        </section>
        <section class="guide_item" @click = "gotoAddress({path:'/wode'})">
          <Icon type="ios-contact-outline" />
          <span>我的</span>
        </section>
      </section>

</template>

<script>
  import {mapState} from 'vuex';
    export default {
        name: "Footer",
        computed: {
          ...mapState([
            'geohash'
          ]),
        },
        methods: {
          gotoAddress(path){
            this.$router.push(path);
          }
        }
    }
</script>

<style scoped>
   #foot_guide {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 1.95rem;
    display: flex;
    box-shadow: 0 .02667rem .05333rem rgba(0,0,0,.1);
  }
  .guide_item {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }
   .ivu-icon {
     width: .8rem;
     height: .8rem;
     margin-top: .3rem;
     color: black;
   }
   .activity .ivu-icon {
     color: blue;
   }
   .guide_item span {
     font-size: .45rem;
     color: #666;
   }
</style>
