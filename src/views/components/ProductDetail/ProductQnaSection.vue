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

    <div v-for="qna in qnas" :key="qna.id" class="qna-list">
        <div class="qna-list-box">
            <div class="qna-contents-header">
                 <div class="qna-contents-header-msg">{{ qna.questionWriter }}  {{ qna.questionRegisterDate }}</div>
            </div>
            <div class="qna-question">
                {{ qna.question }}
            </div>
            <div class="qna-contents-footer">
                <button v-bind:id="'answer-btn-'+qna.id" v-if="qna.answer === null" type="button" class="answer-btn">답변하기</button>
                <button v-bind:id="'answer-btn-'+qna.id" v-if="qna.answer !== null" type="button" class="answer-btn" @click="displayAnswer(qna.id)">답변보기</button>
            </div>
            <div v-bind:id="'qna-answer-'+qna.id" class="qna-answer">
                <h4>{{ qna.answerWriter }} | {{ qna.answerRegisterDate }}</h4>
                <span>{{ qna.answer }}</span>
            </div>
        </div>
        <hr>
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
            isAnswerFlag: false,
        }
    },
    created () {
        this.getQnas()
    },
    watch: {
        '$route': 'getQnas',
        '$route': 'replaceWriter'
    },
    methods: {
        // 상품 문의정보 요청
        getQnas() {
            axios
            .get("http://localhost:9306/questionAnswers/"+this.$route.params.id)
            .then(response => {
                this.loading = false
                this.qnas = response.data
                this.replaceWriter()
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },
        displayAnswer(qnaId) {
            
            var display = document.getElementById('qna-answer-'+qnaId).style.display
            if(display === "none") {
                document.getElementById('answer-btn-'+qnaId).style.color = "#7c6beb"
                document.getElementById('qna-answer-'+qnaId).style.display = "inline-block"
            } else {
                document.getElementById('answer-btn-'+qnaId).style.color = "black"
                document.getElementById('qna-answer-'+qnaId).style.display = "none"
            }
        },
        writeQuestion() {
            
        },
        replaceWriter() {  // 작성자 데이터 치환 : 김한솔 -> 김*솔로 변경
            var replaceChar = '*'
            var position = 2 // 2번째 문자 *으로 치환

            for(var i=0; i<this.qnas.length; i++) {
                this.qnas[i].questionWriter = this.qnas[i].questionWriter.substring(0, position-1) 
                + replaceChar + this.qnas[i].questionWriter.substring(position, this.qnas[i].questionWriter.length)

                if(this.qnas[i].answerWriter !== null) {
                    this.qnas[i].answerWriter = this.qnas[i].answerWriter.substring(0, position-1) 
                    + replaceChar + this.qnas[i].answerWriter.substring(position, this.qnas[i].answerWriter.length)
                }
            }
        }
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
    margin-bottom: 15%;
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

.qna-list {
    margin: 2% 2% 2% 2%;
    position: relative;
    width: 90%;
}

.qna-contents-header {
    margin-top: 2%;
    margin-bottom: 3%;
    color: #CCC;
    font-size: 75%;
}

.qna-question{
    min-height: 80px;
    font-size: 90%;
}

.qna-contents-footer {
    font-size: 80%;
}

.qna-contents-header-msg{
    margin-right: 2%;
}

.answer-btn {
    border: 0;
    background-color: #f8f8f8;
    cursor: pointer;
    outline: 0;
}

.answer-btn-clicked {
    color: #7c6beb;
}

.qna-answer {
    margin: 2% 2% 2% 5%;
    width: 90%;
    min-height: 150px;
    padding: 2%;
    background-color:#efefef;
    display: none;
}

.qna-answer h4 {
    font-size: 75%;
    color: #7d7e80;
    margin-bottom: 3%;
}

.qna-answer span{
    font-size: 80%;
    color: #7d7e80;
}
</style>