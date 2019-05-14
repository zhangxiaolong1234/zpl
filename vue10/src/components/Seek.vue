<template>
    <div class="seek">
      <!--头部搜索-->
        <div class="z1">
          <router-link :to="{path:'/##'}"><</router-link>
          <span>搜索</span>
          </div>
      <!--中间输入框部分-->
      <div class="z2">
        <input
          style="width: 11rem"
        placeholder="请输入商家或美食名称"
        v-model="searchValue"
        clearable>
      </input>
        <button class="z11" type="primary" @click="getInput()">提交</button></div>
      <!--显示商家部分-->
      <div class="z2" v-if="shor">
        商家
        <div class="z3">
           <div class="z4">
             <img src="###">
           </div>
            <div class="z5">
              <ul>
              <li>
               1
              </li>
            </ul>
            </div>
        </div>
      </div>

    <!--无搜索结果-->
      <div class="z6" v-if="noSeek">
        很抱歉!无搜索结果
      </div>

      <!--搜索历史-->
      <div class="z7">
        <div class="z8" v-if="aaa">搜索历史</div>
        <div class="z9">
          <ul>
            <li v-for="(item,index) in list">{{item}}
              <span @click="delect(index)">x</span>
            </li>
            <div class="z10" v-if="aaa" @click="empty">清空搜索历史</div>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
        name: "Seek",
      data(){
          return{
            emptyResult: false, // 搜索结果为空时显示
            searchValue: '', // 搜索内容
            list: [], // 搜索返回的结果
            showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
            emptyResult: false, // 搜索结果为空时显示
            shor:false,//搜索到的商家
            noSeek:true,//显示无搜索结果
            aaa:false,//刷新页面时搜索历史和清空历史为false
            geohash:'34.74725,113.624931'
          }
      },
      created(){
        this.aaa = false;
      },
      methods:{
        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
        getInput() {
          //请求与输入关键字有关的商家
          Vue.axios.get('https://elm.cangdu.org/v4/restaurants',{
            'extras[]': 'restaurant_activity',
            geohash:'31.22967,121.4762',
            keyword:'123',
            type: 'search'
          }).then((res)=>{
            console.log(res.data);
          })
          this.aaa = true;
           let Value = this.searchValue;
          this.list.push(Value);
          console.log(this.list);
          this.searchValue = '';
        },
        delect(i){
          console.log(i);
          this.list.splice(i,1);
        },
        empty(i){
          this.list.splice(i);
          this.aaa = false;
        }
      }
    }
</script>

<style scoped>
.seek{
  width: 100%;
  height: 100%;
  background: gainsboro;
}
  .z1{
    width: 100%;
    height: 2rem;
    background: #3190e8;
  }
  .z1 a{
    color: white;
    font-size: 1rem;
    position: absolute;
    left: 5%;
    top: 1%;
  }
  .z1 span{
    color: white;
    font-size: 1rem;
     position: absolute;
    left: 45%;
    top: 1%;
  }

.z2{
  width: 100%;
  height: 2rem;
  /*background:yellow;*/
  font-size: 0.6rem;
  line-height: 1rem;
  text-indent: 0.5rem;
  /*font-weight: bold;*/
  margin-top: 1rem;
  color: #666;
}

.z3{
  width: 100%;
  height: 80%;
  background:white ;

}
  .z4 {
    width: 20%;
    height: 100%;
    /*background: yellow;*/
    float: left;
  }
  .z5{
    width: 60%;
    height: 100%;
    float: left;
  }
li{
   list-style: none;
  background: white;
  border-bottom: 1px solid gainsboro;
  }
span{
  position: absolute;
  right: 0.2rem;
}
  .z6{
    width: 100%;
    height: 2rem;
    background: white;
    font-size: 0.6rem;
    line-height: 2rem;
    text-indent: 0.5rem;
    font-weight: bold;
    color: #666;
    text-align: center;
    margin-top: 0.1rem;
  }
  .z7{
    width: 100%;
    height: 25%;
    /*background: red;*/
    font-size: 0.6rem;
    line-height: 2rem;
    text-indent: 0.5rem;
    font-weight: bold;
    color: #666;
    /*margin-top: 0.1rem;*/
  }
  .z8{
    width: 100%;
    height: 30%;
    /*background: yellow;*/
  }
  .z9{
    width: 100%;
    height: 100%;
    font-size: 0.6rem;
    /*line-height: 2rem;*/
    text-indent: 0.5rem;
    font-weight: bold;
    /*color: #666;*/
    margin-top: 0.5rem;

  }
  .z10{
    width: 100%;
    height: 80%;
    background: white;
    text-align: center;
    color: deepskyblue;
  }
  .z11{
    background: #3190e8;
  }
</style>
