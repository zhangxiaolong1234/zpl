<template>
    <div class="p1">
      <!--<Benefit></Benefit>-->
      <router-view></router-view>
        <!--头部,展示子组件-->
      <!--第一导航栏部分-->
      <div id="head_top">
        <a @click="backUp"> <span class="more"> < </span> </a>
        <span class="title">我的</span>
      </div>
      <div>
      <!--头像部分-->
      <div class="p2" @click="sendUser">
          <div class="p3"><img src="../images/images/8.png" alt=""></div>
          <div class="p4">
            <span><a>{{this.flag}}</a></span>
            <p class="el-icon-mobile-phone phoneN" >暂无绑定手机号</p>
          </div>
        <div class="p5" ><a>></a></div>
      </div>

      <!-- banner区域 -->
      <div class="banner">
        <!-- 左边余额 -->
        <div class="ban_left">
          <!-- 非固定值会替换 -->
         <router-link :to="{path:'/balance'}">
           <b class="ban_b1">0.00</b>
           <span>元</span>
           <br>
           <span>我的余额</span>
         </router-link>
        </div>
        <!-- 中间优惠 -->
        <div class="ban_middle">
          <router-link :to="{path:'/benefit'}">
            <b class="ban_b2">{{$store.state.youhui.length}}</b>
            <span>个</span>
            <br>
            <span>我的优惠</span>
          </router-link>
        </div>
        <!-- 右边积分 -->
        <div class="ban_right">
         <router-link :to="{path:'/integral'}"> <b class="ban_b3">0</b>
           <span>分</span>
           <br>
           <span>我的积分</span>
         </router-link>
        </div>
      </div>
     <div class="p6">
       <router-link :to="{path:'/order'}">
       <div  class="el-icon-s-unfold">
         我的订单
         <span>></span>
       </div>
       </router-link>
       <br>
       <router-link :to="{path:'/'}">
       <div  class="el-icon-s-goods">
           积分商城
         <span>></span>
       </div>
       </router-link>
       <br>
       <router-link :to="{path:'/vipcard'}">
       <div  class="el-icon-potato-strips">
         饿了么会员卡
         <span>></span>
       </div>
       </router-link>
     </div>
      <!--服务中心-->
      <div class="p7">
        <router-link :to="{path:'/service'}">
        <div  class="el-icon-s-goods">
          服务中心
          <span>></span>
        </div>
        </router-link>
        <br>
        <router-link :to="{path:'/download'}">
        <div  class="el-icon-potato-strips">
          下载饿了吗App
          <span>></span>
        </div>
        </router-link>
      </div>
    </div>
      <Footer></Footer>
    </div>
</template>

<script>
    import Info from "./Info";
    import Vue from 'vue'
    //小图标
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import Benefit from "./Benefit";
    import Footer from "./Footer";

    Vue.use(ElementUI);
    export default {
        name: "Wode",
      data(){
          return{
            name:null,
            flag:null,
            phoneNumb:'暂无手机号'
          }
      },
      beforeRouteUpdate(to, from, next) {
        this.WhatName();
        next()
      },
      mounted(){
        this.WhatName();
    },
      methods:{
        backUp(){
          this.$router.go(-1);
        },
        WhatName(){
          // if(this.$store.state.username == null){
          //   this.$store.state.username= '注册/登录';
          // }
          Vue.axios.get('https://elm.cangdu.org/v1/user').then((res)=>{
            //console.log(res.data.username);
            this.name=res.data.username;
            if(this.name == undefined){
              this.flag = '注册/登录';
              //this.$store.state.username= '注册/登录';
            }else{
              this.flag = this.name;
            }
          }).catch((err)=>{
            console.log('请求错误',err);
          });

          Vue.axios.get('https://elm.cangdu.org/promotion/v2/users/1/hongbaos?limit=20&offset=0').then((res)=>{
            //console.log(res.data);
            this.hongbao = res.data;
            this.$store.state.youhui = this.hongbao;
          });
          //this.flag=this.$store.state.username;
        },
        sendUser(){
          if(this.flag!='注册/登录'){
            this.$store.state.username =this.flag;
            this.$router.push("/wode/info");
          }else{
            this.$router.push("/register");
          }

        }
      },
      components: {Footer, Benefit, Info},
    }
</script>

<style scoped>
.p1{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  position: absolute;
  letf:0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
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
  .p2{
    width: 100%;
    height: 3.5rem;
    background:#3190e8 ;
  }
  .p3{
    text-align: center;
    line-height: 2rem;
    float: left;
    margin-top: .5rem;
    margin-left: 0.5rem;
  }
 .p3 img{
   width: 2.5rem;
   height: 2.5rem;
   border-radius: 50%;
  }
  .p4{
    width: 60%;
    height: 60%;
    /*background: hotpink;*/
    font-size: 0.7rem;
    float: left;
    margin-top:.5rem;
    margin-left: 0.3rem;
  }
  .p4 span{
    display: block;
  }
  .p4 a{
    font-weight: 700;
    font-size: .8rem;
    color: #fff;
  }
  .p4 p.phoneN{
    font-size: .57333rem;
    color: #fff;
  }
  .p5{
    padding-right: .4rem;
  }
  .p5 a{
    font-size: 1rem;
    float: right;
    color: white;
    margin-top: .8rem;
  }
.bg-purple a{
  font-size: 1rem;
  color: #f90;
  text-align: center;
}
.bg-purple-light a{
  font-size: 1rem;
  color: lightcoral;
  text-align: center;
}
.bg-purple a{
  font-size: 1rem;
  color: green;
  text-align: center;
}

  .grid-content p{
    font-size: 0.5rem;
    color: black;
    text-align: center;
  }
  .p6{
    width: 100%;
    height: 15%;
    background: white;
    margin-top: 0.5rem;
  }
  .p6 div{
    width: 100%;
    border-bottom: 2px solid #f5f5f5;
    font-size: 0.7rem;
    padding: .5rem 0 .5rem .5rem;
  }
.p6 div a{
  color: #333;
}
  .p7{
    background: white;
    margin-top: 0.7rem;
  }
.p7 div{
  width: 100%;
  padding: .5rem 0 .5rem .5rem;
  border-bottom: 2px solid #f5f5f5;
  font-size: 0.7rem;
  color: #333;
}
  .p6 span{
      position: absolute;
      right: 0.25rem;
      color: grey;
    }
.p7 span{
  position: absolute;
  right: 0.25rem;
  color: grey;
}
.p7 div a{
  color: #333;
  text-decoration: none;
}
/* banner */
.banner{
  width: 100%;
  height: 4.5rem;
  overflow: hidden;
}
.ban_left,.ban_middle,.ban_right{
  width: 33.33%;
  height: 100%;
  float: left;
  text-align: center;
  padding-top: 1rem;
  background-color: #ffffff;
}
.ban_middle{
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
}
.ban_b1,.ban_b2,.ban_b3{
  font-weight: 700;
  font-size: 1rem;
}
.ban_b1{
  color: orangered;
}
.ban_b2{
  color: red;
}
.ban_b3{
  color: green;
}
.banner span{
  font-size: 0.8rem;
}
/* 分割 */
.part{
  width: 100%;
  height: 1rem;
}

</style>
