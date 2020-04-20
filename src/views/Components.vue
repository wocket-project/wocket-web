<template>
    <div>
        <carousel></carousel>        
        <basic-elements></basic-elements>      
    </div>
</template>
<script>
import BasicElements from "./components/BasicElements";
import Carousel from "./components/Carousel";

export default {
  name: "components",
  components: {
    BasicElements,
    Carousel,
  }
};
</script>
