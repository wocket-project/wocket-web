<template>
<div class="qna-section">
    <!-- 상품문의 header -->
    <div class="qna-header">
        <h4>상품문의( <strong>{{ qnas.length }}</strong> )</h4>
    </div>
    <hr class="qna-hr">
    <div class="review-header-message">
        <p>* 상품과 관계없는 글, 양도, 광고성, 욕설, 비방, 도배 등의 글은 예고없이 삭제됩니다.</p>        
    </div>
    <div class="qna-textarea">
        <textarea class="form-control" v-model="question" name="question" rows="4" 
        cols="80" placeholder="상품에 대해 궁금한 점을 물어보세요."></textarea>
        <button type="button" class="write-qna-btn" @click="deleteCartAll()">등록하기</button>
    </div>
    
</div>
</template>
<script>
import axios from "axios"
import router from "../../../router"


export default {
    props: ['product'],
    data() {
        return {
            loading: true, 
            qnas: [],
            question: null,
        }
    },
    created () {
        this.getQnas()
    },
    watch: {
        '$route': 'getQnas'
    },
    methods: {
        // 상품 문의정보 요청
        getQnas() {
            axios
            .get("http://localhost:9306/questionAnswers/"+this.$route.params.id)
            .then(response => {
                this.loading = false
                this.qnas = response.data
                console.log(response.data)
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },
        writeReview() {
            router.push({ name: "PurchaseHistory"})
        },
    }    
}
</script>
<style scoped>
.qna-section {
    width: 100%;    
}

.qna-header h4{
    font-weight: bold;
    font-size: 100%;
}

.qna-header strong{
    color: #7c6beb;
    font-size: 120%;
}

.qna-hr {
    margin: 2% 0% 2% 0%;
}

.qna-textarea {
    box-sizing: border-box;
    position: relative;
    width: 85%;
}

.qna-textarea textarea{
    resize: none;
    float: left;
    height: 100px;
    border-radius: 0%;
}

.write-qna-btn {
    position: absolute;
    width: 120px;
    height: 100px;
    font-size: 100%;
    border-left: 0;
    border: solid 1px #b7bfc8;
    background-color:white;
    cursor: pointer;
}
</style>