<template>
  <v-app>
    <app-bar :menu="menu"></app-bar>

    <v-main>
      <router-view :key="$route.path"></router-view>
      <!-- <fab-button></fab-button> -->
    </v-main>

    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import menu from "./menu";
import AppFooter from "./components/AppFooter.vue";
import FabButton from "./components/FabButton.vue";

export default {
  name: "App",

  components: {
    AppBar,
    AppFooter,
    FabButton,
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
