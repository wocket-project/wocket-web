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
               <h1>{{product.name}}</h1>
               <h3>{{product.price}}</h3>
               <h3>{{product.manufacturer}}</h3>
               <h3>{{product.stock}}</h3>
               <h3>{{product.description}}</h3>            
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
            product: [
                {name: null},
                {price: null},
                {manufacturer: null},
                {stock: null},
                {description: null},
            ]
        }
    },
    created () {
        this.getProduct()
    },
    watch: {
        '$route': 'getProduct'
    },
    methods: {
        // 상품 정보요청(세부정보)
        getProduct() {            
            axios
            .get("http://localhost:8126/products/"+this.$route.params.id)
            .then(response => {
                this.loading = false
                this.product = response.data
            })
            .catch(error => {
                alert('서버 오류')
                console.log(error)
            })
        },
    }    
}
</script>
<style>
</style>
