<template>
  <header class="header">
    <div class="left">
      <router-link to="/" exact>
        <img src="../assets/logo-YTS.svg" alt="Yify Logo" />
      </router-link>
    </div>
    <div class="right">
      <div class="input-area">
        <input
          type="text"
          name="query"
          v-model="query"
          @keydown.enter="handleSearchSubmit"
          placeholder="Search"
          autocomplete="off"
        />
      </div>

      <router-link to="/" exact>Home</router-link>
      <router-link to="/" exact>4k</router-link>
      <router-link to="/" exact>Trending</router-link>
      <router-link to="/" exact>Browse Movies</router-link>
      <router-link to="/" exact>Login</router-link> |
      <router-link to="/" exact>Register</router-link>
    </div>
  </header>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { mapActions, useStore } from "vuex"
import { FETCH_SEARCH_RESULTS } from "../store"
export default {
  name: "Navigation",
  setup() {
    const router = useRouter()
    const query = ref("")
    const store = useStore()

    const handleSearchSubmit = (e) => {
      store.dispatch(FETCH_SEARCH_RESULTS, query.value)
      router.push(`/search?query=${query.value}`)
      query.value = ""
    }

    return {
      query,
      handleSearchSubmit,
    }
  },
}
</script>

<style scoped>
.header {
  background-color: #111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.right {
  display: flex;
  align-items: center;
}

.input-area {
  margin-right: 10px;
  border: 2px solid #444;
  border-radius: 9999px;
  padding: 5px 20px;
}

.input-area > input {
  background: #111;
  border: none;
  outline: none;
  color: #ddd;
}

.input-area > input:-webkit-autofill,
.input-area > input:-webkit-autofill:hover,
.input-area > input:-webkit-autofill:focus,
.input-area > input:-webkit-autofill:active {
  background-color: #111 !important;
  transition: all 0s;
}

.input-area > input:focus {
  background: #111;
  outline: none;
}

::placeholder {
  color: #ddd;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.right > * + * {
  margin-right: 10px;
}

a {
  color: #ddd;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
}
</style>
