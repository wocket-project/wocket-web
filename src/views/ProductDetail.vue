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
                        <img :src="require('../../public/img/uploadImage/' + product.imageFileName)"  alt="image" style="width:400px"/>
                    </div>
                    <div class="col-md-6">
                        <h3>{{product.name}}</h3>
                        <p>가격 : {{ product.price | currency}}원</p>
                        <p>제조사 : {{product.manufacturer}}</p>
                        <p>재고 : {{product.stock}}</p>
                        <p>카테고리 : {{product.category}}</p>
                        <p>상품설명 : {{product.description}}</p>   
                    </div>
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
            product: [
                {name: null},
                {price: null},
                {manufacturer: null},
                {stock: null},
                {category: null},
                {description: null},
                {imageFileName: null},
            ]
        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
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
            .get("http://localhost:8080/products/"+this.$route.params.id)
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
