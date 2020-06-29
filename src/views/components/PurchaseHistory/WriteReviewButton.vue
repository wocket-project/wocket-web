<template>
    <button type="button" class="write-review-btn" @click="onWriteReviewWindow(productId)">리뷰쓰기</button>
</template>
<script>
// import {mapState} from "vuex"
import router from "../../../router"
// import axios from "axios"



export default {
    props: ['productId'],
    // computed: {
    //   ...mapState(["isLogin"]),      
    // },
    methods: {
        onWriteReviewWindow: function(id) { // productId로만 넘기는 경우 -> 구매하지 않은 품목도 productId 조작으로 리뷰를 남길 수 있는 문제가 생김(추후 해결해야할 문제)
            window.open("/writeReview?productId="+id, "_blank", "toolbar=yes, scrollbars=yes, width=650, height=780");
        }
    }    
}
</script>
<style>
.write-review-btn {
  background-color: #6A5ACD;
  border: none;
  color: #FFF;
  text-align: center;
  display: inline-block;
  font-size: 90%;
  font-weight: bold;
  padding: 10%;
  cursor: pointer;
}
</style>
