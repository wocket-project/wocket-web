<template>    
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <div class="container" v-if="loading">
                <div class="loader"></div>
            </div> 
            <div class="container" v-if="!loading">
                <div class="product-list">
                    <ul class="item-list">
                        <li class="item" v-for="product in products" :key="product.id">
                            <a @click="gotoProduct(product)">
                                <div class="border">
                                    <!-- product thumb -->
                                    <div class="thumb">
                                        <td v-if="product.imageFileName != null" scope="row">
                                            <img :src="require('../../public/img/uploadImage/' + product.imageFileName)" alt="productImage" width="100%" height="220px">
                                        </td>
                                        <td v-if="product.imageFileName == null" scope="row">
                                            <img src='../../public/img/uploadImage/no-image.png' alt="productImage" width="100%" height="220px">
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
        gotoAddProduct() { // 상품 추가페이지로 이동            
            router.push({ name: "addProduct", })
        },
    }    
}
</script>
<style>
.product-list {
    width: 1100px;
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
}

.product-name {
    color: black;
    font-size: 100%;
}

.product-price {
    font-family: "'Noto Sans KR'";
    font-size: 140%;
    font-weight: bold;
    color: #6A5ACD;
}
</style>
