<template>
    <div class="buyCart-container">
      <section v-if="!foods.specifications.length" class="cart_button">
        <span @click="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)" v-if="foodNum">
          <img src="../img/reduce.png"/>
        </span>
        <span class="span_num" v-if="foodNum">{{foodNum}}</span>
        <span @click="addCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock, $event)">
          <img src="../img/add.png" alt="">
        </span>
      </section>
      <section v-else class="cart_spec">
        <section class="cart_choose">
          <span class="spec_reduce" v-if="foodNum" @click="showReduceTip">
            <img src="../img/reduce.png" alt="">
          </span>
          <span class="spec_num" v-if="foodNum">{{foodNum}}</span>
          <span class="show_chooselist" @click="showChooseList(foods)">选规格</span>
        </section>
      </section>
      <AlertTip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></AlertTip>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import AlertTip from "./AlertTip";
    export default {
        name: "BuyCart",
      components: {AlertTip},
      data() {
        return {
          showAlert:false,
          alertText:null
        }
      },
      computed: {
          ...mapState([
            'cartList'
          ]),
          shopCart:function () {
            return Object.assign({},this.$store.state.cartList[this.shopId]);
          },
          foodNum:function() {
            let category_id = this.foods.category_id;
            let item_id = this.foods.item_id;
            if (this.shopCart&&this.shopCart[category_id]&&this.shopCart[category_id][item_id]) {
              let num = 0;
              Object.values(this.shopCart[category_id][item_id]).forEach((item,index) => {
                num += item.num;
              })
              return num;
            }else {
              return 0;
            }
          }
        },
        props:['foods','shopId','shopName','imgPath'],
        methods: {
          //移除购物车
          removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
            if(this.foodNum > 0){
              this.$store.commit("reduceCart",{shopid:this.shopId,category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
            }
          },
          //添加购物车
          addCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock){
            this.$store.commit("addCart",{shopid:this.shopId,category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock,shop_name:this.shopName,img_path:this.imgPath});
          },
          showReduceTip() {
            this.showAlert = true;
            this.alertText = '您要去下方购物车去清空';
          },
          showChooseList(foodsScroll) {
            this.$emit('showChooseList',foodsScroll)
          }
        }

    }
</script>

<style scoped>
  .cart_button {
    display: flex;
    align-items: center;
  }
  .buyCart-container img{
    width: .9rem;
    height: .9rem;
  }
  .span_num {
    font-size: .65rem;
    color: #666;
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue,Tahoma;
  }
  .cart_choose {
    display: flex;
    align-items: center;
  }
  .spec_num {
    font-size: .65rem;
    color: #666;
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue,Tahoma;
  }

  .show_chooselist {
    display: block;
    font-size: .55rem;
    color: #fff;
    padding: .1rem .2rem;
    background-color: #3190e8;
    border-radius: .2rem;
    border: 1px solid #3190e8;
  }
</style>
