<template>
  <div class="AppendAdd">
    <div id="head_top">
      <routerLink :to="{path:'/wode/info/changeAdd/appendAdd/:adressLi'}" class="more"> < </routerLink>
      <span class="title">搜索地址</span>
    </div>
    <div class="content">
      <p ><input type="text" id="input1" placeholder="请填写小区/写字楼/学校" v-model="msg">
        <button class="btn btn-primary" @click="inputSearch">确认</button></p>
    </div>
    <div v-show="shownb">
      <div class="prompt">为了满足商家的送餐需求，建议您从列表中选取地址</div>
      <div class="detail">
        <p>找不到地址？</p>
        <p>请尝试输入小区/写字楼/学校名称</p>
        <p>详细地址如（门牌号）可稍后输入</p>
      </div>
    </div>

    <section class="addlist" v-show="showna">
      <ul>
        <li v-for="(item, index) in adressList" @click="listClick(index)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import  Vue from  'vue';
    export default {
      name: "SearchAdd",
      data() {
        return {
          showna:false,
          shownb:true,
          msg:'',
          adressList:'',
          inputAdress: '',
          adressLi:''
        }
      },
     methods: {
       inputSearch(){
         this.showna=true,
           this.shownb=false,
           Vue.axios.get('/v1/pois?city_id=4&keyword='+this.msg+'&type=search').then((res) => {
             this.adressList=res.data;
           });
       },
       listClick(index){
         this.adressLi=this.adressList[index].address;
         this.$router.push({name:'apd', params:{pro:JSON.stringify(this.adressLi)}});
       },
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
  }
  .content{
    background-color: #fff;
    padding-bottom: .7rem;
  }
  #input1{
    width: 12rem;
    height: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: .2rem .1rem;
    line-height: 1.2rem;
    font-size: .7rem;
    margin: .5rem 2% 0rem 2%;
    background-color: #f5f5f5;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
    font-size:.6rem;
  }
  button{
    font-size: .5rem;
    width: 3rem;
    height: 1.5rem;
    margin-bottom: .2rem;
  }
  .prompt{
    background: #fff6e4;
    font-size: .62rem;
    color: #ff883f;
    text-align: center;
    padding: .2rem 0;
  }
  .detail{
    margin-top:7rem;
    text-align: center;
  }
  .detail p{
    width: 100%;
    text-align: center;
    font-size: .6rem;
    color: #969696;
    margin-bottom: .4rem;
  }
 ul li{
    color: #ccc;
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: .4rem;
  }
  ul li p{
    font-size:.6rem;
  }
</style>
