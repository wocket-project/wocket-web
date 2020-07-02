<template>
    <div class="Products-page">
        <section class="section-Products-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            </div>
        </section>
        <section class="section section-skew">            
            <div class="container">
                <h1 class="header">상품 추가</h1>
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
.header {
    text-align: center;
    font-size: 200%;
    margin-bottom: 3%;
}

</style>
