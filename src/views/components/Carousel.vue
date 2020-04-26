<template>
    <section class="section section-lg section-shaped overflow-hidden my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container py-0 pb-lg">
            <div class="row justify-content-between align-items-center">
                <div class="col-lg-5 mb-5 mb-lg-0">
                    <h2 class="text-white font-weight-light">오늘의 주요 상품</h2>
                    <p class="lead text-white mt-4">가정의 달 선물 최대 50% 할인</p>
                    <a href="http://localhost:8126/Products"
                       class="btn btn-white mt-4">모든상품 보러가기</a>
                </div>
                <div class="col-lg-6 mb-lg-auto">
                    <div class="rounded shadow-lg overflow-hidden transform-perspective-right">
                        <b-carousel id="carousel1"
                                    controls
                                    indicators>
                            <!-- Text slides with image -->
                            <b-carousel-slide img-src="img/theme/애플 맥북프로 16형 2019년형.jpg"></b-carousel-slide>
                            <b-carousel-slide img-src="img/theme/에어팟 프로.jpg"></b-carousel-slide>
                            <b-carousel-slide img-src="img/theme/몽블랑 5525 머니클립 지갑.jpg"></b-carousel-slide>                            
                        </b-carousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";

export default {
  components: {
    BCarousel,
    BCarouselSlide
  }
};
</script>
<style>
</style>
