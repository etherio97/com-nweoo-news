<template>
  <v-app>
    <v-app-bar
      v-if="appBarVisible"
      color="secondary"
      dark
      dense
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-img
          alt="NweOo Logo"
          class="shrink mr-10"
          contain
          src="/images/logo/nweoo-text.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>
      <v-spacer></v-spacer>
      <!-- <headline-bar></headline-bar> -->
    </v-app-bar>
    <side-bar :items="menu" v-else />
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      light
      temporary
      hide-overlay
    >
      <v-list nav dense>
        <v-list-item-group active-class="secondary--text text--accent-4">
          <v-list-item v-for="item in menu" :to="item.path" :key="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="mt-5 mb-15 mx-2">
      <headline-bar v-if="!appBarVisible" top="0" />
      <router-view :key="$route.path" />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
import menu from "./menu";
import SideBar from "./components/SideBar.vue";
import HeadlineBar from "./components/HeadlineBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    SideBar,
    HeadlineBar,
    AppFooter,
  },
  data: () => ({
    menu,
    loaded: false,
    drawer: false,
  }),
  computed: {
    appBarVisible() {
      return ["sm", "xs"].includes(this.breakpoint);
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/abstract/variables.scss";
@import "@/assets/scss/base/base.scss";

a {
  text-decoration: none;
}
</style>
