<template>
    <button type="button" class="write-review-btn" @click="onWriteReviewWindow()">리뷰쓰기</button>
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
        onWriteReviewWindow: function() {          
            window.open("/writeReview", "_blank", "toolbar=yes, scrollbars=yes, width=450, height=600");
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
