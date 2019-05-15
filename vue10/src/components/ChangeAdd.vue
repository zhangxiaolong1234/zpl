<template>
    <div class="ChangeAdd">
      <router-view/>
      <div id="head_top">
        <routerLink :to="{path:'/wode/info'}" class="more"> < </routerLink>
        <span class="title">编辑地址</span>
        <span class="emd" @click="changeBtn" v-text="text1">{{text1}}</span>
      </div>
          <div class="addp"  v-show="showa" v-for="pro in this.$store.state.addlist">
            <div class="left">
              <p><span>{{pro.address_detail}}</span></p>
              <p><span>{{pro.phone}}</span></p>
            </div>
            <div class="right">
              <span class="del" @click="changeShow">x</span>
            </div>
          </div>
          <div class="addname">
            <router-link :to="{path:'/wode/info/changeAdd/appendAdd/:adressLi'}">
              <div class="left" @click="addBtn"><span>新增地址</span></div>
              <div class="right">
                <span class="icon"> > </span>
              </div>
              <div class="clear"></div>
            </router-link>
          </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
    import AppendAdd from "./AppendAdd";
    export default {
        name: "ChangeAdd",
      components: {AppendAdd},
      data(){
          return{
            text1:'编辑',
            showa:true,
          }

        },
      computed:{
      },
      methods:{
        changeBtn(){
          if(this.text1=='编辑'){
            console.log('编辑');
            this.text1='完成';
            this.showa=true;
          }else if(this.text1=='完成') {
            this.text1 = '编辑';
            this.showa=false;
          }
         },
        changeShow(){
          console.log('del');
          this.showa= false;
        },
        addBtn(){
          console.log(this.$store.state.addlist);
          this.$router.push('/wode/info/changeAdd');
        }
      }
    }
</script>

<style scoped>
  .ChangeAdd{
    width: 100%;
    height: 100%;
    font-size: .6rem;
    color: #333;
    font-weight: 500;
    background-color: #f5f5f5;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
  }
  .more{
    width: 10%;
    color: #fff;
    font-size: 1rem;
    height: 1.95rem;
    line-height: 1.95rem;
    padding-left:.3rem;
  }
  .title{
    width: 77%;
    text-align: center;
    height: 1.95rem;
    line-height:1.95rem ;
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    display: inline-block;
  }
  .emd{
    color: #fff;
    width: 10%;
  }
  p{
    margin: 0;
  }
  .addp{
    width: 100%;
    height: 2.5rem;
    margin-top: .3rem;
    padding:.3rem 0 .3rem .4rem;
    background-color: #fff8c3;
    border-bottom: 1px solid #d9d9d9;
    border-top: 1px solid #d9d9d9;
  }
  .del{
    display: block;
    font-size: .8rem;
    color: #999;
    margin-top: .2rem;
  }
  .addname{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    margin-top: .3rem;
    padding-left: .4rem;
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  .left{
    display:block;
    width: 60%;
    float: left;
  }
  .clear{ clear:both}

  .right{
    text-align: right;
    width: 30%;
    margin-right:.5rem;
    display:block;
    float:right;
  }
  .icon{
    color: #ddd;
    font-size: 1rem;
  }
</style>
