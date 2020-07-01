<template>
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <div class="container" v-if="loading">
                데이터를 가져오는 중....
            </div> 
            <div class="container" v-if="!loading">
                <div class="row">
                    <div class="col-md-6">
                        <div v-if="product.imageFileName == null" style="border-style: groove; width:400px; height:400px">
                            <img src='../../public/img/uploadImage/no-image.png' alt="productImage" style="width:400px; height:400px;">
                        </div>
                        <div v-if="product.imageFileName != null">
                            <img :src="require('../../public/img/uploadImage/' + product.imageFileName)"  alt="image" style="width:400px"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h3>{{product.name}}</h3>
                        <hr>
                        <p>제조사 : {{product.manufacturer}}</p>
                        <p>재고 : {{product.stock}}</p>
                        <p>카테고리 : {{product.category}}</p>
                        <p>상품설명 : {{product.description}}</p>
                        <hr>
                        <h3>가격 : {{ product.price | currency}}원</h3>
                        <cartButton></cartButton>
                        <purchase-button :product="product"></purchase-button>
                    </div>
                </div>
            `   <div class="tabmenu">
                    <ul>
                        <li id="description" class="btnCon active"><a href="#description">상품설명</a>
                            <!-- 상품 설명란 -->
                            <section class="tabCon">
                                <product-description></product-description>
                            </section>                        
                        </li>
                        <li id="qna-section" class="btnCon"><a href="#qna-section">상품문의</a>
                            <!-- 상품 문의란 -->
                            <section class="tabCon">
                                <product-qna-section></product-qna-section>
                            </section>
                            </li>
                        <li id="review" class="btnCon"><a href="#review">상품리뷰 ({{ reviewCount }})</a>
                            <!-- 상품 문의란 -->
                            <section class="tabCon">
                                <product-review v-on:getReviewCnt="getReviewCount" v-bind:productName="product.name"></product-review>
                            </section>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router"
import CartButton from "../views/components/ProductDetail/CartButton"
import PurchaseButton from "../views/components/ProductDetail/PurchaseButton"
import ProductDescription from "../views/components/ProductDetail/ProductDescription"
import ProductQnaSection from "../views/components/ProductDetail/ProductQnaSection"
import ProductReview from "../views/components/ProductDetail/ProductReview"
import { mapState } from 'vuex'

export default {
    components: {
        CartButton,
        PurchaseButton,
        ProductDescription,
        ProductQnaSection,
        ProductReview,
    },
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
            reviewCount: null,
        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    created() {
        this.getProduct()
    },
    watch: {
        '$route': 'getProduct'
    },
    methods: {
        // 상품 정보요청(세부정보)
        getProduct() {
            axios
            .get("http://localhost:9306/products/"+this.$route.params.id)
            .then(response => {
                this.loading = false
                this.product = response.data
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },

        // defaultLocation() {
        //     location.href = "#description"
        // },
        getReviewCount(count) { // 하위 컴포넌트로 부터 리뷰 갯수 전달받음
            this.reviewCount = count
        }
    }    
}
</script>
<style>

ul{list-style:none;}

.tabmenu{ 
  max-height:100%;
  margin: 0 auto; 
  position:relative;
  min-height: 100vh;
}

.tabmenu ul li{
  display:  inline-block;
  width:33.33%; 
  float:left;  
  text-align:center; 
  background :#c5c5c5;
}

.tabmenu a{
  display:block;
  height:40px;
  text-decoration:none; 
  color: white;
  font-weight: bold;
  padding: 3%;
  border-bottom: 2px solid #6A5ACD;
}

.tabmenu a:hover {
    color: black;
    transition-duration: 2s;
}

.tabCon{
  display:none; 
  text-align:left; 
  padding: 20px;
  position:absolute; 
  left:4%; 
  box-sizing: border-box;
  width: 96%;
  height: 100%;
  overflow-y: scroll;
}


.btnCon:target  {
  background : #6A5ACD;
}

.btnCon:target .tabCon{
  display: block;
}

</style>
