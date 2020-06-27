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
                </div>
            `   <div class="tabmenu">
                    <ul>
                        <li id="description" class="btnCon"><a class="on" href="#description">상품설명</a>
                        <div class="tabCon">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                        
                        </li>
                        <li id="qna-section" class="btnCon"><a href="#qna-section">상품문의</a>
                        <div class="tabCon">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</div>
                        
                        </li>    
                        <li id="review" class="btnCon"><a href="#review">상품리뷰</a>
                        <div class="tabCon"></div>
                        </li>
                    </ul>
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
        this.defaultLocation()
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

        defaultLocation() {
            location.href = "#description"
        }
    }    
}
</script>
<style>

ul{list-style:none;}

.tabmenu{ 
  max-width:100%; 
  margin: 0 auto; 
  position:relative; 
}
.tabmenu ul li{
  display:  inline-block;
  width:33.33%; 
  float:left;  
  text-align:center; 
  background :#c5c5c5;
}

.tabmenu a{
  display:block;
  height:40px;
  text-decoration:none; 
  color: white;
  font-weight: bold;
  padding: 3%;
  border-bottom: 2px solid #6A5ACD;
}

.tabmenu a:hover {
    color: black;
    transition-duration: 2s;
}

.tabCon{
  display:none; 
  text-align:left; 
  padding: 20px;
  position:absolute; 
  left:4%; 
  box-sizing: border-box; 
  border-bottom: 1px solid #6A5ACD;
}


.btnCon:target  {
  background : #6A5ACD;
}

.btnCon:target .tabCon{
  display: block;
}

</style>
