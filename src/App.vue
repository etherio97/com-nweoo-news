<template>
  <v-app v-if="$root.loaded">
    <v-app-bar app color="primary" dark>
      <side-navbar :drawer="drawer" :items="menuItems"></side-navbar>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
  <v-container v-else>
    <v-overlay value="!$root.loaded">
      <v-progress-circular
        :width="7"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import SideNavbar from "./components/SideNavbar";

const menuItems = [
  {
    icon: "mdi-home",
    title: "Home",
    path: "/",
    visible: true,
  },
];

export default {
  name: "App",

  components: {
    SideNavbar,
  },

  data() {
    return {
      drawer: false,
      menuItems,
    };
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
