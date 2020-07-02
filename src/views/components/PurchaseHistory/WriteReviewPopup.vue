<!-- Title : windows popup창 구현 -->
<!-- developed by hansol kim -->
<!-- Date : 2020-06-30 -->

<template>
<div class="review-write-popup">
    <h1 class="review-write-title">리뷰쓰기</h1>
    <span class="review-write-sub">
        구매 후 리뷰를 작성하시면 
        <span class="point-theme-color">적립금 10원</span>
        을 드립니다.
    </span>
    <hr class="review-write-hr">
    <!-- 상품 정보 box -->
    <div class="productInfo-box">
        <!-- 상품 이미지 -->
        <div v-if="product.imageFileName == null" class="product-image">
            <img src='../../../../public/img/uploadImage/no-image.png'
             width="100px" height="100px" alt="productImage">
        </div>
        <div v-if="product.imageFileName != null" class="product-image"> 
            <img :src="require('../../../../public/img/uploadImage/' + product.imageFileName)" 
            width="100px" height="100px" alt="image"/>
        </div>
        
        <div class="productInfo">
            <!-- 상품 이름 -->
            <strong class="productInfo-name">{{ product.name }}</strong>
        </div>
        <div class="productInfo">
            <!-- 상품 설명 -->
            <strong class="productInfo-description">{{ product.description }}</strong>
        </div>
    </div>

    <hr class="review-write-hr">

    <!-- 상품 평가하기 -->
    <h1 class="review-write-subtitle">상품 평가하기</h1>
    <div class="review-rating-box">
        <strong class="productInfo-name">상품 만족도</strong>
        <div class="star-box">
            <span class="star star_left"></span>
            <span class="star star_right"></span>

            <span class="star star_left"></span>
            <span class="star star_right"></span>

            <span class="star star_left"></span>
            <span class="star star_right"></span>

            <span class="star star_left"></span>
            <span class="star star_right"></span>

            <span class="star star_left"></span>
            <span class="star star_right"></span>
            <span class="review-rating-text">선택해주세요</span>
        </div>
    </div>

    <!-- 리뷰 작성하기 -->
    <h1 class="review-write-subtitle">리뷰 작성하기</h1>
    <span class="textCnt">{{ textCount }}/500</span>
    <div class="review-write-textarea">
        <textarea v-model="reviewContents" id="reviewContents" name="reviewContents" maxlength="500" 
        placeholder="리뷰는 최소 10자 이상 입력해 주세요."></textarea>
        <div class="review-textarea-placeholder">
            <span class="review-textarea-placeholder-text"></span>
        </div>
    </div>

    <div class="review-write-btn">
        <button type="button" role="cancel" class="btn-review-cancel" @click="closePopup()">취소</button>
        <button type="button" role="register" class="btn-review-register" @click="registerReview()">등록</button>
    </div>
</div>
</template>
<script>
import axios from "axios"

export default {
    data() {
        return {
            loading: true, 
            product: [
                {id: null},
                {name: null},
                {price: null},
                {manufacturer: null},
                {stock: null},
                {category: null},
                {description: null},
                {imageFileName: null},
            ],
            rating: 4.0,
            reviewContents: "",
        }
    },
    computed: {
        textCount: function() {
            return this.reviewContents.length
        },
    },
    created() {
        this.getProduct()
    },
    watch: {
        '$route': 'getProduct'
    },
    methods: {
        closePopup() {
            window.close();
        },
        // 상품 정보요청(세부정보)
        getProduct() {
            axios
            .get("http://localhost:9306/products/"+this.$route.query.productId)
            .then(response => {
                this.loading = false
                this.product = response.data
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },
        // 리뷰 등록요청
        registerReview() {
            if(this.textCount < 10) {
                alert("최소 10자 이상 입력해주세요. ")
                return
            } 

            let token = localStorage.getItem("accessToken")

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const bodyParameters = {
                rating: this.rating,
                description: this.reviewContents
            };

            axios
            .post("http://localhost:9306/products/"+this.$route.query.productId+"/reviews", bodyParameters, config)
            .then(response => {
                alert("리뷰 등록이 완료되었습니다")
                window.close();
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },
        // $(".star").on('click',function(){
        // var idx = $(this).index();
        // $(".star").removeClass("on");
        //     for(var i=0; i<=idx; i++){
        //         $(".star").eq(i).addClass("on");
        // }
    }
}
</script>
<style scoped>
.review-write-popup {
    padding: 5%;
}

.review-write-title {
    font-size: 150%;
    font-weight: bold;
}

.review-write-sub {
    font-size: 90%;
}

.point-theme-color {
    color: #6A5ACD;
    font-weight: 900;
}

.review-write-hr {
    margin-top: 3%;
    margin-bottom: 3%;
}

.productInfo-name {
    font-size: 100%;
    font-weight: bolder;
    color:black;
}

.productInfo-description{
    font-size: 80%;
    color:#b8bfc8;
}

.review-write-subtitle {
    font-size: 110%;
    font-weight: bold;
    margin-top: 5%;
    display: inline-block;
}

.review-rating-box {
    border: 1px solid #b8bfc8;
    padding: 5%;
}

.review-rating-text {
    margin: 3%;
    font-size: 80%;
}

.textCnt {
    margin-left: 2%;
}

.review-write-textarea textarea {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid #b8bfc8;
    padding: 3%;
    resize: none;
    position: relative;
}

.review-write-btn {
    margin: 5%;
    text-align: center;
}

.btn-review-cancel {
  background-color: white;
  border: 1px solid #6A5ACD;
  color: #6A5ACD;
  padding: 12px 40px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 1%;
  cursor: pointer;
}

.btn-review-register {
  background-color: #6A5ACD;
  border: none;
  color: #FFF;
  padding: 12px 40px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 1%;
  cursor: pointer;
}

.product-image {
    float: left;
    margin-right: 2%;
}

.productInfo-box {
    height: 100px;
}

.star{
  display:inline-block;
  width: 30px;
  height: 60px;
  cursor: pointer;
}
.star_left{
  background: url(http://gahyun.wooga.kr/main/img/testImg/star.png) no-repeat 0 0; 
  background-size: 60px; 
  margin-right: -3px;
}
.star_right{
  background: url(http://gahyun.wooga.kr/main/img/testImg/star.png) no-repeat -30px 0; 
  background-size: 60px; 
  margin-left: -3px;
}
.star.on{
  background-image: url(http://gahyun.wooga.kr/main/img/testImg/star_on.png);
}
</style>