<template>
<div class="review">
    <!-- 상품리뷰 및 개수 표기 -->
    <div class="review-header">
        <h4>상품리뷰( <strong>{{ reviews.length }}</strong> )</h4>
    </div>
    <div class="review-header-message">
        <p>* 리뷰작성 완료 시<strong> 10포인트가 지급</strong>됩니다.</p>
        <button type="button" class="write-review" @click="writeReview()">리뷰 작성하기 ></button>
    </div>
    <div class="review-rating">
        <h1>평점 : {{ ratingAvr }}점</h1>
    </div>
    <div v-for="review in reviews" :key="review.id" class="review-list">
        <div class="review-list-box">
            <div class="review-contents-header">
                 평점 : {{ review.rating }}점
            </div>
            <div class="review-contents">
                {{ review.description }}
            </div>
            <div class="review-contents-footer">
                {{ review.writer }} | {{ review.creationDate }} | 신고
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
    data() {
        return {
            loading: true, 
            reviews: []
        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    computed: {
        ratingAvr: function() {
           var sum = 0;
           var avr = 0;
          for(var i=0; i<this.reviews.length; i++) {
              sum += this.reviews[i].rating
          }
          avr = sum/this.reviews.length
          return avr
      },
    },
    created () {
        this.getReviews()
    },
    watch: {
        '$route': 'getReviews'
    },
    methods: {
        // 상품 리뷰정보 요청
        getReviews() {
            axios
            .get("http://localhost:9306/products/"+this.$route.params.id+"/reviews")
            .then(response => {
                this.loading = false
                this.reviews = response.data
                this.$emit('getReviewCnt', this.reviews.length)
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },
        writeReview() {
            router.push({ name: "PurchaseHistory"})
        }
    }    
}
</script>

<style scoped>
.review {
    width: 100%;
    height: 50px;
}

.review-header h4{
    font-weight: bold;
    font-size: 100%;
}

.review-header strong{
    color: #7c6beb;
    font-size: 120%;
}

.review-header-message p{
    font-size: 90%;
    float: left;
}

.review-header-message strong{
    font-size: 100%;
    color: #7c6beb;
    font-weight: bold;
}

.review-rating {
    width: 100%;
    text-align: center;
    margin-top: 7%;
    margin-left: 1%;
    padding: 5%;
    border: 1px solid #CCC;
}

@media screen and (max-width: 992px) {
    .review-rating {
        width: 100%;
        text-align: center;
        margin-top: 12%;
        margin-left: 1%;
        padding: 5%;
        border: 1px solid #CCC;
    }
}


.write-review {
    float: right;
    background-color: #AAA;
    border: 1px solid #AAA;
    color: white;
    padding: 6px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 12px 4px;
    cursor: pointer;
}

.review-list {
    margin: 2%;
}

.review-contents-header {
    margin-top: 2%;
    margin-bottom: 3%;
    color: #CCC;
    font-size: 85%;
}

.review-contents{
    min-height: 120px;
}

.review-contents-footer {
    font-size: 90%;
}
</style>