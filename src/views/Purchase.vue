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
                <form>
                    <!-- 배송지 정보 -->
                    <h5>배송지 정보</h5> <!-- 이름, 연락처, 주소정보 요구 -->
                    <hr class="divide">
                    <div>                    
                        <label for="checkName" class="col-sm-2">이름</label>
                        <span class="col-sm-4">김한솔</span>
                    </div>                    
                    <div>                    
                        <label for="checkName" class="col-sm-2">연락처</label>
                        <span class="col-sm-4">010-3920-7847</span>
                    </div> 
                     <div>                    
                        <label for="checkName" class="col-sm-2">주소</label>
                        <span class="col-sm-4">(14027) 경기도 안양시 만안구 삼덕로 63번길 32, 606동 1103호</span>
                    </div>                    
                    <div>
                        <label for="checkName" class="col-sm-2">배송 메모</label>
                        <select @change="onChangeShippingMemo($event)" class="col-sm-6" v-model="memo" required>
                            <option value="0" hidden> 배송메모를 선택해주세요.</option>
                            <option value="1">배송 전 연락바랍니다.</option>
                            <option value="2">경비실에 맡겨주세요.</option>
                            <option value="3">집앞에 놔주세요.</option>
                            <option value="4">택배함에 놔주세요.</option>
                            <option value="5">부재시 핸드폰으로 연락주세요.</option>
                            <option value="6">부재시 경비실에 맡겨주세요.</option>
                            <option value="7">부재시 집 앞에 놔주세요.</option>
                            <option value="8">직접입력</option>
                        </select>
                        <br>
                    </div>
                    <div v-if="isDirectMemo">
                        <label for="checkName" class="col-sm-2"></label>
                        <textarea  class="col-sm-6" id="directMemo" rows="3">                            
                        </textarea>  
                    </div>  
                <br><br><br>
                
                <!-- 위드포인트 사용 / 적립혜택 -->
                <h5>위드포인트 사용 / 적립혜택</h5> 
                    <hr class="divide">
                    <div>                    
                        <label for="checkName" class="col-sm-2">이름</label>
                        <span class="col-sm-4">김한솔</span>
                    </div>                    
                    <div>                    
                        <label for="checkName" class="col-sm-2">연락처</label>
                        <span class="col-sm-4">010-3920-7847</span>
                    </div> 
                     <div>                    
                        <label for="checkName" class="col-sm-2">주소</label>
                        <span class="col-sm-4">(14027) 경기도 안양시 만안구 삼덕로 63번길 32, 606동 1103호</span>
                    </div>                    
                    <div>
                        <label for="checkName" class="col-sm-2">배송 메모</label>
                        <select @change="onChangeShippingMemo($event)" class="col-sm-6" v-model="memo" required>
                            <option value="0" hidden> 배송메모를 선택해주세요.</option>
                            <option value="1">배송 전 연락바랍니다.</option>
                            <option value="2">경비실에 맡겨주세요.</option>
                            <option value="3">집앞에 놔주세요.</option>
                            <option value="4">택배함에 놔주세요.</option>
                            <option value="5">부재시 핸드폰으로 연락주세요.</option>
                            <option value="6">부재시 경비실에 맡겨주세요.</option>
                            <option value="7">부재시 집 앞에 놔주세요.</option>
                            <option value="8">직접입력</option>
                        </select>
                        <br>
                    </div>
                    <div v-if="isDirectMemo">
                        <label for="checkName" class="col-sm-2"></label>
                        <textarea  class="col-sm-6" id="directMemo" rows="3">                            
                        </textarea>  
                    </div>  
                                     
                <br><br><br>
                <h5>주문상품 정보</h5> <!-- 상품정보 -->                    
                <table class="table table-hover productTbl">
                <thead>
                  <tr align="center">                   
                    <th colspan= "2" scope="col">상품정보</th>
                    <th scope="col">상품금액</th>
                    <th scope="col">할인금액</th>
                    <th scope="col">배송비</th>
                    <th scope="col">수량</th>
                    <th scope="col">주문금액</th>
                  </tr>
                </thead>
                <tbody v-if="from === 'cart'"> 
                  <tr v-for="product in products" :key="product.id" align="center">                    
                    <td v-if="product.imageFileName != null" scope="row">
                        <a @click="gotoProduct(product)">
                        <img :src="require('../../public/img/uploadImage/' + product.imageFileName)" alt="productImage" width="100px">
                        </a>
                    </td>
                    <td v-if="product.imageFileName == null" scope="row">이미지 준비 중</td>
                    <td><a @click="gotoProduct(product)">{{ product.name }}</a></td>
                    <td>￦{{ product.price | currency}}</td>
                    <td>0원</td>
                    <td>무료배송</td>
                    <td> {{ product.quantity }} </td>
                    <td>￦{{ product.price | currency}}</td>
                  </tr>
             
                </tbody>
                <tbody v-if="from === 'direct'">
                    <tr align="center">                    
                    <td v-if="directPurchaseProduct.imageFileName != null" scope="row">
                        <a @click="gotoProduct(directPurchaseProduct)">
                        <img :src="require('../../public/img/uploadImage/' + directPurchaseProduct.imageFileName)" alt="productImage" width="100px">
                        </a>
                    </td>
                    <td v-if="directPurchaseProduct.imageFileName == null" scope="row">이미지 준비 중</td>
                    <td><a @click="gotoProduct(directPurchaseProduct)">{{ directPurchaseProduct.name }}</a></td>
                    <td>￦{{ directPurchaseProduct.price | currency}}</td>
                    <td>0원</td>
                    <td>무료배송</td>
                    <td> {{ directPurchaseProduct.quantity }} </td>
                    <td>￦{{ directPurchaseProduct.price | currency}}</td>
                  </tr>
                </tbody>
              </table>
                </form>
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
            directPurchaseProduct: {
                id: null,
                name: null,
                price: null,
                quantity: 1,
                imageFileName: null,
                price: null,
            },
            products: [
                {id: null},
                {name: null},
                {price: null},
                {manufacturer: null},
                {stock: null},
                {category: null},
                {description: null},
                {imageFileName: null},
                {quantity: 1},                
            ],
            from: this.$route.query.from,
            memo: 0,
            isDirectMemo: false,
            directMemo: "",
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
        onChangeShippingMemo(event) {
            if(event.target.value == 8) { // 직접입력하는 경우
                this.isDirectMemo = true
            } else {
                this.isDirectMemo = false
            }
        },
        gotoProduct(item) { // 상품 세부페이지로 이동            
            router.push({ name: "productDetail", params: {id : item.id}})
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
label {
    font-weight: bold;
}

hr.divide {
    border: 1px solid;
    margin: 3px;
}
</style>
