<template>
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <div class="header-name">
                <span>주문결제</span>                
            </div>
            <div class="container" v-if="loading">
               <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div> 
            <div class="container" v-if="!loading">
                <form>
                    <!-- 배송지 정보 -->
                    <h5>배송지 정보</h5> <!-- 이름, 연락처, 주소정보 요구 -->
                    <hr class="divide">
                    <div>                    
                        <label for="checkName" class="col-sm-2">이름</label>
                        <span class="col-sm-4">{{ userInfo.name }}</span>
                    </div>                    
                    <div>                    
                        <label for="checkName" class="col-sm-2">연락처</label>
                        <span class="col-sm-4">{{ userInfo.phone }}</span>
                    </div> 
                     <div>                    
                        <label for="checkName" class="col-sm-2">주소</label>
                        <span class="col-sm-4">{{ userInfo.address }}</span>
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
                        <label for="usingPoint" class="col-sm-2">위드포인트 사용</label>
                        <input @change="onChangeUsingPoint($event)" type="number" value="0"/>
                    </div>                    
                    <div>                    
                        <label for="savePoint" class="col-sm-2">예정 적립포인트</label>
                        <span class="col-sm-4">{{ savingPoint | currency }}</span>
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
              <hr>
                  <div class="grandTotalPrice">
                    <h3 style="float:left">총 주문금액</h3>
                    <dl class="price">
                        <dt>총 상품금액</dt>
                        <dd>
                            <span class="productsPrice">{{ directPurchaseProduct.price | currency}}원</span>                
                        </dd>
                        <dt class="deliveryCharge">배송비</dt>
                        <dd>
                            <span>{{ 0 | currency }}원</span>
                        </dd>
                        <dt class="withPoint">위드포인트 사용</dt>
                        <dd>
                            <span>-{{ usingPoint | currency }}원</span>
                        </dd>                        
                    </dl>
                </div>
                 <hr>
                 <div class="grandTotalPrice">
                    <h2 style="float:left">총 결제금액</h2>
                    <span class="payAmount">{{ payAmount | currency }}원</span>
                </div>
                </form>                
                <div>
                    <button type="button" class="cancel-btn" @click="cancel()">취소하기</button>
                    <button type="button" class="pay-btn" @click="requestPay()">바로구매</button>
                </div>
            </div>            
        </section>
    </div>
</template>


<!-- iamport.payment.js -->
<script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script>

<script>

import axios from "axios"
import router from "../router"
import { mapState } from 'vuex'
import Vue from "vue"

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
                deliveryCharge: 0,
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
            usingPoint: 0,
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
    computed: {      
      ...mapState(["userInfo"]),
      payAmount: function() {
          return this.directPurchaseProduct.price - this.usingPoint
      },
      savingPoint: function() {
            return this.payAmount/100
      },
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
        onChangeUsingPoint(event) {
            if(event.target.value > this.userInfo.point) { // 현재 가지고 있는 적립금을 초과한 경우                
                event.target.value = this.userInfo.point                
            } 
            this.usingPoint = event.target.value
        },
        gotoProduct(item) { // 상품 세부페이지로 이동            
            router.push({ name: "productDetail", params: {id : item.id}})
        },
        cancel() { // 상품 세부페이지로 이동
            var isCancel = confirm('구매를 취소하시겠습니까?')
            if(isCancel) {
                router.push({ name: "home" })
            }
        },
        requestPay() {
            Vue.IMP().request_pay({
                pg: 'kakaopay',
                pay_method: 'card',
                merchant_uid: 'merchant_' + new Date().getTime(),
                name: '에어팟',
                amount: 100,
                buyer_email: this.userInfo.email,
                buyer_name: this.userInfo.name,
                buyer_tel: this.userInfo.phone,
                buyer_addr: this.userInfo.address,
                buyer_postcode: '123-456' 
                
            }, (result_success) => {
                //성공할 때 실행 될 콜백 함수
                var msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + result_success.imp_uid;
                msg += '상점 거래ID : ' + result_success.merchant_uid;
                msg += '결제 금액 : ' + result_success.paid_amount;
                msg += '카드 승인번호 : ' + result_success.apply_num;
                alert(msg);
            }, (result_failure) => {
                //실패시 실행 될 콜백 함수
                var msg = '결제에 실패하였습니다.';
                msg += '\n\n에러내용 : ' + result_failure.error_msg;
                alert(msg);
            })
        }
    } 
}
</script>
<style>
.header-name {
    text-align: center;
    margin-bottom: 3%;
    font-size: 180%;
    font-weight: bold;
}

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
    margin-left:49%;
}

.withPoint {
    float: left;
    margin-left:65%;
}

.deliveryCharge{
    float: left;
    margin-left:65%;
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

.payAmount {
    color: #6A5ACD;
    font-weight: bold;
    font-size: 250%;
    margin-left:60%;
}

.pay-btn {
  background-color: #6A5ACD;
  border: 1px solid #6A5ACD;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  margin: 12px 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: white;
  border: 1px solid #6A5ACD;
  color: #6A5ACD;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  margin: 100px 4px 4px 30%;
  cursor: pointer;
}

</style>
