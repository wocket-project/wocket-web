<template>    
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <div class="container" v-if="loading">
                로딩중...
            </div>
            <div class="container" v-if="!loading">
                <h1>주문완료</h1>
                <hr class="main-hr">
                <div class="contents">
                    <h2 class="purchase-success-message">구매가 정상적으로 완료되었습니다.</h2>
                    <div class="purchase-info">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td class="purchase-id" rowspan="3" style="border-right: 2px solid #DDD;">주문번호<br>{{ purchaseInfo.id }}</td>
                                    <td class="purchase-payAmount-tr">총 결제금액 <dt class="purchase-payAmount">{{ purchaseInfo.payAmount | currency }}원</dt></td>
                                </tr>
                                <tr>
                                    <td>총 상품금액 <dt class="purchase-totalPrice">{{ purchaseInfo.totalPrice | currency }}원</dt></td>
                                </tr>
                                <tr>
                                    <td>위드어스 적립금 사용 <dt class="purchase-usingPoint">{{ purchaseInfo.usingPoint | currency }}원</dt></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr>
                <div>
                    <gotoShoppingBtn></gotoShoppingBtn>
                    <GotoPurchaseHistoryBtn></GotoPurchaseHistoryBtn>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import router from "../router"
import axios from "axios"
import GotoShoppingBtn from "../views/components/MyCart/GotoShoppingButton"
import GotoPurchaseHistoryBtn from "../views/components/PaySuccess/GotoPurchaseHistoryBtn"
import { mapState } from 'vuex'
import Vue from "vue"


// Vue.component('cartDeleteAllBtn', {
//     props: ['propsdata'],

// })

export default {
    components: {
        GotoShoppingBtn,
        GotoPurchaseHistoryBtn,
    },
    data() {
        return {
            purchaseInfo:{
                id: null,
                totalPrice: null,
                usingPoint: null,
                payAmount: null
            },
            loading: true,
        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    created () {
        this.getPaymentInfo()
    },
    watch: {
        '$route': 'getPaymentInfo'
    },
    // mounted() {
    //     this.getCartItems();
    // },
    computed: {
        ...mapState(["userInfo"]),
    },
    methods: {
        gotoAddProduct() { // 상품 추가페이지로 이동
            router.push({ name: "addProduct", })
        },

        // 결제 완료 정보요청
        getPaymentInfo() {

            let token = localStorage.getItem("accessToken")

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
            .get("http://localhost:9306/purchase/"+this.$route.params.purchaseId, config)
            .then(response => {
                console.log(response.data)
                this.loading = false
                this.purchaseInfo.id = response.data.id
                this.purchaseInfo.totalPrice = response.data.totalPrice
                this.purchaseInfo.usingPoint = response.data.usingPoint
                this.purchaseInfo.payAmount = response.data.payAmount
            })
            .catch(error => {
                alert("잘못된 접근 경로입니다.")
                router.push({ name: "home" })
                console.log(error)
            })
        },
    }    
}
</script>
<style>

.purchase-id {
    text-align: center;
    vertical-align: middle;
    background: #EFEFEF;
    font-weight: bold;
    font-size: 120%;
}

.purchase-payAmount {
    font-weight: bold;
    color: #6A5ACD;
}

.purchase-payAmount-tr {
    font-weight: bold;
    font-size: 200%;
    background: #DDD;
}

.purchase-totalPrice {
    font-weight: bold;
    font-size: 120%;
}

.purchase-usingPoint {
    font-weight: bold;
    font-size: 120%;
}

.purchase-info {
    margin-top: 5%;
    margin-bottom: 5%
}

dt {
    float: right;
}

.main-hr {    
    border-top: 2px solid #6A5ACD;
}

.purchase-success-message {
    text-align: center;
}

</style>
