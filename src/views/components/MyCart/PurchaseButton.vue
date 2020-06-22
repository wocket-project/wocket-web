<template>
    <button type="button" class="purchase-btn" @click="gotoPurchase">구매하기</button>
</template>
<script>
// import {mapState} from "vuex"
import router from "../../../router"
// import axios from "axios"

export default {
    // computed: {
    //   ...mapState(["isLogin"]),      
    // },
    methods: { 
        gotoPurchase: function() {          
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
