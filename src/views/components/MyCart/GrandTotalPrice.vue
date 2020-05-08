<template>
    <div class="grandTotalPrice">
        <h1>총 주문금액</h1>
        <dl class="">
            <dt>총 상품금액</dt>
            <dd>
                <em class="productsPrice">{{ cart.grandTotalPrice | currency}}</em>                
            </dd>
            <dt>즉시할인쿠폰</dt>
            <dd>
                <em class="coupon">-0원</em>                
            </dd>
            <dt>배송비</dt>
            <dd>
                <em class="deliveryCharge">0원</em>                
            </dd>
        </dl>
    </div>
</template>
<style scoped>

</style>