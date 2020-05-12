<template>
    <button type="button" class="cart-deleteAll-btn" @click="deleteCartAll()">장바구니 전체삭제</button>
</template>
<script>
import {mapState} from "vuex"
import router from "../../../router"
import axios from "axios"

export default {
    // data() {
    //     return {          
    //         cart: {
    //             cartItems: [],
    //             grandTotalPrice: null,
    //         },
    //     }
    // },
    computed: {
      ...mapState(["isLogin"]),      
    },
    methods: {

        // 장바구니 추가 요청
        deleteCartAll() {

          // if(this.cart.cartItems.length === 0) {
          //   alert('삭제할 장바구니 상품이 없습니다.')
          // } else {
            if(this.isLogin === true) {
            let token = localStorage.getItem("accessToken")

            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
            
            axios
            .delete("http://localhost:9306/cart", config)
            .then(response => {                
                alert("장바구니를 모두 삭제했습니다.")
                this.$emit('deleteCartAll')
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
          } else {
            alert("로그인이 필요한 페이지 입니다.")
            router.push({ name: "login" })
          }
          //}
        },
    }    
}
</script>
<style>
.cart-deleteAll-btn {
  background-color: white;
  border: 1px solid #6A5ACD;
  color: #6A5ACD;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin: 4px;
  cursor: pointer;
  position: relative;
  float: right;
}
</style>
