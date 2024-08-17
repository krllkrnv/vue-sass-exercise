<template>
  <header class="header">
    <h1 @click="handleTitleClick" class="header-title">#MOVIENOW</h1>
  </header>
</template>

<script setup>
import router from "../router";

const handleTitleClick = () => {
  router.push({ name: "home" });
};
</script>

<style lang="scss" scoped>
.header {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 8px 7px rgba(0, 0, 0, 0.28);
  &-title {
    cursor: pointer;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: 0.21em;
  }
}
</style>
