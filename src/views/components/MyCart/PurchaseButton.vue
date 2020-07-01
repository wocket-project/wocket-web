<template>
    <button type="button" class="purchase-btn" @click="gotoPurchase">구매하기</button>
</template>
<script>
import router from "../../../router"

export default {
    props: ['isCartItem'],
    methods: { 
        gotoPurchase: function() {

          if(this.$props.isCartItem === 0) {
            alert('구매할 상품이 없습니다.')
            return
          }
          router.push({ name: "purchase", query: {from:"cart"}})
        }
    }    
}
</script>
<style>
.purchase-btn {
  background-color: #6A5ACD;
  border: 1px solid #6A5ACD;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  margin: 12px 4px;
  cursor: pointer;
}
</style>
