<template>
  <Navigation />
  <router-view></router-view>
</template>

<script>
import Navigation from "./components/Navigation.vue"
export default {
  name: "App",
  components: {
    Navigation,
  },
}
</script>
