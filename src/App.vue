<template>
  <v-app>
    <app-bar :menu="menu"></app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-overlay :value="!loaded" opacity=".95" class="text-center">
      <v-progress-circular :width="7" color="blue" indeterminate />
      <div class="mt-4 body-2" id="loading"></div>
    </v-overlay>
  </v-app>
</template>

<script>
import menu from "./menu";
import AppBar from "./components/AppBar";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",

  components: {
    AppBar,
  },

  data: () => ({
    drawer: false,
    menu,
  }),

  methods: {
    ...mapActions("auth", {
      registerEvent: "registerEvent",
    }),
  },

  computed: {
    ...mapState("auth", ["user"]),

    loaded() {
      return this.$root.loaded;
    },
  },

  beforeMount() {
    this.registerEvent().then(() => (this.$root.loaded = true));
  },
};
</script>

<style>
a {
  text-decoration: none;
}

#loading::after {
  content: "loading";
  animation: loading 1.8s ease-in-out infinite;
}

@keyframes loading {
  0% {
    content: "loading.";
  }
  50% {
    content: "loading..";
  }
  100% {
    content: "loading...";
  }
}
</style>
