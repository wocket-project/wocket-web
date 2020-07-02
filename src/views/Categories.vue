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
        <h3 class="page-header">{{ categoryName }}</h3>
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
            categories: [
                { id:1, name:"패션·뷰티" },
                { id:2, name:"식품·생활" },
                { id:3, name:"가전·디지털" },
                { id:4, name:"도서·취미" },
                { id:5, name:"스포츠·자동차" },
            ]
        }
    },
    computed: {
        categoryName: function() {
            for(var idx=0; idx<this.categories.length; idx++) {
                if(this.$route.params.id === this.categories[idx].id) {
                    return this.categories[idx].name
                }
            }

            alert('잘못된 요청입니다.')
            router.push({ name: "home"})
        },
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    created () {
        this.getProductsByCategoryId()
    },
    watch: {
        '$route': 'getProductsByCategoryId'
    },
    methods: {
        // 상품 정보요청(All)
        getProductsByCategoryId() {
            axios
            .get("http://localhost:9306/products/categories/" + this.$route.params.id)
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
</style>
