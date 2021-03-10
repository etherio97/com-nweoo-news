<template>
  <v-app>
    <app-bar :menu="menu"></app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import menu from "./menu";
import AppBar from "./components/AppBar";

export default {
  name: "App",

  components: {
    AppBar,
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
