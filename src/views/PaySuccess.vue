<template>    
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <h1>주문완료</h1>
                <hr class="main-hr">
                <div class="contents">
                    <h2>구매가 정상적으로 완료되었습니다.</h2>
                </div>
                <hr>
                <div>
                    <gotoShoppingBtn></gotoShoppingBtn>                
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import router from "../router"
import axios from "axios"
import GotoShoppingBtn from "../views/components/MyCart/GotoShoppingButton"
import Vue from "vue"


// Vue.component('cartDeleteAllBtn', {
//     props: ['propsdata'],

// })

export default {
    components: {
        GotoShoppingBtn,
    },
    data() {
        return {
            payInfo:{
                payNumber:"", // 주문번호
                payAmount:"", // 결제금액
                userInfo: {
                    name:"", // 주문자 이름
                    phone:"", // 주문자 전화번호
                    address:"", // 배송지 주소
                    detailAddress: "", // 배송지 상세주소
                    zonecode: "", // 배송지 우편번호
                }
            }
        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    // created () {
    //     this.getCartItems()
    // },
    // watch: {
    //     '$route': 'getCartItems'
    // },
    // mounted() {
    //     this.getCartItems();
    // },
    computed: {
    
    },
    methods: {
        gotoAddProduct() { // 상품 추가페이지로 이동            
            router.push({ name: "addProduct", })
        },
        // 결제 완료 정보요청
        getPaymentInfo() {            
            axios
            .get("http://localhost:9306/payment/"+this.$route.query.id)
            .then(response => {
                console.log(response.data)
                this.loading = false
                this.directPurchaseProduct = response.data
                this.directPurchaseProduct.quantity = 1
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

.main-hr {    
    border-top: 2px solid #6A5ACD;
}

.contents {
    text-align: center;
}
</style>
