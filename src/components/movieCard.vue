<template>
  <div class="card">
    <div
      :class="
        'card__chip' +
        (movie.collapse.duration[0].split('/').length < 2 ? ' card__chip-short' : '')
      "
      v-if="movie.collapse.duration"
    >
      <p class="card__chip-text">
        {{ chipInfo }}
      </p>
      <img src="../assets/movie-icon.svg" alt="" class="card__chip-image" />
    </div>
    <div class="card__image-container">
      <img
        loading="lazy"
        :src="movie.screenshots && movie.screenshots[0]"
        :alt="`${movie.title}`"
        class="card__image"
      />
    </div>
    <div class="card__about">
      <h2 @click="handleTitleClick(movie.id)" class="card__title">
        {{ movie.title }}
      </h2>
      <div class="card__details">
        <p class="card__year-genre">
          {{ premiereDate }}, {{ movie.genres.join(", ") }}
        </p>
        <p v-if="movie.directors" class="card__director-info">
          Режиссёр: {{ movie.directors.join(", ") }}
        </p>
        <p v-if="movie.actors" class="card__cast-title">
          Актёры:
          <span class="card__cast">
            {{ movie.actors.join(", ") }}
          </span>
        </p>
      </div>
      <p class="card__description">
        {{ movie.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import router from "../router";

const store = useStore();

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const handleTitleClick = (id) => {
  store.commit("SET_MOVIE_ITEM", props.movie);
  router.push({ name: "movie", params: { id } });
};

const premiereDate = computed(() => {
  return props.movie.url.split("-").at(-1);
});

const chipInfo = computed(() => {
  if (props.movie.collapse.duration.length > 1) {
    return props.movie.collapse.duration.join(" ") + ":00";
  } else {
    return props.movie.collapse.duration.join(" ");
  }
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  display: flex;
  min-height: 10.5rem;
  flex-direction: row;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &__chip {
    position: absolute;
    right: 0;
    top: 2.15rem;
    border-bottom: 1.785rem solid #c4c4c4;
    border-left: 0.3rem solid transparent;
    width: 11.5rem;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-short {
      width: 8rem;
    }
  }
  &__chip-text {
    position: absolute;
    top: 0.45rem;
    right: 3.5rem;
  }
  &__chip-image {
    position: absolute;
    top: 0.15rem;
    right: 1.5rem;
  }
  &__title {
    font-size: 36px;
    line-height: 36px;
    text-transform: none;
    cursor: pointer;
  }
  &__year-genre {
    margin-bottom: 0.5rem;
  }
  &__director-info {
    margin-bottom: 0.625rem;
  }
  &__image-container {
    align-self: stretch;
    max-width: 10.5rem;
    min-width: 10.5rem;
    align-content: center;
  }
  &__details {
    font-size: 12px;
    line-height: 12px;
  }
  &__cast {
    text-transform: none;
    line-height: 16px;
  }
  &__about {
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 0.75rem;
    padding: 2rem 2rem 2rem 1.5rem;
  }
  &__description {
    text-transform: none;
    font-size: 16px;
  }
}
</style>
