<template>
  <div class="container">
    <h2 @click="handleClick" class="container__back-to">Назад к списку</h2>
    <hr class="container__hr" />
    <movie-card v-if="movie" :movie="movie"></movie-card>
    <loader-component v-if="!movie && !isError"></loader-component>
    <error-component v-if="isError" />
  </div>
</template>

<script setup>
import loaderComponent from "../components/loaderComponent.vue";
import errorComponent from "../components/errorComponent.vue";
import movieCard from "../components/movieCard.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../scripts/fetch";
import { useRoute } from "vue-router";
import router from "../router";

const store = useStore();
const routerLocal = useRoute();
const isError = ref(false);

const movie = ref(false);

const handleClick = () => {
  router.push({ name: "home" });
};

onMounted(async () => {
  if (store.getters.GET_MOVIE_ITEM) {
    movie.value = store.getters.GET_MOVIE_ITEM;
  } else {
    try {
      const data = await fetchData(
        `http://localhost:9000/api/movie/${routerLocal.fullPath
          .split("/")
          .pop()}`
      );
      movie.value = data.data;
    } catch (error) {
      isError.value = true;
    }
  }
});

onUnmounted(() => {
  store.commit("SET_MOVIE_ITEM", null);
});
</script>

<style lang="scss">
.container {
  &__hr {
    margin-bottom: 0.5rem;
  }
  &__back-to {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    cursor: pointer;
    text-decoration: underline;
    font-size: 1.25rem;
    &::before {
      content: url(../assets/back-to.svg);
      margin-right: 0.5rem;
    }
  }
}
</style>
