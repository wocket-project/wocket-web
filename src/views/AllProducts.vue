<template>    
    <div class="Products-page">        
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>        
        <section class="section section-skew">
        <div class="products-container" v-if="loading">
            <div class="loader"></div>
        </div> 
        <div class="products-container" v-if="!loading">
        <h3 class="page-header">모든 상품</h3>
        <div class="product-list">
            <ul class="item-list">
                <li class="item" v-for="product in products" :key="product.id">
                    <a @click="gotoProduct(product)">
                        <div class="border">
                            <!-- product thumb -->
                            <div class="thumb">
                                <td v-if="product.imageFileName != null" scope="row">
                                    <img v-bind:src="'http://localhost:9002/img/' + product.imageFileName"
                                    alt="productImage" width="100%" height="220px">
                                </td>
                                <td v-if="product.imageFileName == null" scope="row">
                                    <img v-bind:src="'http://localhost:9002/img/no-image.png'"
                                    alt="productImage" width="100%" height="220px">
                                </td>
                            </div>
                            <!-- product description-->
                            <div class="product-description">
                                <span>{{ product.description }}</span>
                            </div>
                            <!-- product name-->
                            <div class="product-name">
                                <span>{{ product.name }}</span>
                            </div>
                            <!-- product price-->
                            <div class="product-price">
                                <span>{{ product.price | currency }}원</span>
                            </div>
                            <hr class="product-hr">
                            <!-- product review -->
                            <div class="product-review">
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
        </section>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router"

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
            .get("http://localhost:9306/products")
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
    }    
}
</script>
<style>
.page-header {
    text-align: center;
}

.products-container {
  margin-top:3%;
  margin-bottom:3%;
}

.product-list {
    margin-left: 14%;
    width: 70%;
}

.border {
    position: relative;
    border: 1px solid #e3e5e8;
    border-top: 0;
    border-bottom: 0;
    padding: 7%;
    background: white;
}

li {
    list-style: none;
}

.item {
    float: left;
    width: 25%;
    cursor: pointer;
}

.thumb {
    text-align: center;
    margin-bottom: 5%;
}

.product-description {
    color: #CCC;
    font-size: 80%;
    min-height: 45px;
}

.product-name {
    color: black;
    font-size: 100%;
    min-height: 50px;
}

.product-price {
    font-family: "'Noto Sans KR'";
    font-size: 140%;
    font-weight: bold;
    color: #6A5ACD;
}

.product-hr {
    margin: 2% 1% 5% 1%;
}

.product-review{
    color:#CCC;
    font-size: 80%;
}

.product-review .fa{
    font-size: 15px !important;
}
</style>
