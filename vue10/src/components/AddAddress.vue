<template>
  <div class="addAddress">
    <Head head-title="添加地址" go-back="true"></Head>
    <section class="page_text_container">
      <section class="section_list">
        <span class="section_left">联系人</span>
        <section class="section_right">
          <input type="text" name="name" placeholder="你的名字" class="input_style" v-model="name">
          <div class="choose_sex">
              <span class="choose_option">
                <div class="choose_img" @click="chooseSex(1)" :class="{choosed: sex == 1}"></div>
                <span>先生</span>
              </span>
            <span class="choose_option">
                <div class="choose_img" @click="chooseSex(2)" :class="{choosed: sex == 2}"></div>
                <span>女士</span>
              </span>
          </div>
        </section>
      </section>
      <!--联系电话部分-->
      <section class="section_list">
        <span class="section_left">联系电话</span>
        <section class="section_right">
          <div class="add_phone">
            <input type="text" name="phone" placeholder="你的手机号" class="input_style" v-model="phone">
            <img src="../img/add2.png" alt="添加" class="add_img" @click="phone_bx = true">
          </div>
          <input v-if="phone_bx" type="phone" name="anotherPhoneNumber" placeholder="备选电话" v-model="anotherPhoneNumber" class="input_style phone_bx">
        </section>
      </section>
      <!--送餐地址-->
      <section class="section_list">
        <span class="section_left">送餐地址</span>
        <section class="section_right">
          <router-link to='/confirmOrder/chooseAddress/addAddress/searchAddress' class="chooseAddress">{{place? place.name : '小区/写字楼/学校等'}}</router-link>
          <input type="text" name="addressDetail" placeholder="详细地址（如门牌号等)" v-model="addressDetail" class="input_style">
        </section>
      </section>
      <!--标签部分-->
      <section class="section_list">
        <span class="section_left">标签</span>
        <section class="section_right">
          <input type="text" name="tag"  placeholder="无/家/学校/公司" v-model="tag" class="input_style">
        </section>
      </section>
    </section>
    <div class="confirm" @click="addAddress">确定</div>
    <AlertTip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></AlertTip>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue';
  import AlertTip from '../common/AlertTip';
  import Head from "../Header/Head";
  import {mapState} from 'vuex';
  export default {
    name: "AddAddress",
    components: {AlertTip, Head},
    data() {
      return {
        //名字
        name:null,
        //性别
        sex:1,
        //电话
        phone: null,
        //phone_bx
        phone_bx:false,
        //备选号码
        anotherPhoneNumber:null,
        //地址详情
        addressDetail:'',
        //备注
        tag:'',
        tag_type:1,
        showAlert:false,
        alertText:'',
        //用户信息
        userInfo:'',
        geohash:''
      }
    },
    computed: {
      ...mapState([
        'place'
      ]),
    },
    mounted() {
      this.userInfo = this.$store.state.userInfo;
      // console.log(this.userInfo);
      this.geohash = this.$store.state.geohash;
      // console.log(this.geohash);
    },
    methods: {
      chooseSex(sex) {
        this.sex = sex;
      },
      addAddress() {
        if(!this.userInfo) {
          this.showAlert = true;
          this.alertText = '请登录';
        }else if(!this.name) {
          this.showAlert = true;
          this.alertText = '请输入姓名';
        }else if(!this.phone) {
          this.showAlert = true;
          this.alertText = '请输入电话号码';
        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))){
          this.showAlert = true;
          this.alertText = '手机号码有误,电话号码';
          return;
        }else if(!this.place) {
          this.showAlert = true;
          this.alertText = '请选择的搜索地址';
        }else if(!this.addressDetail) {
          this.showAlert = true;
          this.alertText = '请输入详细地址';
        }
        if(this.tag == '家') {
          this.tag_type = 2;
        }else if(this.tag == '学校') {
          this.tag_type = 3;
        }else if(this.tag == '公司') {
          this.tag_type = 4;
        }
        Vue.axios.post('https://elm.cangdu.org/v1/users/'+this.userInfo.user_id+'/addresses',{
          'address':this.place.name,
          'address_detail':this.addressDetail,
          'geohash':this.geohash,
          'name':this.name,
          'phone':this.phone,
          'tag':this.tag,
          'sex':this.sex,
          'phone_bk':this.anotherPhoneNumber,
          'tag_type':this.tag_type
        }).then((res)=>{
          if(res.data) {
            this.$store.commit('confirmAddress',1);
            this.$router.go(-1);
          }else {
            this.showAlert = true;
            this.alertText = res.data.message;
          }
        })
      }
    }
  }
</script>

<style scoped>
  input {
    border: none;
    outline: none;
  }
  .addAddress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;
  }
  .page_text_container {
    background-color: #fff;
    padding: 0 .7rem;
  }
  .section_list {
    display: flex;
    border-bottom: .025rem solid #f5f5f5
  }
  .section_list .section_left {
    font-size: .7rem;
    color: #333;
    flex: 2;
    line-height: 2.5rem;
  }
  .section_right {
    flex: 5;
  }
  .section_right .input_style {
    width: 100%;
    height: 2.5rem;
    font-size: .7rem;
    color: #999;
  }
  .choose_sex {
    display: flex;
    line-height: 2.5rem;
    border-top: .025rem solid #f5f5f5;
  }
  .choose_option {
    font-size: .7rem;
    color: #333;
    display: flex;
    align-items: center;
    margin-right: .8rem;
  }
  .choose_img {
    margin-right: .3rem;
    width: .8rem;
    height: .8rem;
    background: url("../img/duihao.png") no-repeat;
    background-size: cover;
  }
  .choosed {
    background: url("../img/duihao2.png") no-repeat;
    background-size: cover;
  }
  .add_phone {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .add_phone .add_img {
    width: 20px;
    height: 20px;
  }
  .chooseAddress {
    font-size: .7rem;
    color: #999;
    line-height: 2.5rem;
    border-bottom: .025rem solid #f5f5f5;
  }
  .confirm {
    background-color: #4cd964;
    font-size: .7rem;
    color: #fff;
    text-align: center;
    line-height: 1.8rem;
    border-radius: .2rem;
    margin: .6rem .7rem 0;
  }
</style>
