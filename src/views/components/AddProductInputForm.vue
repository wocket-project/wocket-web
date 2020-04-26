<template>
<div class="jumbotron"> 
  <form v-on:submit.prevent="registerProduct()">
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
    <input class="form-control" type="number" value="20000" id="productPrice" ref="productPrice">
  </div>
  <div class="form-group">
    <label for="productStock">상품 재고</label>
    <input class="form-control" type="number" value="100" id="productStock" ref="productStock">
  </div>
  <div class="form-group">
    <label for="productManufacturer">제조사</label>
    <input type="text" class="form-control" id="productManufacturer" placeholder="제조사" ref="productManufacturer">
  </div>  
  <div class="form-group">
    <label for="productDescription">상품 설명 입력</label>
    <textarea class="form-control" id="productDescription" rows="3" ref="productDescription"></textarea>
  </div>
  <div class="form-group file-upload-wrapper" enctype="multipart/form-data">
    <label for="productImage">상품 이미지 등록</label>
    <input type="file" class="file-upload" id="productImage">
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
    methods: {
    registerProduct() {
      var name = this.$refs.productName.value
      var category = this.$refs.productCategory.value
      var price = this.$refs.productPrice.value
      var stock = this.$refs.productStock.value
      var manufacturer = this.$refs.productManufacturer.value
      var description = this.$refs.productDescription.value
      // console.log("name : " + name )

      axios.post('http://localhost:8126/products', {
        name: name,
        category: category,
        price: price,
        manufacturer: manufacturer,
        stock: stock,        
        description: description,
      }).then(response => {
        alert('상품을 등록했습니다.')
        router.push({ name: "products" })

      }).catch(error=> {
        alert('상품등록에 실패했습니다.')
        console.log(error)
      })
    }
  }
}
</script>