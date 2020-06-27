<template>
<div class="review">
    <!-- 상품리뷰 및 개수 표기 -->
    <div class="review-header">
        <h4>상품리뷰( <strong>3</strong> )</h4>
    </div>
    <div class="review-header-message">
        <p>* 리뷰작성 완료 시<strong> 10포인트가 지급</strong>됩니다.</p>
        <button type="button" class="write-review" @click="writeReview()">리뷰 작성하기 ></button>
    </div>
    <div class="review-rating">
        <h1>평점 : 5.0</h1>
    </div>
    <div class="review-list">
        <div class="review-list-box">
            <div class="review-contents-header">
                에어팟 평점 : 5점
            </div>
            <div class="review-contents">
                음질 최고 짱짱맨~~~~~
            </div>
            <div class="review-contents-footer">
                김한* | 2020-06-27 20:41:22 | 신고
            </div>
        </div>
        <hr>
        <div class="review-list-box">
            <div class="review-contents-header">
                에어팟 평점 : 5점
            </div>
            <div class="review-contents">
                음질 최고 짱짱맨~~~~~
            </div>
            <div class="review-contents-footer">
                김한* | 2020-06-27 20:41:22 | 신고
            </div>
        </div>
        <hr>
                <div class="review-list-box">
            <div class="review-contents-header">
                에어팟 평점 : 5점
            </div>
            <div class="review-contents">
                음질 최고 짱짱맨~~~~~
            </div>
            <div class="review-contents-footer">
                김한* | 2020-06-27 20:41:22 | 신고
            </div>
        </div>
        <hr>
                <div class="review-list-box">
            <div class="review-contents-header">
                에어팟 평점 : 5점
            </div>
            <div class="review-contents">
                음질 최고 짱짱맨~~~~~
            </div>
            <div class="review-contents-footer">
                김한* | 2020-06-27 20:41:22 | 신고
            </div>
        </div>
        <hr>
    </div>
</div>
</template>

<style scoped>
.review {
    width: 100%;
    height: 50px;
}

.review-header h4{
    font-weight: bold;
    font-size: 100%;
}

.review-header strong{
    color: #7c6beb;
    font-size: 120%;
}

.review-header-message p{
    font-size: 90%;
    float: left;
}

.review-header-message strong{
    font-size: 100%;
    color: #7c6beb;
    font-weight: bold;
}

.review-rating {
    width: 100%;
    text-align: center;
    margin-top: 7%;
    margin-left: 1%;
    padding: 5%;
    border: 1px solid #CCC;
}

@media screen and (max-width: 992px) {
    .review-rating {
        width: 100%;
        text-align: center;
        margin-top: 12%;
        margin-left: 1%;
        padding: 5%;
        border: 1px solid #CCC;
    }
}


.write-review {
    float: right;
    background-color: #AAA;
    border: 1px solid #AAA;
    color: white;
    padding: 6px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 12px 4px;
    cursor: pointer;
}

.review-list {
    margin: 2%;
}

.review-contents-header {
    margin-top: 2%;
    margin-bottom: 3%;
    color: #CCC;
    font-size: 85%;
}

.review-contents{
    min-height: 120px;
}

.review-contents-footer {
    font-size: 90%;
}
</style>