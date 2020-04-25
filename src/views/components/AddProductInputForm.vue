<template>
<div class="jumbotron"> 
  <form>
  <div class="form-group">
    <label for="name">상품 이름</label>
    <input type="text" class="form-control" id="name" placeholder="상품 이름">
  </div>  
  <div class="form-group">
    <label for="category">상품 카테고리</label>
    <select class="form-control" id="category">
      <option>패션·뷰티</option>
      <option>식품·생활</option>
      <option>스포츠·자동차</option>
      <option>가전·디지털</option>
      <option>도서·취미</option>
    </select>
  </div>
  <div class="form-group">
    <label for="price">상품 가격</label>
    <input class="form-control" type="number" value="20000" id="price">
  </div>
  <div class="form-group">
    <label for="stock">상품 재고</label>
    <input class="form-control" type="number" value="100" id="stock">
  </div>
  <div class="form-group">
    <label for="productDescription">상품 설명 입력</label>
    <textarea class="form-control" id="productDescription" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="productImage">상품 이미지</label>
    <input type="file" class="form-control-file" id="productImage">
  </div>
  <div align="right">
    <button type="submit" class="btn btn-primary">상품등록</button>
  </div>
</form>
</div>
</template>