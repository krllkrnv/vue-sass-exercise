<template>
  <div class="container">
    <div class="container__info">
      <h2 class="container__title">Фильмы</h2>
      <div class="container__controls">
        <div class="container__sort-by-name-controls">
          <input
            id="name-sort"
            type="checkbox"
            class="container__sort-by-name"
            v-model="pickedName"
            @change="handleNameSelect"
          />

          <label id="name-sort" for="name-sort">
            Отсортировать по названию</label
          >
        </div>
        <div class="container__sort-by-year-controls">
          <input
            type="checkbox"
            id="year-sort"
            class="container__sort-by-year"
            v-model="pickedYear"
            @change="handleYearSelect"
          />

          <label id="year-sort" for="year-sort"> Отсортировать по году </label>
        </div>
      </div>
      <hr class="container__hr" />
    </div>
    <movie-card
      v-for="movie in response"
      class="movie-item"
      :movie="movie"
      :key="movie.id"
    ></movie-card>
    <loader-component v-if="!response && !isError"></loader-component>
    <errorComponent v-if="isError" />
  </div>
</template>

<script setup>
import loaderComponent from "../components/loaderComponent.vue";
import errorComponent from "../components/errorComponent.vue";
import movieCard from "../components/movieCard.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../scripts/fetch";

const store = useStore();

const response = ref([]);

const isError = ref(false);

const pickedName = ref(false);
const pickedYear = ref(false);

const unsortedResponse = ref([]);

const handleBothUnchecked = () => {
  if (!pickedName.value && !pickedYear.value) {
    response.value = unsortedResponse.value.map((movie) => movie);
    return true;
  }
};

const handleNameSelect = () => {
  pickedYear.value = false;
  if (handleBothUnchecked()) {
    return;
  }
  response.value = response.value.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  });
};

const handleYearSelect = () => {
  pickedName.value = false;
  if (handleBothUnchecked()) {
    return;
  }
  response.value = response.value.sort((a, b) => {
    let firstDate = a.url.split("-").at(-1);
    let secondDate = b.url.split("-").at(-1);
    if (firstDate < secondDate) {
      return -1;
    } else if (firstDate > secondDate) {
      return 1;
    } else {
      return 0;
    }
  });
};

onMounted(async () => {
  try {
    const data = await fetchData("http://localhost:9000/api/movies");
    response.value = data.data;
    unsortedResponse.value = response.value.map((movie) => movie);
  } catch (error) {
    isError.value = true;
  }
});
</script>

<style lang="scss">
.container {
  padding-bottom: 1rem;
  display: flex;
  margin: 0 auto;
  max-width: 73vw;
  height: 100%;
  flex-direction: column;
  row-gap: 1.5rem;
  &__info {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
  &__hr {
    margin-bottom: 0.5rem;
  }
  &__controls {
    display: flex;
    column-gap: 2rem;
  }
  &__controls input {
    height: 20px;
    width: 20px;
  }
  &__controls > div {
    display: flex;
    flex-direction: row;
    column-gap: 0.5rem;
    align-items: end;
  }
}
.movie-item {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.movie-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.3);
}
</style>
