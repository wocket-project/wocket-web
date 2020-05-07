<template>
    <button type="button" class="cart-btn" @click="addCart()">장바구니</button>
</template>
<script>
import {mapState} from "vuex"
import router from "../../../router"
import axios from "axios"

export default {

    computed: {
      ...mapState(["isLogin"]),      
    },
    methods: {

        // 장바구니 추가 요청
        addCart() {
          
          if(this.isLogin === true) {
            let token = localStorage.getItem("accessToken")

            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
          
            const bodyParameters = {
              key: "value"
            };
            
            axios
            .put("http://localhost:9306/cart/add/"+this.$route.params.id, bodyParameters, config)
            .then(response => {                
                alert("성공적으로 장바구니에 추가되었습니다.")
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
          } else {
            alert("로그인이 필요한 페이지 입니다.")
            router.push({ name: "login" })
          }
        },
    }    
}
</script>
<style>
.cart-btn {
  background-color: white;
  border: 1px solid #6A5ACD;
  color: #6A5ACD;
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
