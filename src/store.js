import axios from "axios"
import { createStore } from "vuex"
// actions specific
export const FETCH_MOVIE_INFO = "FETCH_MOVIE_INFO"
export const FETCH_SEARCH_RESULTS = "FETCH_SEARCH_RESULTS"
export const FETCH_HOME_RESULTS = "FETCH_HOME_RESULTS"
export const FETCH_NEXT_PAGE_ON_HOME = "FETCH_NEXT_PAGE_ON_HOME"

// mutations specific
export const UPDATE_MOVIE_DATA = "UPDATE_MOVIE_DATA"
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS"
export const UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS"
export const UPDATE_HOME_RESULTS = "UPDATE_HOME_RESULTS"
export const CLEAR_PREVIOUS_MOVIE = "CLEAR_PREVIOUS_MOVIE"

//getters specific
export const GET_MOVIE = "GET_MOVIE"
export const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS"
export const GET_TOTAL_SEARCH_RESULTS_PAGES = "GET_TOTAL_SEARCH_RESULTS_PAGES"
export const GET_SEARCH_QUERY = "GET_SEARCH_QUERY"
export const GET_HOME_RESULTS = "GET_HOME_RESULTS"
export const GET_TOTAL_HOME_RESULTS_PAGES = "GET_TOTAL_HOME_RESULTS_PAGES"

const initialState = {
  search: {
    query: "",
    results: [],
    totalPages: 0,
  },
  home: {
    results: [],
    totalPages: 0,
  },
  movie: {
    data: {},
  },
}

export default createStore({
  state: initialState,

  actions: {
    FETCH_SEARCH_RESULTS(store, payload) {
      axios
        .get(`http://localhost:4000/find?query=${payload.replace(" ", "+")}`)
        .then(({ data }) => {
          this.commit(UPDATE_SEARCH_RESULTS, { ...data, query: payload })
        })
        .catch((err) => console.log(err))
    },

    FETCH_HOME_RESULTS(store) {
      axios
        .get(`http://localhost:4000/?page=1`)
        .then(({ data }) => {
          this.commit(UPDATE_HOME_RESULTS, data)
        })
        .catch((err) => console.log(err))
    },

    FETCH_NEXT_PAGE_ON_HOME(store, payload) {
      console.log(payload)
      axios
        .get(`http://localhost:4000/?page=${payload}`)
        .then(({ data }) => {
          this.commit(UPDATE_HOME_RESULTS, data)
        })
        .catch((err) => console.log(err))
    },

    FETCH_MOVIE_INFO(_, payload) {
      // console.log(payload)
      axios
        .get(`http://localhost:4000/movie?movieId=${payload}`)
        .then(({ data }) => this.commit(UPDATE_MOVIE_DATA, data))
        .catch((err) => err.message)
    },
  },

  getters: {
    GET_SEARCH_RESULTS: (state) => state.search.results,

    GET_TOTAL_SEARCH_RESULTS_PAGES: (state) => state.search.totalPages,

    GET_SEARCH_QUERY: (state) => state.search.query,

    GET_HOME_RESULTS: (state) => state.home.results,

    GET_TOTAL_HOME_RESULTS_PAGES: (state) => state.home.totalPages,

    GET_MOVIE: (state) => state.movie.data,
  },

  mutations: {
    UPDATE_SEARCH_RESULTS(state, payload) {
      const { results, total_pages: totalPages, query } = payload
      state.search.query = query
      state.search.results = results
      state.search.totalPages = totalPages
    },

    UPDATE_HOME_RESULTS(state, payload) {
      const { results, total_pages: totalPages } = payload
      state.home.results = results
      state.home.totalPages = totalPages
    },

    CLEAR_SEARCH_RESULTS(state) {
      state.search.query = ""
      state.search.results = []
      state.search.totalPages = 0
    },

    UPDATE_MOVIE_DATA(state, payload) {
      state.movie.data = payload
    },

    CLEAR_PREVIOUS_MOVIE(state, payload) {
      state.movie.data = {}
    },
  },
})
