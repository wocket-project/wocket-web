<template>
    <div>
    <div class="recommend-container" v-if="loading">
        <div class="loader"></div>
    </div> 
    <div class="recommend-container" v-if="!loading">
      <h3 class="recommend-header">오늘의 추천 상품</h3>
      <div class="recommend-product-list">
        <ul class="item-list">
        <li class="item" v-for="product in products" :key="product.id">
            <a @click="gotoProduct(product)">
                <div class="recommend-border">                    
                    <!-- product thumb -->
                    <div class="thumb">                        
                        <td v-if="product.imageFileName != null" scope="row">
                            <badge class="badge" type="danger">NEW</badge>
                            <img :src="require('../../../public/img/uploadImage/' + product.imageFileName)" 
                            alt="productImage" width="100%" height="300px">
                        </td>
                        <td v-if="product.imageFileName == null" scope="row">
                            <badge class="badge" type="danger">NEW</badge>
                            <img src='../../../public/img/uploadImage/no-image.png' 
                            alt="productImage" width="100%" height="300px">
                        </td>
                    </div>
                    <!-- product description-->
                    <div class="recommend-product-description">
                        <span>{{ product.description }}</span>
                    </div>
                    <!-- product name-->
                    <div class="recommend-product-name">
                        <span>{{ product.name }}</span>
                    </div>
                    <!-- product price-->
                    <div class="recommend-product-price">
                        <span>{{ product.price | currency }}원</span>
                    </div>
                    <hr class="recommend-hr">
                    <!-- product review -->
                    <div class="recommend-product-review">
                        <span v-if="product.rating < 0.3" class="fa fa-star-o"></span>
                        <span v-if="product.rating >= 0.3 && product.rating < 0.8" class="fa fa-star-half-o checked"></span>
                        <span  v-if="product.rating >= 0.8" class="fa fa-star checked"></span>
                        <span v-if="product.rating < 0.3" class="fa fa-star-o"></span>
                        <span v-if="product.rating >= 1.3 && product.rating < 1.8" class="fa fa-star-half-o checked"></span>
                        <span  v-if="product.rating >= 1.8" class="fa fa-star checked"></span>
                        <span v-if="product.rating < 0.3" class="fa fa-star-o"></span>
                        <span v-if="product.rating >= 2.3 && product.rating < 2.8" class="fa fa-star-half-o checked"></span>
                        <span  v-if="product.rating >= 2.8" class="fa fa-star checked"></span>
                        <span v-if="product.rating < 3.3" class="fa fa-star-o"></span>
                        <span v-if="product.rating >= 3.3 && product.rating < 3.8" class="fa fa-star-half-o checked"></span>
                        <span  v-if="product.rating >= 3.8" class="fa fa-star checked"></span>
                        <span v-if="product.rating < 4.3" class="fa fa-star-o"></span>
                        <span v-if="product.rating >= 4.3 && product.rating < 4.8" class="fa fa-star-half-o checked"></span>
                        <span  v-if="product.rating >= 4.8" class="fa fa-star checked"></span>
                        | ({{product.reviewCount}})
                    </div>
                </div>
            </a>
        </li>
        </ul>
      </div>
    </div>
    </div>
</template>
<script>
import axios from "axios"
import router from "../../router"

export default {
    components: {
    },
    data() {
        return {
            loading: true,
            products: [],
        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    created () {
        this.getProducts()
    },
    watch: {
        '$route': 'products'
    },
    methods: {
        // 상품 정보요청(All)
        getProducts() {            
            axios
            .get("http://localhost:9306/products/recommend")
            .then(response => {
                this.loading = false
                this.products = response.data
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },
        gotoProduct(item) { // 상품 세부페이지로 이동            
            router.push({ name: "productDetail", params: {id : item.id}})
        },
        gotoAddProduct() { // 상품 추가페이지로 이동            
            router.push({ name: "addProduct", })
        },
    }    
}
</script>
<style>

.recommend-header {
  text-align: center;
}

.recommend-container {
  margin-top:3%;
  margin-bottom:3%;
}

.recommend-product-list {
   width: 75%;
   margin-left:11%;
}

.recommend-border {
    position: relative;
    border: 1px solid #e3e5e8;
    background-color: white;
    margin: 5%;
}

.recommend-product-description {
    color: #CCC;
    font-size: 80%;
    margin-left:5%;
    min-height: 45px;
}

.recommend-product-name {
    color: black;
    font-size: 100%;
    margin-left:5%;
    min-height: 50px;
}

.recommend-product-price {
    font-family: "'Noto Sans KR'";
    font-size: 140%;
    font-weight: bold;
    color: #6A5ACD;
    margin:0% 5% 5% 5%;
}

.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #6A5ACD;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1s linear infinite; 
  animation: spin 1s linear infinite;
  margin-left: 50%;
  margin-top: 5%;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.recommend-hr {
    margin: 2% 5% 5% 5%;
}

.recommend-product-review{
    margin-left: 5%;
    margin-bottom:2%;
    color:#CCC;
    font-size: 80%;
    
}

.recommend-product-review .fa{
    font-size: 15px !important;
}

.badge{
    float: left;
    z-index: 0;    
    position: absolute;
    background: none !important;
}
</style>
