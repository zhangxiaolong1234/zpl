<template>
    <div class="ChangeName">
      <div id="head_top">
        <a @click="backUp"> <span class="more"> < </span> </a>
        <span class="title">修改用户名</span>
        <p ><input type="text" id="input" placeholder="请输入用户名" v-model='username' @change='inputMsg'></p>
        <p class="txt" v-if="earn">用户名只能修改一次（5-24字符之间）</p>
        <p class="txt2" v-else>用户名长度在5到24位之间</p>
        <button class="btn btn-primary"  @click="inputMsg">确认修改</button>
      </div>
    </div>
</template>

<script>
  export default {
        name: "ChangeName",
      data(){
      return{
        earn:true,
        username:''
        }
      },
      methods:{
        backUp(){
          this.$router.go(-1);
        },
        inputThing(){
          if(this.inputMsg.length <5 || this.inputMsg.length>24){
            this.earn=false;
            return false;
          }else{
            this.earn=true;
            return true;
          }

        },
        inputMsg(){
          this.$store.commit('setUserName',this.username);
          this.$router.push("/wode/info");
        }

      }
    }
</script>

<style scoped>
  .ChangeName{
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
  #input{
    width: 15.2rem;
    height: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: .2rem .1rem;
    line-height: 1.2rem;
    font-size: .7rem;
    margin: .5rem 2% .2rem 2%;
  }
  p{
    margin: 0;
  }
  .txt,.txt2{
    width: 100%;
    font-size: .5rem;
    color: #666;
    padding: .4rem 0 .5rem;
    margin:0 2% 0 2%;
  }
  .txt2{
    color: red;
  }
button{
  font-size:.7rem;
  width: 15.2rem;
  height: 1.8rem;
  margin: .2rem 2% .5rem 2%;
  border-radius: 0;
}
</style>
