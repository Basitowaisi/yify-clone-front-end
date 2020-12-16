<template>
  <div
    v-show="movie"
    :style="`background-image: url(https://image.tmdb.org/t/p/original/${
      movie.backdrop_path || movie.poster_path
    })`"
    class="movie"
  >
    <div class="movie__wrapper">
      <img
        class="movie__image"
        :src="`https://image.tmdb.org/t/p/original/${
          movie.backdrop_path || movie.poster_path
        }`"
      />
      <div class="movie__details">
        <h2 class="movie__name">{{ movie.original_title }}</h2>

        <p class="movie__date">
          {{ new Date(movie.release_date).getFullYear() }}
        </p>
        <p class="movie__genre">
          Genre(s) : {{ movie.genres?.map((genre) => genre.name).join(",") }}
        </p>
      </div>
    </div>
    <p class="movie__desc">Synopsis:</p>
    <p class="movie__desc">{{ movie.overview }}</p>
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import { computed, onMounted, ref } from "vue"
import axios from "axios"
import { mapGetters, useStore } from "vuex"
import { FETCH_MOVIE_INFO, GET_MOVIE, CLEAR_PREVIOUS_MOVIE } from "./../store"
export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    onMounted(() => {
      store.dispatch(CLEAR_PREVIOUS_MOVIE)
      store.dispatch(FETCH_MOVIE_INFO, route.params.movieId)
    })
    const movie = computed(() => store.getters[GET_MOVIE])
    return {
      movie,
    }
  },
}
</script>

<style scoped>
.movie {
  background-color: rgba(0, 0, 0, 0.9);
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
}

.movie__wrapper {
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  padding-top: 4rem;
}

.movie__details {
  margin-left: 3rem;
  text-align: left;
}

.movie__image {
  object-fit: cover;
  width: 250px;
  height: 300px;
  border: 4px solid #5da93c;
  border-radius: 4px;
}

.movie__name,
.movie__date,
.movie__genre {
  color: #fff;
  margin: 0.5rem 0;
  word-break: break-all;
}

.movie__name {
  font-size: 40px;
}
.movie__genre,
.movie__date {
  line-height: 24px;
  font-size: 1.25em;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  margin: 0;
}

.movie__desc {
  color: #919191;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
  margin-top: 1rem;
  font-weight: bold;
}

.movie__desc + .movie__desc {
  font-weight: normal;
}
</style>
