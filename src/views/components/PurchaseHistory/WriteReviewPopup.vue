<!-- Title : windows popup창 구현 -->
<!-- developed by hansol kim -->
<!-- Date : 2020-06-30 -->

<template>
<div class="review-write-popup">
    <h1 class="review-write-title">리뷰쓰기</h1>
    <span class="review-write-sub">
        구매 후 리뷰를 작성하시면 
        <span class="point-theme-color">적립금 10원</span>
        을 드립니다.
    </span>
    <hr class="review-write-hr">
    <!-- 상품 정보 box -->
    <div class="productInfo-box">
        <!-- 상품 이미지 -->
        <div class="product-image">

        </div>
        <!-- 상품 이름 -->
        <div class="productInfo">
            <strong class="productInfo-name">에어팟</strong>
        </div>
        <!-- 상품 평가하기 -->
    </div>
    <hr class="review-write-hr">
    <h1 class="review-write-subtitle">상품 평가하기</h1>
    <div class="review-rating-box">
        <strong class="productInfo-name">상품 만족도</strong>
        <div class="review-rating-btn">
            <button type="button" class="btn-star-rating" value="1"/>
            <button type="button" class="btn-star-rating" value="2"/>
            <button type="button" class="btn-star-rating" value="3"/>
            <button type="button" class="btn-star-rating" value="4"/>
            <button type="button" class="btn-star-rating" value="5"/>
            <span class="review-rating-text">선택해주세요</span>
        </div>
    </div>

    <!-- 리뷰 작성하기 -->
    <h1 class="review-write-subtitle">리뷰 작성하기</h1>
    <span class="textCnt">0/500</span>
    <div class="review-write-textarea">
        <textarea id="reviewContents" name="reviewContents" maxlength="500" 
        placeholder="리뷰는 최소 10자 이상 입력해 주세요."></textarea>
        <div class="review-textarea-placeholder">
            <span class="review-textarea-placeholder-text"></span>
        </div>
    </div>

    <div class="review-write-btn">
        <button type="button" role="cancel" class="btn-review-cancel">취소</button>
        <button type="button" role="register" class="btn-review-register">등록</button>
    </div>
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.review-write-popup {
    padding: 5%;
}

.review-write-title {
    font-size: 150%;
    font-weight: bold;
}

.review-write-sub {
    font-size: 90%;
}

.point-theme-color {
    color: #6A5ACD;
    font-weight: 900;
}

.review-write-hr {
    margin-top: 3%;
    margin-bottom: 3%;
}

.productInfo-name {
    font-size: 100%;
    font-weight: bolder;
    color:black;
}

.review-write-subtitle {
    font-size: 110%;
    font-weight: bold;
    margin-top: 5%;
    display: inline-block;
}

.review-rating-box {
    border: 1px solid #b8bfc8;
    padding: 5%;
}

.review-rating-text {
    margin: 3%;
    font-size: 80%;
}

.textCnt {
    margin-left: 2%;
}

.review-write-textarea textarea {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    border: 1px solid #b8bfc8;
    padding: 3%;
    resize: none;
    position: relative;
}

.review-write-btn {
    margin: 5%;
    text-align: center;
}

.btn-review-cancel {
  background-color: white;
  border: 1px solid #6A5ACD;
  color: #6A5ACD;
  padding: 12px 40px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 1%;
  cursor: pointer;
}

.btn-review-register {
  background-color: #6A5ACD;
  border: none;
  color: #FFF;
  padding: 12px 40px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 1%;
  cursor: pointer;
}
</style>