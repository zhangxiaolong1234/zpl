<template>
    <div class="remark_container">
      <Head head-title="订单备注" go-back="true"></Head>
      <!--点击勾选备注部分-->
      <section class="remark_request" v-if="remarkList.remarks.length">
        <header class="remark_title">快速备注</header>
        <ul class="remark_list_ul">
          <li class="remark_list_li" v-for="(item,index) in remarkList.remarks" :key="index">
            <span :class="{first: remarkIndex == 0, last: remarkIndex == item.length - 1, choosed: remarkText[index]&&(remarkText[index][0] == remarkIndex)}" class="remark_item_li" v-for="(remarkTtem, remarkIndex) in item" :key="remarkIndex" @click="chooseRemark(index, remarkIndex, remarkTtem)">{{remarkTtem}}</span>
          </li>
        </ul>
      </section>
      <!--输入备注信息部分-->
      <section class="input_remark remark_request">
        <header class="remark_title">其他备注</header>
        <textarea class="input_text" v-model="inputText" placeholder="请输入备注内容(可不填)"></textarea>
      </section>
      <div class="confirm" @click="confirmRemark">确定</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Head from "../Header/Head";
    export default {
        name: "Remark",
        components: {Head},
        data() {
          return {
            remarkList:null,
            remarkText: {},
            inputText: null,
          }
        },
        mounted() {
          Vue.axios.get("https://elm.cangdu.org/v1/carts/1/remarks").then((res)=>{
            // console.log(res.data);
            this.remarkList = res.data;
          })
        },
        methods: {
          chooseRemark(index,remarkIndex,text) {
            this.remarkText[index] = [remarkIndex, text];
            this.remarkText = Object.assign({}, this.remarkText);
          },
          confirmRemark() {
            this.$store.commit("confirmRemark",{remarkText:this.remarkText,inputText:this.inputText})
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>
  ul {
    margin-bottom: 0;
  }
  .remark_request {
    background-color: #fff;
    margin-top: 2.35rem;
    padding: 0 .6rem 1rem;
  }
  .remark_title {
    font-size: .65rem;
    color: #333;
    line-height: 2rem;
  }
  /*选择框*/
  .remark_list_ul {
    display: flex;
    flex-wrap: wrap;
  }
  .remark_list_li {
    margin-right: .6rem;
    margin-bottom: .6rem;
  }
  .remark_request ul li span {
    font-size: .6rem;
    color: #333;
    padding: .3rem .6rem;
    border: .025rem solid #3190e8;
    border-left: 0;
  }
  .remark_request ul li span:first-of-type {
    border-left: .025rem solid #3190e8;
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
  }
  .remark_request ul li .choosed {
    color: #fff;
    background-color: #3190e8;
  }
  /*输入框*/
  .input_remark {
    margin-top: .4rem;
  }
  .input_text {
    width: 100%;
    background-color: #f9f9f9;
    border: .025rem solid #eee;
    resize: none;
    min-height: 4.5rem;
    border-radius: .2rem;
    font-size: .6rem;
    color: #666;
    padding: .5rem;
  }
  /*确认按钮*/
  .confirm {
    background-color: #4cd964;
    font-size: .7rem;
    color: #fff;
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: .2rem;
  }
</style>
