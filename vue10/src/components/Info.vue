<template>
  <div class="UserInfor">
    <router-view/>
    <div id="head_top">
      <routerLink :to="{path:'/wode'}" class="more"> < </routerLink>
      <span class="title">账户信息</span>
    </div>
    <div class="photo">
      <div class="left left1">头像</div>
      <div class="right">
        <div class="file">
          <!--<lable for="file" name="file">-->
          <!--<img  src="../images/userphoto.jpg" alt="">-->
          <!--<input type="file" id="file">-->
          <!--</lable>-->
          <img  src="../images/images/8.png" alt="">
          <input type="file" id="file">
          <span class="icon"> > </span>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="username">
      <router-link :to="{path:'/wode/info/changeName'}">
        <div class="left left2"><span>用户名</span></div>
        <div class="right right2">
          <span class="name">{{userName}}</span>
          <span class="icon"> > </span>
        </div>
        <div class="clear"></div>
      </router-link>

    </div>
    <div class="add">
      <router-link :to="{path:'/wode/info/changeAdd'}">
        <div class="left left2"><span>收货地址</span></div>
        <div class="right right2">
          <span class="name">{{this.firstadd}}</span>
          <span class="icon"> > </span>
        </div>
        <div class="clear"></div>
      </router-link>
    </div>
    <p class="p1">绑定账号</p>
    <div class="username" @click="changePhone">
      <div class="left"><span>手机</span></div>
      <div class="right">
        <span class="name"></span>
        <span class="icon"> > </span>
      </div>
      <div class="clear"></div>
    </div>
    <p class="p1">安全设置</p>
    <router-link :to="{path:'/reset'}">
    <div class="username">
      <div class="left"><span>登录密码</span></div>
      <div class="right">
        <span class="name">修改</span>
        <span class="icon"> > </span>
      </div>
      <div class="clear"></div>
    </div>
    </router-link>
    <div class="btn btn-danger btn1" @click="goback">退出登录</div>
    <!--提示框-->
    <div class="fail" v-show="showAlert">
      <img src="../images/images/警告.png" alt="">
      <p>{{alertText}}</p>
      <button class="btn btn-success btn2" @click="sure">确定</button>
    </div>
    <!--退出登录-->
    <div class="back" v-show="Alert2">
      <img src="../images/images/警告.png" alt="">
      <p>是否退出登录</p>
      <button class="btn btn3 btn4" @click="sure">再等等</button>
      <button class="btn btn-danger btn3" @click="back">退出登录</button>
    </div>

  </div>
</template>

<script>
  import  Vue from  'vue';
  import ChangeName from "./ChangeName";
  import ChangeAdd from "./ChangeAdd";
  export default {
    name: "Info",
    components: {ChangeName,ChangeAdd},
    data(){
      return{
        userName:'',
        show:false,     //显示提示框
        isEnter:true,  //是否登录
        isLeave:false, //是否退出
        showAlert: false,
        alertText: null,
        Alert2: false,
        userID:'',
        firstadd:'',
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.changeAdd();
      next()
    },
    mounted(){
      this.changeAdd();
    },
    methods:{
      changeAdd(){
        Vue.axios.get('https://elm.cangdu.org/v1/user').then(res=>{
          //console.log(res.data.username);
          this.userName=res.data.username;
          this.userID=res.data.user_id;
          Vue.axios.get('https://elm.cangdu.org/v1/users/'+this.userID+'/addresses').then((res)=>{
            console.log(res.data);
            if(res.data!=[]){
              this.firstadd=res.data[0].address;
            }else{
              this.firstadd='';
            }

          });
        })
      },
      changePhone(){
        this.showAlert = true;
        this.alertText = '请在手机APP中设置';
      },
      sure(){
        this.showAlert = false;
        this.Alert2 = false;
      },
      goback(){
        this.Alert2 = true;
      },
      back(){
        this.Alert2 = false;
        this.$router.push("/wode");
        Vue.axios.get('https://elm.cangdu.org/v2/signout').then((res)=>{
          console.log(res.data);
        });
      }
    }

  }
</script>

<style scoped>
  .UserInfor{
    width: 100%;
    height: 100%;
    font-size: .6rem;
    color: #333;
    font-weight: 500;
    background-color: #f5f5f5;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
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
  .photo{
    width: 100%;
    height: 3.1rem;
    padding-left: .4rem;
    margin-top: .35rem;
    font-weight: 400;
    background-color: #fff;
    border-top: 1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .left{
    display:block;
    width: 60%;
    float: left;
  }
  .left1{
    height:3.1rem;
    line-height: 3.1rem;
  }
  .left2{
    width: 20%;
  }
  .clear{ clear:both}

  .right{
    text-align: right;
    width: 30%;
    margin-right:.5rem;
    display:block;
    float:right;
  }
  .right2{
    width: 70%;
    height: 2rem;
    overflow: hidden;
  }
  .file{
    width:100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  input{
    position: absolute;
    left: 0;
    top:1rem;
    opacity: 0;
  }
  img{
    width: 3rem;
    height: 3rem;
    padding-top: .1rem;
    border-radius: 50%;
  }
  .icon{
    color: #ddd;
    font-size: 1rem;
  }
  .name{
    font-size: .7rem;
    color: #999;
  }
  .username,.add{
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    margin-top: .1rem;
    padding-left: .4rem;
    background-color: #fff;
  }
  .p1{
    padding: .4rem;
    margin-bottom: 0;
    font-size: .5rem;
    color: #666;
  }
  .btn1{
    width: 96%;
    margin: 1.3rem 2% 0 2%;
    line-height: 1rem;
    border-radius: 5px;
    text-align: center;
    background: #d8584a;
    font-size: .6rem;
    color: #fff;
  }
  .fail,.back{
    text-align: center;
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
    border:1px solid #eee;
  }
  .fail img{
    margin-bottom: .5rem;
  }
  .btn2{
    font-size: .8rem;
    color: #fff;
    font-weight: 700;
    margin-top: .8rem;
    width: 100%;
    height: 1.8rem;
    line-height: .8rem;
    border-top-left-radius: 0;
    border-top-right-radius:0;
  }
  .btn3{
    margin-right: .4rem;
    display: inline-block;
    padding: .4rem 1rem;
    border-radius: 5px;
    font-size: .6rem;
    letter-spacing: 1px;
    margin-top: 26px;
  }
  .btn4{
    color: #fff;
    background: #c1c1c1;
  }
</style>
