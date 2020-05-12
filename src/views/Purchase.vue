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
                {{ from }}
                {{ product.id }}
                {{ product.name }}
                {{ product.price }}
            </div>            
        </section>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router"
import VLazyImage from "v-lazy-image"
import CartDeleteAllBtn from "../views/components/MyCart/CartItemAllDeleteButton"
import GrandTotalPrice from "../views/components/MyCart/GrandTotalPrice"
import GotoShoppingBtn from "../views/components/MyCart/GotoShoppingButton"
import PurchaseBtn from "../views/components/MyCart/PurchaseButton"


// Vue.component('cartDeleteAllBtn', {
//     props: ['propsdata'],

// })

export default {
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
            from: this.$route.query.from
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
            .get("http://localhost:9306/products/"+this.$route.query.id)
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
.productTbl tr td{
    cursor: pointer;
    margin:auto; 
    text-align:center;    
}
.price {
    font-size: 24px;
    text-align: right;
    font-weight: bold;
}

dt {
    float: left;
    margin-left:55%;
}

.withPoint {
    float: left;
    margin-left:70%;
}

.deliveryCharge{
    float: left;
    margin-left:75%;
}

.payment-header {
    float:left;
    margin-right:55%;
}

.payment h1{
    color: #6A5ACD;
    font-weight: bold;
}
</style>
