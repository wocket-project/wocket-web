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
                <h4>모든 상품</h4>
                <br>
                <table class="table table-striped table-hover productTbl">
                <thead>
                  <tr>
                    <th scope="col">Thumb</th>                    
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Manufacturer</th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">                    
                    <td v-if="product.imageFileName != null" scope="row">
                        <a @click="gotoProduct(product)">
                        <img :src="require('../../public/img/uploadImage/' + product.imageFileName)" alt="productImage" width="100px">
                        </a>
                    </td>
                    <td v-if="product.imageFileName == null" scope="row">이미지 준비 중</td>
                    <td><a @click="gotoProduct(product)">{{ product.name }}</a></td>
                    <td>￦{{ product.price | currency}}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.manufacturer }}</td>
                  </tr>                  
                </tbody>
              </table>
              <div>
                <button type="button" class="btn btn-primary" @click="gotoAddProduct()">Add Product</button>
              </div>
            </div>            
        </section>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router"
import VLazyImage from "v-lazy-image"

export default {
    components: {
        VLazyImage
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
            .get("http://localhost:8080/products")
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
        // getImageUrl(image) {
        //     var image = require.context('../../public/img/uploadImage/' + false, /\.png$/)
        //     return image('./' + image + ".png")
        // }
    }    
}
</script>
<style>
.productTbl tr {
    cursor: pointer;
}
</style>
