<template>
    <div class="addAddress_container">
      <Head  head-title="选择地址" go-back="true"></Head>
      <router-link to="/confirmOrder/chooseAddress/addAddress" class="addAddress_footer">
        <img src="../img/add.png" alt="添加" class="addAddress_img">
        <span>新增收货地址</span>
      </router-link>
      <section class="list_container">
        <ul class="deliver_address">
          <li v-for="(item,index) in addressList" :key="index"  @click.prevent.stop="choosedAddress(item, index)">
            <div class="choosed_address" :class="{default_address: defaultIndex == index}"></div>
            <div>
              <header>
                <span>{{item.name}}</span>
                <span>{{item.sex == 1 ? '先生' : '女士'}}</span>
                <span>{{item.phone}}</span>
              </header>
              <div class="address_detail ellipsis">
                <span v-if="item.tag" :style="{backgroundColor: iconColor(item.tag)}">{{item.tag}}</span>
                <p>{{item.address_detail}}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Head from "../Header/Head";
    export default {
        name: "ChooseAddress",
        components: {Head},
        data() {
          return {
            //地址列表
            addressList:[],
            userInfo:null
          }
        },
        computed: {
          defaultIndex: function (){
            if (this.addressIndex) {
              return this.addressIndex;
            }else{
              return 0;
            }
          }
        },
        mounted() {
          this.userInfo = this.$store.state.userInfo;
        },
        methods: {
          async initData() {
            this.addressList = [];
            if(this.userInfo&&this.userInfo.user_id) {
              Vue.axios.get('https://elm.cangdu.org/v1/users/'+this.userInfo.user_id+'/addresses').then((res)=>{
                // console.log(res.data);
                res.data.forEach((item)=>{
                  this.addressList.push(item);
                })
              })
            }
          },
          iconColor(name){
            switch(name){
              case '公司': return '#4cd964';
              case '学校': return '#3190e8';
            }
          },
          choosedAddress(item,index) {
               // console.log(item,index)
              this.$store.commit('choosedAddress',{address:item,index:index});
              this.$router.go(-1);
          }
        },
        watch: {
          userInfo:  function (value) {
            if (value && value.user_id) {
              this.initData();
            }
          }
        }
    }
</script>

<style scoped>
  p {
    margin-bottom: 0;
  }
  .addAddress_container {
    padding-top: 1.95rem;
  }
  .addAddress_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 204;
  }
  .addAddress_img {
    width: 24px;
    height: 24px;
  }
  .addAddress_footer span {
    font-size: .7rem;
    color: #3190e8;
    margin-left: .3rem;
  }
  .list_container {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    overflow-y: auto;
  }
  .deliver_address {
    background-color: #fff;
  }
  .deliver_address li {
    display: flex;
    align-items: center;
    border-bottom: .025rem solid #f5f5f5;
    padding: .7rem;
    line-height: 1rem;
  }
  .choosed_address {
    width: .8rem;
    height: .8rem;
    margin-right: .4rem;
    background: url("../img/duihao.png") no-repeat;
    background-size: cover;
  }
  .default_address {
    background: url("../img/duihao2.png") no-repeat;
    background-size: cover;
  }
  .deliver_address li header {
    font-size: .7rem;
    color: #333;
  }
  .deliver_address header span:first-of-type {
    font-size: .8rem;
    font-weight: 700;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .address_detail {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .address_detail span {
    font-size: .5rem;
    color: #fff;
    border-radius: .15rem;
    background-color: #ff5722;
    height: .6rem;
    line-height: .6rem;
    padding: 0 .2rem;
    margin-right: .3rem;
  }
  .address_detail p {
    font-size: .6rem;
    color: #777;
  }
 </style>
