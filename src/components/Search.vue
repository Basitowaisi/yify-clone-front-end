<template>
  <div class="results">
    <div
      v-if="resultsWithImages.length > 0"
      class="results-bg"
      :style="`background-image: url(https://image.tmdb.org/t/p/original/${
        resultsWithImages[Math.floor(Math.random() * resultsWithImages.length)]
          .poster_path ||
        resultsWithImages[Math.floor(Math.random() * resultsWithImages.length)]
          .backdrop_path
      })`"
    ></div>
    <router-link
      :key="result.id"
      v-for="result in resultsWithImages"
      :to="`/movie/${result.id}`"
    >
      <div class="result">
        <img
          :src="`https://image.tmdb.org/t/p/original/${
            result.poster_path || result.backdrop_path
          }`"
          :alt="result.original_title"
          height="300"
          style="object-fit: cover; width: 100%"
        />
        <h4 v-text="result.original_title"></h4>
        <p v-text="result.release_date"></p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import axios from "axios"
import { ref, computed } from "vue"
import { useStore } from "vuex"
import {
  GET_SEARCH_QUERY,
  GET_SEARCH_RESULTS,
  GET_TOTAL_SEARCH_RESULTS_PAGES,
} from "../store"
export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const results = ref([])
    // const totalPages = ref(1)
    const term = ref(route.query.query)

    // const results = computed(() => store.getters[GET_SEARCH_RESULTS])
    const resultsWithImages = computed(() =>
      store.getters[GET_SEARCH_RESULTS]?.filter(
        (result) =>
          !(result.poster_path == null && result.backdrop_path == null)
      )
    )

    const totalPages = computed(
      () => store.getters[GET_TOTAL_SEARCH_RESULTS_PAGES]
    )
    const query = computed(() => store.getters[GET_SEARCH_QUERY])

    return {
      resultsWithImages,
      totalPages,
      query,
    }
  },
}
</script>

<style scoped>
a:hover,
a {
  text-decoration: none;
}
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px 40px;
  position: relative;
  padding: 40px;
}
.results-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  background-repeat: no-repeat;
  background-size: cover;
}
.results-bg::before {
  content: "";
  position: absolute;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.result h4,
.result p {
  margin: 0;
  color: #fff;
}

.result p {
  font-size: 13px;
}

.result img {
  border-radius: 3px;
  border: 5px solid #fff;
}
</style>
