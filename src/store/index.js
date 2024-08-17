import { createStore } from "vuex";

export default createStore({
  state: {
    state: {
      MOVIE_ITEM: null,
    },
  },
  getters: {
    GET_MOVIE_ITEM: (state) => {
      return state.MOVIE_ITEM;
    },
  },
  mutations: {
    SET_MOVIE_ITEM: (state, payload) => {
      state.MOVIE_ITEM = payload;
    },
  },
});
