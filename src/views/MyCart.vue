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
                <h4>장바구니 목록</h4>
                <br>
                <div>
                  <cartDeleteAllBtn :cart="cart" v-on:deleteCartAll="getCartItems()"></cartDeleteAllBtn>
                </div>
                <table class="table table-hover productTbl">
                <thead>
                  <tr align="center">                   
                    <th colspan= "2" scope="col">상품정보</th>
                    <th scope="col">상품금액</th>
                    <th scope="col">배송비</th>                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="cart.cartItems.length === 0" align="center">
                      <td colspan="4" style="font-weight:bold;">장바구니에 담긴 상품이 없습니다.</td>
                  </tr>  
                  <tr v-for="cartItem in cart.cartItems" :key="cartItem.id" align="center">                    
                    <td v-if="cartItem.product.imageFileName != null" scope="row">
                        <a @click="gotoProduct(cartItem.product)">
                        <img :src="require('../../public/img/uploadImage/' + cartItem.product.imageFileName)" alt="productImage" width="100px">
                        </a>
                    </td>
                    <td v-if="cartItem.product.imageFileName == null" scope="row">이미지 준비 중</td>
                    <td><a @click="gotoProduct(cartItem.product)">{{ cartItem.product.name }}</a></td>
                    <td>￦{{ cartItem.product.price | currency}}</td>
                    <td>착불배송</td>                    
                  </tr>
             
                </tbody>
              </table>
                <hr>
                  <div class="grandTotalPrice">
                    <h3 style="float:left">총 주문금액</h3>
                    <dl class="price">
                        <dt>총 상품금액</dt>
                        <dd>
                            <span class="productsPrice">{{ cart.grandTotalPrice | currency}}원</span>                
                        </dd>
                        <dt class="withPoint">위드포인트</dt>
                        <dd>
                            <span>-{{ withPoint | currency }}원</span>
                        </dd>
                        <dt class="deliveryCharge">배송비</dt>
                        <dd>
                            <span>{{ deliveryCharge | currency }}원</span>
                        </dd>
                    </dl>
                </div>
              <hr>
               <!-- 결제 예상금액 -->
                <div class="payment">
                    <h1 class="payment-header">결제 예상금액</h1>
                    <h1>{{ paymentCharge | currency}}원</h1>
                </div>
              <hr>
              <div>
                <gotoShoppingBtn></gotoShoppingBtn>
                <purchaseBtn></purchaseBtn>                
              </div>
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
import Vue from "vue"


// Vue.component('cartDeleteAllBtn', {
//     props: ['propsdata'],

// })

export default {
    components: {
        VLazyImage,
        CartDeleteAllBtn,
        GrandTotalPrice,
        GotoShoppingBtn,
        PurchaseBtn
    },
    data() {
        return {
            loading: true,                      
            cart: {
                cartItems: [],
                grandTotalPrice: null,
            },
            withPoint: 0,
            deliveryCharge: 0,
        }
    },
    filters: {
        currency: function (value) {
            var num = new Number(value);
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
        }
    },
    created () {
        this.getCartItems()
    },
    watch: {
        '$route': 'getCartItems'
    },
    mounted() {
        this.getCartItems();
    },
    computed: {
        paymentCharge: function() {
            return this.cart.grandTotalPrice-this.withPoint+this.deliveryCharge
        },        
    },
    methods: {
        // 상품 정보요청(All)
        getCartItems() {

            let token = localStorage.getItem("accessToken")

            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };
          
            const bodyParameters = {
              key: "value"
            };

            axios
            .post("http://localhost:9306/cart", bodyParameters, config)
            .then(response => {
                this.loading = false
                console.log(response.data)
                this.cart = response.data                                       
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
