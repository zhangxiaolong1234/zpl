<template>
    <div class="AppendAdd">
      <router-view/>
      <div id="head_top">
        <routerLink :to="{path:'/wode/info/changeAdd'}" class="more"> < </routerLink>
        <span class="title">新增地址</span>
      </div>
      <div class="content">
        <p ><input type="text" id="input" placeholder="请填写你的姓名" v-model="nameadd"></p>
        <p>
          <routerLink :to="{path:'/wode/info/changeAdd/appendAdd/:adressLi/searchAdd'}">
            <input type="text" id="input1" placeholder="小区/写字楼/学校" v-model="this.$route.params.pro">
          </routerLink>
        </p>
        <p ><input type="text" id="input2" placeholder="请填写详细送餐地址" v-model="addetail"></p>
        <p ><input type="text" id="input3" placeholder="请填写能够联系到你的手机号" v-model="phoneNum"></p>
        <p ><input type="text" id="input4" placeholder="备用联系电话(选填)" v-model="phoneNum2"></p>

      </div>
      <button class="btn btn-success" @click="inputMsg1">添加地址</button>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
    import SearchAdd from "./SearchAdd";
    export default {
        name: "AppendAdd",
        components: {SearchAdd},
      data(){
          return{
            nameadd:'',
            adressLi:'',
            addetail:'',
            phoneNum:'',
            phoneNum2:'',
            AddArr:{},
            AddArrs:[],
          }
      },
      computed:mapState({
        AddArrs1:state => state.AddArrs //输入框的内容
      }),
      methods:{
        inputMsg1(){
          console.log('123');
          this.AddArr={
            name: this.nameadd,
            address:this.$route.params.pro,
            address_detail:this.addetail,
            phone:this.phoneNum,
            phone_bk: this.phoneNum2,
          };

          if(this.AddArr.name!=''&&this.AddArr.phone!=''){
            this.AddArrs.push(this.AddArr);
            //this.$router.push("/wode/info/changeAdd")
            this.$store.state.addlist =this.AddArrs;
            this.$store.state.phoneNum=this.phoneNum;
            this.$store.state.firstadd=this.$store.state.addlist[0].address_detail
            console.log(this.AddArrs);
          }
        }
      },

    }
</script>

<style scoped>
  .AppendAdd{
    width: 100%;
    height: 100%;
    font-size: .6rem;
    color: #333;
    font-weight: 500;
    background-color: #f5f5f5;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
    margin-bottom: .3rem;
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
  p{
    margin: 0;
    margin: .5rem 2% 0rem 2%;
  }
  .content{
    background-color: #fff;
    padding-bottom: .7rem;
    margin-bottom: .5rem;
  }
  #input,#input1,#input2,#input3,#input4{
    width: 15.2rem;
    height: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: .2rem .1rem;
    font-size: .6rem;
    background-color: #f5f5f5;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
      font-size:.6rem;
    }
  input:focus{
    border: 0;
  }
  button{
    font-size:.7rem;
    width: 15.2rem;
    height: 1.8rem;
    margin: .5rem 2% .5rem 2%;
    border-radius: 0;
  }
</style>
