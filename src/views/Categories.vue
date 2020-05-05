<template>
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <!-- <div class="container" v-if="loading">
                데이터를 가져오는 중....
            </div>  -->
            <div class="container">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <h2>패션·뷰티</h2> 
                    </div>
                    <div class="col-md-3"></div>
                </div>                        
            </div>                       
        </section>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router"

export default {
    // data() {
    //     return {
    //         loading: true, 
    //         product: []
    //     }
    // },
    // filters: {
    //     currency: function (value) {
    //         var num = new Number(value);
    //         return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    //     }
    // },
    // created () {
    //     this.getCategory()
    // },
    // watch: {
    //     '$route': 'getCategory'
    // },
    // methods: {
    //     // 상품 정보요청(세부정보)
    //     getCategory() {            
    //         axios
    //         .get("http://localhost:9306/categories/"+this.$route.params.id)
    //         .then(response => {
    //             this.loading = false
    //             this.products = response.data 
    //         })
    //         .catch(error => {
    //             alert('서버 오류')
    //             console.log(error)
    //         })
    //     },
    // }    
}
</script>
<style>
</style>
