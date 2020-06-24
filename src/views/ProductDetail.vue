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
                    <div class="col-md-6">                        
                    </div>
                    <div class="col-md-6 order-btn">
                    </div>
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

export default {
    components: {
        CartButton,
        PurchaseButton,
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
    }    
}
</script>
<style>
</style>
