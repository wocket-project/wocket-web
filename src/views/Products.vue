<template>
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">상품번호</th>
                    <th scope="col">제품명</th>
                    <th scope="col">제조사</th>
                    <th scope="col">재고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <td scope="row">{{ product.id }}</td>
                    <td><a @click="gotoProduct(product)">{{ product.name }}</a></td>
                    <td>{{ product.manufacturer }}</td>
                    <td>{{ product.stock }}</td>
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

export default {
    data() {
        return {
            loading: true,                      
            products: [],
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
        }
    }    
}
</script>
<style>
</style>
