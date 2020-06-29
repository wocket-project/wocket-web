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
        <div class="review-rating-star">
            <span v-if="ratingAvr < 0.3" class="fa fa-star-o"></span>
            <span v-if="ratingAvr >= 0.3 && ratingAvr < 0.8" class="fa fa-star-half-o checked"></span>
            <span  v-if="ratingAvr >= 0.8" class="fa fa-star checked"></span>
            <span v-if="ratingAvr < 0.3" class="fa fa-star-o"></span>
            <span v-if="ratingAvr >= 1.3 && ratingAvr < 1.8" class="fa fa-star-half-o checked"></span>
            <span  v-if="ratingAvr >= 1.8" class="fa fa-star checked"></span>
            <span v-if="ratingAvr < 0.3" class="fa fa-star-o"></span>
            <span v-if="ratingAvr >= 2.3 && ratingAvr < 2.8" class="fa fa-star-half-o checked"></span>
            <span  v-if="ratingAvr >= 2.8" class="fa fa-star checked"></span>
            <span v-if="ratingAvr < 3.3" class="fa fa-star-o"></span>
            <span v-if="ratingAvr >= 3.3 && ratingAvr < 3.8" class="fa fa-star-half-o checked"></span>
            <span  v-if="ratingAvr >= 3.8" class="fa fa-star checked"></span>
            <span v-if="ratingAvr < 4.3" class="fa fa-star-o"></span>
            <span v-if="ratingAvr >= 4.3 && ratingAvr < 4.8" class="fa fa-star-half-o checked"></span>
            <span  v-if="ratingAvr >= 4.8" class="fa fa-star checked"></span>
        </div>
    </div>
    <div v-for="review in reviews" :key="review.id" class="review-list">
        <div class="review-list-box">
            <div class="review-contents-header">
                 <div class="review-contents-header-msg">{{ productName }}</div>
                 <div class="review-contents-rating-star">
                    <span v-if="review.rating < 0.3" class="fa fa-star-o"></span>
                    <span v-if="review.rating >= 0.3 && review.rating < 0.8" class="fa fa-star-half-o checked"></span>
                    <span  v-if="review.rating >= 0.8" class="fa fa-star checked"></span>
                    <span v-if="review.rating < 0.3" class="fa fa-star-o"></span>
                    <span v-if="review.rating >= 1.3 && review.rating < 1.8" class="fa fa-star-half-o checked"></span>
                    <span  v-if="review.rating >= 1.8" class="fa fa-star checked"></span>
                    <span v-if="review.rating < 0.3" class="fa fa-star-o"></span>
                    <span v-if="review.rating >= 2.3 && review.rating < 2.8" class="fa fa-star-half-o checked"></span>
                    <span  v-if="review.rating >= 2.8" class="fa fa-star checked"></span>
                    <span v-if="review.rating < 3.3" class="fa fa-star-o"></span>
                    <span v-if="review.rating >= 3.3 && review.rating < 3.8" class="fa fa-star-half-o checked"></span>
                    <span  v-if="review.rating >= 3.8" class="fa fa-star checked"></span>
                    <span v-if="review.rating < 4.3" class="fa fa-star-o"></span>
                    <span v-if="review.rating >= 4.3 && review.rating < 4.8" class="fa fa-star-half-o checked"></span>
                    <span  v-if="review.rating >= 4.8" class="fa fa-star checked"></span>
                </div> 
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
    props: ['productName'],
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
           var sum = 0
           var avr = 0

          for(var i=0; i<this.reviews.length; i++) {
              sum += this.reviews[i].rating
          }
          if(sum == 0) {
              return 0
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
        },
        // addStarRatingAvr() {

        //     var node = document.getElementById("review-rating-star");
        //     console.log(this.ratingAvr)

        //     for(var idx=0; idx<5; idx++) {
        //         console.log(idx)
        //         if(this.ratingAvr < idx+0.3) { // 비어있는 star
        //             node.innerHTML += "<span class='fa fa-star-o'></span>"
        //         } else if(this.ratingAvr >= idx+0.3 && this.ratingAvr < idx+0.8) { // 반쪽짜리 star
        //             node.innerHTML += "<span class='fa fa-star-half-o'></span>"
        //         } else if(this.ratingAvr >= idx+0.8) { // 꽉 찬 star
        //             node.innerHTML += "<span class='fa fa-star-checked'></span>"
        //         }
        //     }
        // }
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
    padding: 3%;
    border: 1px solid #CCC;
}

@media screen and (max-width: 992px) {
    .review-rating {
        width: 100%;
        text-align: center;
        margin-top: 12%;
        margin-left: 1%;
        padding: 2%;
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

.review-contents-rating-star .fa {
    font-size: 15px;
}

.review-contents-header-msg{
    float: left;
    margin-right: 2%;
}
.fa {
  font-size: 50px;
  color: #6A5ACD;
}

.checked {
  color: #6A5ACD;
}
</style>