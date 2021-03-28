<template>
  <v-app>
    <app-bar :menu="menu"></app-bar>
    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import menu from "./menu";
import AppBar from "./components/AppBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",

  components: {
    AppBar,
    AppFooter,
  },

  data: () => ({
    menu,
    loaded: false,
    drawer: false,
  }),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
