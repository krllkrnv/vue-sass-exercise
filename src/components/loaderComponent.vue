<template>
  <div class="wrapper">
    <div class="square">
      <img src="../assets/loader.svg" alt="" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.square {
  position: relative;
  margin: 20vh auto;
  width: 10rem;
  height: 10rem;
  animation: 3s linear infinite rotate;
  transform-origin: 35% 45%;
}


@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
