<template>
  <div class="home" v-if="homeResults.length > 0">
    <div
      class="home-bg"
      :style="`background-image: url(https://image.tmdb.org/t/p/original/${
        homeResults[0].poster_path || homeResults[0].backdrop_path
      })`"
    ></div>
    <div class="showcase">
      <h1>Download YTS YIFY movies: HD smallest size</h1>
      <p>
        Welcome to the official YTS.MX (.LT) website. Here you can browse and
        download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality,
        all at the smallest file size. YTS Movies Torrents.
      </p>

      <h4>
        IMPORTANT - YTS.MX is the only new official domain for YIFY Movies
      </h4>
      <h3>Popular Downloads</h3>
    </div>
    <router-link
      v-for="result in homeResults"
      :key="result.id"
      :to="`/movie/${result.id}`"
    >
      <div class="result">
        <div class="result-link">
          <img
            :src="`https://image.tmdb.org/t/p/original/${
              result.poster_path || result.backdrop_path
            }`"
            :alt="result.original_title"
            height="300"
            style="object-fit: cover; width: 100%"
          />

          <div class="link-overlay">
            <button type="button">View</button>
          </div>
        </div>
        <h4 v-text="result.original_title"></h4>
        <p v-text="result.release_date"></p>
      </div>
    </router-link>
    <pagination
      class="vue-paginate"
      v-model="page"
      :records="homeResults.length * homeTotalPages"
      :per-page="homeResults.length"
      @paginate="changePage"
    />
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue"
import { mapGetters, useStore } from "vuex"
import Pagination from "v-pagination-3"
import {
  FETCH_HOME_RESULTS,
  FETCH_NEXT_PAGE_ON_HOME,
  GET_HOME_RESULTS,
  GET_TOTAL_HOME_RESULTS_PAGES,
} from "../store"
export default {
  name: "Home",
  components: {
    Pagination,
  },
  setup() {
    const page = ref(1)
    const store = useStore()
    onMounted(() => store.dispatch(FETCH_HOME_RESULTS))
    const changePage = () => {
      store.dispatch(FETCH_NEXT_PAGE_ON_HOME, page.value)
    }
    const homeResults = computed(() => store.getters[GET_HOME_RESULTS])
    const homeTotalPages = computed(
      () => store.getters[GET_TOTAL_HOME_RESULTS_PAGES]
    )
    return {
      page,
      changePage,
      homeResults,
      homeTotalPages,
    }
  },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;1,700&display=swap");
a,
a:hover {
  text-decoration: none;
}
.result-link {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.result-link .link-overlay {
  width: 0;
  height: 0;
  top: 100%;
  transition: top 300ms ease;
}

.result-link:hover .link-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.link-overlay > button {
  background: #5da93c;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.home {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px 40px;
  position: relative;
  padding: 40px;
  font-family: "Arimo", sans-serif;
}
.home-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  background-repeat: no-repeat;
  background-size: cover;
}
.home-bg::before {
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
  box-sizing: border-box;
}
.showcase {
  grid-column: 1/-1;
  text-align: center;
  color: #fff;
}

.showcase h1 {
  font-size: 50px;
  font-family: inherit;
  font-weight: 700;
}

.showcase h4 {
  color: rgb(66, 139, 202);
}

.showcase p {
  font-size: 17px;
  max-width: 800px;
  margin: 0 auto;
  font-weight: 400;
}

.vue-paginate > nav {
  width: 500px !important;
  margin: 0 auto !important;
  text-align: center !important;
}
.VuePagination__pagination.pagination.VuePagination__pagination {
  display: flex !important;
  list-style: none !important;
  justify-content: space-between !important;
}
</style>
