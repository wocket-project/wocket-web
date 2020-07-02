<template>
<div class="jumbotron" style="padding:3%;"> 
  <form v-on:submit.prevent="registerProduct()" enctype="multipart/form-data">
  <div class="form-group">
    <label for="productName">상품 이름</label>
    <input type="text" class="form-control" id="productName" placeholder="상품 이름" ref="productName">
  </div>  
  <div class="form-group">
    <label for="productCategory">상품 카테고리</label>
    <select class="form-control" id="productCategory" ref="productCategory">
      <option>패션·뷰티</option>
      <option>식품·생활</option>
      <option>스포츠·자동차</option>
      <option>가전·디지털</option>
      <option>도서·취미</option>
    </select>
  </div>
  <div class="form-group">
    <label for="productPrice">상품 가격</label>
    <input class="form-control" type="number" value="20000" id="productPrice" ref="productPrice" min="1">
  </div>
  <div class="form-group">
    <label for="productStock">상품 재고</label>
    <input class="form-control" type="number" value="100" id="productStock" ref="productStock" min="1">
  </div>
  <div class="form-group">
    <label for="productStock">1인당 구매횟수 제한</label>
    <input class="checkbox" type="checkbox" id="checkbox" v-model="isLimitedQuantity">
    <input v-if="isLimitedQuantity === true" class="form-control" type="number" value="1" id="limitedQuantity" ref="limitedQuantity" min="1">
    <input v-if="isLimitedQuantity === false" class="form-control" type="number" value="0" id="limitedQuantity" ref="limitedQuantity" disabled="disabled">
  </div>
  <div class="form-group">
    <label for="productManufacturer">제조사</label>
    <input type="text" class="form-control" id="productManufacturer" placeholder="제조사" ref="productManufacturer">
  </div>  
  <div class="form-group">
    <label for="productDescription">상품 설명 입력</label>
    <textarea class="form-control" id="productDescription" rows="3" ref="productDescription" style="height:100px; resize:none;"/>
  </div>
  <div class="form-group">
    <label for="productImage">상품 이미지 등록</label>
    <br>
    <input type="file" class="form-control" id="productImage" ref="productImage">
  </div>
  <div align="right">
    <button type="submit" class="btn btn-primary">상품등록</button>
  </div>
</form>
</div>
</template>

<script>
import axios from "axios"
import router from "../../router"

export default {
    data() {
        return {
            isLimitedQuantity: false,
        }
    },
    methods: {
    registerProduct() {
      var name = this.$refs.productName.value
      var category = this.$refs.productCategory.value
      var price = this.$refs.productPrice.value
      var stock = this.$refs.productStock.value
      var manufacturer = this.$refs.productManufacturer.value
      var description = this.$refs.productDescription.value
      var limitedQuantity = this.$refs.limitedQuantity.value

      alert(name)

      if(name === null || name === '' || name === undefined) {
        alert('상품 이름을 입력해주세요')
        return
      }

      axios.post('http://localhost:9306/products', {
        name: name,
        category: category,
        price: price,
        manufacturer: manufacturer,
        stock: stock,
        description: description,
        limitedQuantity: limitedQuantity,

      }).then(response => {

        var productId = response.data

        var productImage = this.$refs.productImage.files[0]
        var formData = new FormData()
        formData.append('productImage', productImage) // this.productImage가 아닌 productImage를 사용해야함... 삽질...

        axios.post('http://localhost:9306/upload/' + productId, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
            alert('상품을 등록했습니다.')
        }).catch(error=> {
            console.log(error)
      })

        router.push({ name: "products" })

      }).catch(error=> {
        alert('상품등록에 실패했습니다.')
        console.log(error)
      })
    }
  }
}
</script>
<style>
.checkbox {
  margin-left:1%;
  cursor: pointer;
}
</style>