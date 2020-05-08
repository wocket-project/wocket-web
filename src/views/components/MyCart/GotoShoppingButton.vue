<template>
    <button type="button" class="gotoShopping-btn" @click="gotoShopping()">쇼핑하러가기</button>
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
        gotoShopping() {
            router.push({ name: "products" })
        }
    }    
}
</script>
<style>
.gotoShopping-btn {
  
  background-color: white;
  border: 1px solid #6A5ACD;
  color: #6A5ACD;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  margin: 12px 4px 4px 30%;
  cursor: pointer;
}
</style>
