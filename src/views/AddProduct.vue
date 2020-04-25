<template>
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                상품 추가 페이지입니다
                <AddProductInputForm></AddProductInputForm>            
            </div>            
        </section>
    </div>
</template>
<script>
import AddProductInputForm from "./components/AddProductInputForm";
export default {
    name: "components",
  components: {
    AddProductInputForm,
  },    
};
</script>
<style>
</style>
