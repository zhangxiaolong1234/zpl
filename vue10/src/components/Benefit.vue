<template>
    <div class="benefit">
      <router-view></router-view>
      <!--第一导航栏部分-->
      <div id="head_top">
        <router-link :to="{path:'/wode'}" class="more"> < </router-link>
        <!--<a class="more"  @click="backUp"> < </a>-->
        <span class="title">我的优惠</span>
      </div>

      <!--接下来布局 红包 和 代金券两套格式-->
      <!--1.红包-->
      <div class="zpl5" v-if="shopticket">
        <div class="zpl2">
          <div class="zpl3" @click="changeHong">
            <a class="a1">红包</a>
          </div>
          <div class="zpl4" @click="quan"><a>商家代金券</a></div>
        </div>
        <div class="zpl6">
          <p>有<span>{{$store.state.youhui.length}}</span>个红包即将到期</p>
          <router-link :to="{path: '/benefit/hbdescription'}" class="el-icon-question">红包说明</router-link>
          </div>
        <div class="zpl7">
         <ul v-for="(item, index) in $store.state.youhui" :key="index">
           <li style="background-color: white">
             <div class="zpl8">
               <span class="">¥</span>
               <!--<span class="zpl11">{{item.amount}}</span>-->
               <!--<span>.</span>-->
               <!--<span>0</span>-->
               <span class="zpl11">{{String(item.amount).split('.')[0]}}</span>
               <span>.</span>
               <span>{{String(item.amount).split('.')[1]||0}}</span>
               <p>满{{item.sum_condition}}元可用</p>
             </div>
             <div class="zpl9">
               <span class="zpl12">分享红包</span>
               <br>
               <span>{{item.end_date}}到期</span>
               <br>
               <span>限收货手机号为 {{item.phone}}</span>
             </div>
             <div class="zpl10">
               <div class="zpl13">{{item.description_map.validity_delta}}</div>
             </div>
           </li>
         </ul>
          <p class="zpl14">限品类：快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理</p>
        </div>
        <router-link :to="{path:'/hbhistory'}">
          <span class="zpl15">查看历史红包></span>
        </router-link>
        <div class="zpl16">
          <div class="zpl17">
            <router-link :to="{path:'/hbexchange'}">兑换红包</router-link>
          </div>
          <div class="zpl18">
            <router-link :to="{path:'/hbrecommend'}">推荐有奖</router-link>
          </div>
        </div>
      </div>


      <!--商家代金券-->
      <div class="zpl19" v-if="changequan">
        <div class="zpl2">
          <div class="zpl3" @click="changeHong">
            <a>红包</a>
          </div>
          <div class="zpl4" @click="quan"><a class="a1">商家代金券</a></div>
        </div>
        <router-link :to="{path:'/coupon'}" class="el-icon-question zpl20">商家代金券说明</router-link>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACqCAMAAAAgPYI2AAADAFBMVEVMaXHP4O/b6PTz9/zO4PHe5Ojf5/yl0frC6f/e5eH///9mvP/N4PHT4/FWqv5mvP/O3/DT4u1tt/hXtP9tvv3a5OrU4/LO4PL+/v/M3/FnvP9lu//M3/HO4PLN3/L+//9nvP/P4fHO4PLN3/HN4PLP4fDQ4PDR4e/i7fb91aT+/v/N4PHN4PHX4+3+/v/+/v/N3e5mvP9iu/9nu//b5eyjxeMtmvzQ6v7+///R4fH9/v9lu//+//////5nvP+mxuRmvP/R4fJlvP9qvf/Z5OqmxuRpvP8znfz/1p/////5+/3+///N4PH8/f/f5+6kxuPa5Or////c5u0um/ufx+grmv8kk/cum/z81p3M3/H7/P7Y4+nZ5Oo3n/yRwepvwf9wwP/C2e04oPykxuMplvgkkPHR4fFSr/6ZweBTsPyKttspl/nw9frr8vn1+Pv51aX/1qL91qJNrPz/1aIwnf++1+vEzMSUvN//1qJ7v/NQrv250+r////M3/HO4fFnvP/O4PHN4PHP4fItmvzQ4fLR4fI6ofzM4PHR4vLa5Or///9wwf/K3vHH3fBpvv9pvf9lu/9twP/P4fErmfzL3/IwnPzG3O9rv/9guv8znv0llvxmvP//1qL+//9Usf/U4/P5/P3J3fA7ov1juv/W5vRqvv9at/8ilPxPsv82n/xMrP73+v04ofzu9fri7ff7/f/1+fwwnf9Vtv9euP/H3PD9/f8fh+RLsP/x9/vZ6PXf6/bZ5Orr8/no8fnP4fTm7/jN3/IsmvzO4PLg5/B0wv7H5P9RtP+b0fz/1JRCqP7c5ekomP0Tg+nZ5fFZtP6Bx/5Nrv6Tzf3d6vbZ4+lHr///2Ze74f/t+P/N4fPE2u/V4eh6xf6j1//Q4fHk6vDg3teKyv3W5PDM4vi02PXp7fLk9P+iz/cdjO8Tgufc5vGu2vzl0rJKq/6/2/Q1me8Tj/7S4u/Q4fGYv+Bkuf7W7f/H3vPp28n52KzK6P+kxuSqyNa4ys368u7S4O3R4/Lo5OBHu2ueAAAA1HRSTlMAICkYnRQGBAEKMvSGPAydWGsUMiLZM7e27Lju1d2rWnJi9OTLeUhOJCGv+8WMetgPxmTez4eO/uHrodGN+0NgUfp+sMSvJ1b9vc/nwESC3q3xnONNHYa5Y3Rw67l0MPPUlM/v0rTR/kHgy/uijk+GsJ3r5O7GtOLi7tTW/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ueBe6AAABBsSURBVHja7Z15dBPXucCvjY1tMBgDYWnCvjZAWBNKFhrCkjTN3qRJk7Rpmqa8tm9tX/uWM+OxZBuLo1El2fVYxghJlpHlyJYUSdQW2PFDNnYMsY2NCwhjyk7gseQkaZJuvHdnkUb7aMDvvHPl+XlD8uEPfuf7vvnmu3cuQEJCQkJCQkJCQkJC4v+FHzz/TQD55stAQpi/e34VkBBibFoWoNn6IJBIRHY2TMCtW9kMlGQlJmtsFsiZ+jJTr7KkNBTWBb+9LAWVMNlMzVpK/0FCqGAxjn4mhZUQD8zhImvrp2NAdhaQiM9SDLt/HNNefboVSLIEAguDPJoNst/5dDKQSMz9GM3KZx/89G0gIcC3MBb7O9KlUJAZGMeLD8BeVCpZCXkUC/LtObDXGt26cjLT0pampWWOBTEZh4UwYxzIyh6VkqZNys2Y/pMFG+ZvKikZ3jR/w6yFszMWLUmPDJ2VWCgPZ446WenzMhZuKAmlOMiCZ3KXjIkMLZ4xoyuiFq/4SUkkxTxyyLLluRNAgDkvhpStUeVqccYGhaJEQBbDrBXTAMvbzmDNGkWulubOUkAEZXGULc+nJ1er/u1PL814DEbVjDlg1DBhtoJDyBVHQUHBzNw08OCffgbAmHHpOaNI1XQFRFRgFdBsynjn+YlgVDGNViUQWJGyChhktwt+lQNGEZkZjCSxWcihqN20CIwa8udHuxKWVRBC4X2LR0kGPjNcSOLDAoElIKuwMGMU5OK4GTans7l1QGEqFJ+FvCzIrJQPrtcxDmNbIXnnWciSC1KahzEeZ63pjgOLY3oKr66O/RYWyr5aknMlXhbHgmkgRRmzEgvHUYzfaXnnkC1bkqKuvoHpsXAaTcUCWSgkSyabl6KusH1YBF6TghNUCCkWK0tG873UdBWN04RDT6QJLyxRGEpwslhkFjKkXDufsxKLSRteWGgYaG102oxGY/N+EheZhSkZW09j0ejpEmZ0Oh0hRcxHKuIPHKKzkGNeii0jJ4nNR5aIDSxIKjXzj+qxZHGaCkXLgqSDVGGOHkueNipGFgq5ks3MSZV7532hbbuguFpTicjAgpQ+kyIXwm+HV3XhRPRFBZawrNLcFCzu+n2YEHZPSdJNFi+rdMIoKlg8DjkuOgshM7PQH7cbMdG0esRnISQjBbZTRUWWcLE3kGIDC4LjE1BPQixalnD9ajTdkawFiI/7XsSgEPGh5SXFlXcIDlmEdusev1XQs99i0+IRH1iQZZkAXZbG05FAlHFgoLHZiwtOsqJlQTKQbrFEY7ztN5lIvFh0YLGkoXufg4nH7ocdqY8TJV5WxmgKLGyAKoayZDjuE5mFHKhWrXTsDmj0e0wmXK5Q4CbxgQXJRX5FVcyddIvd3tpsMzqcXpW8mPRQKlyUrPljAYpkPiZwGRTCS5K1ba37yyiyLL4rXhbHPEQf37pLjCY53dE62gpUgoHFsxCgyErsbjEMsGFoq1UJyuJZmop9gzD21kDi3iYFsxDpEv8odtfYjMGqTwkFFs99AD2+gY0I4mXh6aMxC3kcw6RgFvJ8L5WvhcLsp8oEA4tnOoJP544cTlVpgQhZ83MAWqx6MWrIN/KBBYnhCr3x8rPYyMlyFOAiAgvBgenr2MjRSsUbOJTGljUb5Zto/V028iZxgYXfl6L1PeHcWc/1WMKTLB4ER/Fj+ZbUcWn98ePXrh0/9PkJMeth/C9qVUKBhXiFH8ONZ04c7+9wu6xNTU3Wzl7N0OmvjKInNs3QlVhZkxAckq7v1zVZLWaNhiCIao1G52qyak9fwsThFZuFkEXIdQ6f91mbdEQ41ZYm9+kTohpSMn5DGlfW22jdGT5m7LJaNWoiCrV7UHNcVEMqnIWo9w7rtYNmNRETtaWpf1/yDamISRaid4dzzS41EQ+1ZrAj2VRsExFYiI6Wn7Do1EQC1FZNcnVef9skLAvtrnQuIQC0ZY4TW0an0xY69At3lXqyHieEUTcpHVgUzoFauawUN9gxjlqhJgt1WVMJiEanMye2NdgfXaBMHhL3yXykfyDQkMpSXNYjUIVZ3XdWm9iWZvAQFs6AP7B5xkd5jbBgNd82CWxgQ13WGlqE5mxXVz+hIRJh0djCOyq/PEgBpdhvrzWRZUKBhfbVcOJ4OrAq+/v7u5Q6gUQ8Hb6A4wvZn1yGqyhSJrh1Jg7LUekaCOZGsK+r62y1hkiI2x1yRdQbyDvak4VyU5p1L1uQNENDhEbwihgSWs24b+RkZaDVNmh0bg0hhCWkfWg0CT6KKSALvRX8zYQIqq3r+ZJlGrnAwvNRKe8ce7Usyhho9xIsIXnYOpKylgAU2MiFjFqr6d3OsCcGvYRSXU1AXH28LJWILCwVkJWO0F0hdNVbU8VSUb4riiP127V7aVtu4gSm52vWSAXWzLEABfLYy5z2aEX9DpaaqvKiSKC/7spKaMts+RzjsMllAq6iZSHeZn2NoNHuga446otiUV7XraWvmZ2HQp72FRtYqHcOqwlIpbuecdVAf1WUx7R15Eivlr4c8hPmNs+IyZqHzk00oTxasSNOEvLUHVXSl0NeltEnY8v73ctKR1JWTUNRXFnvKWGfbz39GD908EQGlgwnTRASF3ctnAUQSkNeVgMXWOUMUbKIatfldnugi282+cJkkZSpUGGAlJkoUykniqT8fopEvmTxBV75XkWwuh9kzFRUVdVXVRyMlmW5dtWjaNWzy9L7qaCrMpmKum1vtjmYnd3NbQaKwqEqFaXw7rd7ST8vC+H16DxeFl/dy+HLmhr6VaQsjftCezHuMbRwT92TxZwslcrbEjZ2bvSqKJNf3sa86fT6VTI8HstWIbRUwcuqP3iQkVVVwxQwGGcRsnTqP/bAh8BIj9fGGPHgjCwTVduMRdJcS9od/JYtP+LzGcgUTlZ4YDVw7ioiZVmGzhmKIXKPr41pH/x4GVSlaMFiYcR4nHI/ulnIj7N4Weyl8GB5fU08Wa7+dsaVHOZirY22RVH+2y16TJh9Bt4Wqttv80LTkI6sg1wSQqLSsNpygZMF8eCN9KTG0LYvCVPMaNWP9LUQsjGsZhXBfqFqR4CqyAJv6VAYgrJg5bJjYnAo/KTK7/fDZsKE80wD6LA2JA0b6mHLUMM3qBGy1J1dZ+SMK9bWf3kGBA5+CMdo8Mi99taWFrvMb0Jym8MaWlYRZwg2DAFq6KQMl+XW/LYn/DgjqtYYET37Em4NtDk4bXaVR4bgpr/sewnl9aKahh0R1NSXRzalgcDiKVDhsGcQFV76QPtP4jQLAFI8zqQhJys6sHhZ1ZWGnuIIWWUqslHcdnB9cIkWyYd+NyuPQlm0LfgVd/xQd1134Ywv6lCxMlI14IwOJ2FlLX70Agsy8S0oi1HVUN8Af8QeP9Q1dJ1RxDjmtkxGkV4nJppGD8lULNT4wXZWVgP8jBdYFbd6L/bIYx/tV0qR+22YSFr9iD7E+v2oitVQdDDcVd2tCxd98c5PLiulZHY9JgqDh+mx0CPrR6wjPrIiA+vWrcsX5YkO2CT9Bqe4g0aYTcooMvFVrsI3xOpHK3bd6r5xUSFPfMAmZWoWUeB9FH9XiF4mfqeeqe5seQ9rG8rr6jrOXPTJhU5u9ZA2EWcjMdUdVeYerYH3OoyuGmauxa8ZVl3+61VfEucn+wewJGn2k3QSosoTb1V+tr17RxUTXsHAOnhk166a3sqhG+3yJE4xJ3EjlhQOnGKWodEh8+sMWcGJ6V6t2rynu76iqmjXEQa4cF/R3VupVLssN9p9xcMfHOI4PxxzuZCUJynL60frSpjzz0/tZvj317iBKUQNxbiPdtfAxYoKev7Qvd2sVarh+66OnnPDH5z/A8cn0FYMWVQblgxs854P0OGfdgd4Kodd5OF8abWEmtCY6efo9iqVlWqCofPymZPnv/iQ48u/nY8VWIXJBZZNpULs+Lp/Cbr6fQ4bWLwv9V4WNRHEojWsP/UhDEaGD784FEOWx4slxW2/DF8OUOLrv9y9+/c0T8E0zAuXZbZCdLwqNrTsw7s/ZP4GDK0/xJJF7ceSYQAm4ayxACkyX3vt13/+y1/+/B8AbKO3/1UHXXVaur5af1pnDbPl3ntu///8N8OXX35x/mSkKwhlF57F65l7wgWZADnWdLpcLkvemrV0DXeb1awrK3xczmHEbH1BW8xjwJa+3x6vtuh0nV0D5w99MBwmK+k01GNGkwefmQYQlFWtqQ4ElHqPey9bnT7TY329Vvcl7KyL223qdtPaoCi3xqxzXbv6QXjjUMiBk7ZkWnc0XYGNIXWKOMrJgpuKhgabrGed2GkrJ6u3t5KAmOkA0xF/7Im3J4saEM5DuWcBkq7AZE1IUb/OpqHZor80aDl7Avvc3c3aIyp790BZHK6+q4p4snCqEROgzb9wFUATvr3aq7uuYWW5sa+6NZijb/DsNZ2Gk3VUEyxfrgvt8Tf7UcWOxCecGsnZWQBRpvCyHvlFtZqx0XnJaLX0EYPWE3qXmf3dHnWHK9BB9LUr4suS+RsTyzLkAnR5fDzBkjfxp1zSWc9ixwe7u3s71R06TuRg/7mOTotOY3Z3apmKVRZXVmvCY0W8kwDKTM2jda2dC8BaroBVwwp/6XTXpUu9LjUnq+nsX89dHiJ01dp++VVfgsDCVQnnf+vSAeJMnrJxSjb8+UMujtS6pi74TzZe4x8Dhnsjz7X33Lhw42R7T6L9yYX+2gSBpf8HkDL8MOBGrWmyDPW5m/iiboFFvdjQc7XnXKxJFo+JSjCGf/pZkDps1oX0EZbe0ONDXC8/l8T/QVRg8rfErVbG50AKkZ2nI+JxLwATnhGUpYrfZe27fxpIKTYTxG8CqCG/4V+tBZAlCxM/BEap4rlyPD0HpBgbxyu12srKSi0Efqc/IMyLNYBh0vIEgeUvcMZRNeMfQeox+cnfBbjy5JQfB1+8+woIsHj2ptiycH+tMWa9av77CSAlmfjRxx8xfHwlC7z7MfMnyHdBCGn502cuOxkpy8TN/fThW2n0T78+BqQor/zr+xw/ygYPvR/goYihYe6G4ZMnS0+GjkgLY5SrlQ8/MA6kLpO/U8TxKgBPFgV4KDSuXrjn2LHDOw+c+6TsJMTHpqDXgUVgazyzZTFIZSYGZb0LwJRoWTkvHdvJcvgwI+wT2LWXkmRreEFvbjnTfuDUqWPH3sgHKcyPiw5yfoLmQtMwc2cohxljB879rd1oczrhZ3NzS8vFi2d2noKwVreAFObVXXXw4/2iou/TL6CqI3VXrtTxBX7Mint2hnOY5hjLKZZA9B3bkp+V0pHVffS97itXit5/Er74LlT185s3b16BsnjS56148543wo0dOHYAujpwIPjGG+teeG5JGkhp5n6mhKhvflQ0BcAKv6v8ukXb0fHZT7eBCDLTJ0zKf27FSy+8uWXdunX30Kxbt2XLmy+8tGJR/pIJS3NAyvO4sqvDTKg7hm7+7hW6kfh5b0d/n06tVY7fBiQiD1pRd6g1BKHRKmGbBUDWf3YQfUNmAr61NhtIhJFHVOugGNrWW5OZAZeaCMz/ngAS4bIeWb169ddoVm9mZD0xfvy9DOOJPCARRlZWdkS2Td02lWHblIlAQkJCQkJCQkJCQkLi/4j/BTn9oC8GsH92AAAAAElFTkSuQmCC" alt="">
        <p class="zpl21">无法使用代金券</p>
        <p class="zpl22">非客户端或客户端版本过低</p>
        <div class="zpl23">
        <router-link :to="{path:'/download'}">下载或升级客户端</router-link>
        </div>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  //vuex网络请求
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios)

  //小图标
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';

  Vue.use(ElementUI);
    export default {
        name: "Benefit",
      data(){
          return{
            hongbao:'',
            shopticket:true,//红包显隐
            changequan:false,//代金券显隐
          }
      },
      methods:{
        backUp(){
          this.$router.go(-1);
        },
          changeHong(){
            this.shopticket = true;
            this.changequan = false;
            //console.log('111');
          },
        quan(){
            this.changequan = true;
          this.shopticket = false;
          //console.log('222');
        }
      },
      mounted(){
          Vue.axios.get('https://elm.cangdu.org/promotion/v2/users/1/hongbaos?limit=20&offset=0').then((res)=>{
            //console.log(res.data);
            this.hongbao = res.data;
            this.$store.state.youhui = this.hongbao;
          })
      },

    }
</script>

<style scoped>
  @keyframes allShow{
    0%   { opacity: 0 }
    100% {opacity: 1}
  }
  *{
    padding: 0;
    margin: 0;
  }
  .benefit{
    width: 100%;
    height: 100%;
    background: #f1f1f1;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    animation: allShow 1s ease-in-out;
  }
  #head_top{
    width: 100%;
    height: 1.95rem;
    background-color: #3190e8;
  }
  #head_top .more{
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
  .zpl2{
      width: 100%;
      /*height: 2.5rem;*/
      overflow: hidden;
      background: white;
    }
  .zpl3 {
     width: 50%;
     /*background: pink;*/
    float: left;
    text-align: center;
    line-height: 2rem;
    font-size: 0.7rem;
   }
  .zpl4 {
    width: 50%;
    float: right;
    text-align: center;
    line-height: 2rem;
    font-size: 0.7rem;
  }
  .zpl2 a{
    color: #333;
  }
  .zpl2 a.a1{
    border-bottom:2px #3190e8 solid;
    color: #3190e8;
  }
  .zpl5{
    width: 100%;
  }
  .zpl6{
    width: 100%;
    height: 2rem;
    line-height:2rem;
    overflow: hidden;
  }
  .zpl6 p{
    width: 50%;
   display: inline-block;
    font-size: 0.6rem;
    padding-left:0.3rem ;
  }
  .zpl6 a{
    width: 45%;
    text-align: right;
    display: inline-block;
    font-size: 0.6rem;
    line-height: 1rem;
    padding-left:1rem ;
  }
  .zpl7{
    width: 100%;
    overflow: hidden;
  }
  .zpl8{
    width: 23%;
    float: left;
    font-size: 0.9rem;
    text-align: center;
    padding-top: .5rem;
    border-right: 1px dashed gray;
  }
  li{
    width: 16rem;
    height: 4.3rem;
    text-decoration: none;
    margin-top: 0.4rem;
    padding-top: .5rem;
    background:#fff url('../images/images/hongbao.png')repeat-x;
  }
  .zpl9{
    width: 60%;
    height: 3.4rem;
    float: left;
    font-size: 0.6rem;
    padding-left:0.5rem
  }
  .zpl10{
    width: 14%;
    margin-top: 0.2rem;
    float: left;
    font-size: 0.7rem;
  }
  .zpl11{
    font-size: 1.3rem;
  }
  .zpl12{
    font-size: 0.9rem;
  }
  .zpl8 span{
    color: red;
  }
  .zpl8 p{
    font-size: 0.6rem;
  }
  .zpl13{
    color:red;
  }
  .zpl14{
    font-size: 0.6rem;
    color: gray;
  }
  .zpl15{
    display: block;
    font-size: 0.7rem;
    text-align: center;
    color: gray;
    margin-top: 1.6rem;
    margin-bottom: 2rem;
  }
  .zpl16{
    width: 100%;
    /*height: 2.3rem;*/
    background: green;
    overflow: hidden;
   }
  .zpl17{
    width: 50%;
    /*height: 2rem;*/
    background: white;
    border-right: 1px solid gainsboro;
    float: left;
    /*margin-top: 1rem;*/
    font-size: 0.7rem;
    text-align: center;
    line-height: 2rem;
  }
  .zpl17 a{
    color: #000;
  }
  .zpl18{
    width: 50%;
    /*height: 2rem;*/
    background: white;
    float: left;
    /*margin-top: 1.5rem;*/
    font-size: 0.7rem;
    text-align: center;
    line-height: 2rem;
  }
  .zpl18 a{
    color: #000;
  }
  .zpl19{
    width: 100%;
    /*background: red;*/

  }
  .zpl20{
    width: 100%;
    /*background: green;*/
    text-align: right;
    font-size: 0.7rem;
  }
  .zpl21,.zpl22{
    width: 100%;
    /*background: green;*/
  }
  .zpl21{
    text-align: center;
    font-size: 0.6rem;
  }
  .zpl22{
    text-align: center;
    font-size: 0.6rem;
  }
  .zpl23{
    width: 50%;
    height: 2rem;
    /*background: orange;*/
    border-radius: 5%;
    text-align: center;
    margin: 0.7rem 3rem;
    background:green ;


  }
  .zpl23 a{
    color: white;
    font-size: 0.65rem;
  }
</style>
