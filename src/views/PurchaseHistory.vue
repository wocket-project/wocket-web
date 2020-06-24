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
                <h1>구매내역</h1>
                <hr class="main-hr">
                <div class="contents">
                    <div class="purchase-info">
                        <table class="table">
                            <thead class="purchase-history-tbl-head">
                            <tr align="center">
                                <th colspan= "2" scope="col">구매내역</th>
                                <th scope="col" style="width:15%">배송상태</th>
                                <th scope="col" style="width:15%;">리뷰관리</th>
                            </tr>
                            </thead>
                            <tbody v-if="purchaseHistory.length === 0" align="center">
                                <tr align="center">
                                    <td colspan="4" style="font-weight:bold;">구매내역이 없습니다.</td>
                                </tr>
                            </tbody>
                            <tbody v-for="purchaseInfo in purchaseHistory" :key="purchaseInfo.id">  
                                <tr>
                                    <td rowspan="2" style="border-right: 1px solid #DDD; width:20%; background-color:#EEE">
                                        <!-- 주문 시간 -->
                                        <div class="info-header-value">{{purchaseInfo.dateTime}}</div>
                                        <!-- 주문 번호 -->
                                        <div class="info-header-key">주문번호</div><div class="info-header-value">{{purchaseInfo.id}}</div>
                                    <hr class="info-header-hr">
                                        <!-- 총 주문금액 -->
                                        <div class="info-header-key">총 주문금액</div>
                                        <div class="info-header-payAmount">{{purchaseInfo.payAmount | currency}}원</div>
                                        <!-- 적립금 사용 -->
                                        <div class="info-header-key">적립금 사용</div>
                                        <div class="info-header-value">{{purchaseInfo.usingPoint | currency}}원</div>
                                    </td>
                                    <td>
                                        <!-- 상품 이미지 -->
                                        <div v-if="purchaseInfo.purchaseItems[0].product.imageFileName == null" class="product-image">
                                            <!-- 이미지가 없는 경우 default이미지 사용-->
                                            <img src='../../public/img/uploadImage/no-image.png' alt="productImage" width="150px" height="150px">                                            
                                        </div>
                                        <div v-if="purchaseInfo.purchaseItems[0].product.imageFileName != null" class="product-image">
                                            <a @click="gotoProduct(purchaseInfo.purchaseItems[0].product)" style="cursor: pointer;">
                                                <img :src="require('../../public/img/uploadImage/' + purchaseInfo.purchaseItems[0].product.imageFileName)" alt="productImage" width="150px" height="150px">
                                            </a>
                                        </div>

                                        <!-- 상품 이름 (여러 개인 경우)-->
                                        <div class="product-contents" v-if="purchaseInfo.purchaseItems.length > 1">
                                            {{purchaseInfo.purchaseItems[0].product.name}} 외 {{purchaseInfo.purchaseItems.length - 1}}개 상품
                                        </div>

                                        <!-- 상품 이름 (단일 상품인 경우)-->
                                        <div class="product-contents" v-if="purchaseInfo.purchaseItems.length == 1">
                                            {{purchaseInfo.purchaseItems[0].product.name}}
                                        </div>

                                        <!-- 상품 가격 -->
                                        <div class="product-contents">
                                            {{purchaseInfo.payAmount | currency}}원
                                        </div>
                                    </td>
                                    <td style="border: 1px solid #DDD; text-align:center;">배송중</td>
                                    <td style="text-align:center;">리뷰쓰기</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="customer-info">사용자 정보 : {{userInfo.name}} ({{userInfo.phone}})</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
            purchaseHistory: [],
            loading: null,

        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    created () {
        this.getPurchaseHistory()
    },
    watch: {
        '$route': 'getPurchaseHistory'
    },
    computed: {
        ...mapState(["userInfo"]),
    },
    methods: {

        // 구매내역 정보요청
        getPurchaseHistory() {

            let token = localStorage.getItem("accessToken")

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
            .get("http://localhost:9306/purchase/history", config)
            .then(response => {
                console.log(response.data)
                this.loading = false
                this.purchaseHistory = response.data
            })
            .catch(error => {
                alert("잘못된 접근 경로입니다.")
                router.push({ name: "home" })
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

.purchase-history-tbl-head {
    background: #999;
    color:white;
    font-weight: bold;
}

.info-header-hr {
    margin: 5%;
}

.info-header-key {
    margin: 3%;
    font-size: 85%;
    text-align: center;
}

.info-header-value {
    margin: 3%;
    font-size: 90%;
    font-weight: bold;
    text-align: center;
}

.info-header-payAmount {
    margin: 3%;
    font-size: 110%;
    font-weight: bold;
    color:  #6A5ACD;
    text-align: center;
}

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

.product-image {
    float: left;
    margin-right: 2%;
}

.product-contents {
    font-size: 120%;
    margin-left: 10%;
}

.customer-info {
    font-size:80%;
    height: 20%;
    background-color:#EEE;
}

</style>