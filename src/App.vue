<template>
  <v-app>
    <v-app-bar color="secondary" dark dense app fixed v-if="appBarVisible">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-img
          alt="NweOo Logo"
          class="shrink mr-10"
          contain
          src="@/assets/images/nweoo-logo.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>
      <v-spacer></v-spacer>
      <headline-bar></headline-bar>
    </v-app-bar>
    <side-bar :items="menu" :can="can" v-else />

    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      light
      temporary
      hide-overlay
    >
      <template v-slot:prepend v-if="loggedIn">
        <v-list-item two-line to="/profile">
          <v-list-item-avatar>
            <v-img v-if="user.photoURL" :src="user.photoURL" />
            <v-icon v-else large>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle class="ml-2 mt-1">
              {{ user.displayName || user.email || user.phoneNumber }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>

      <v-list nav dense>
        <v-list-item-group active-class="secondary--text text--accent-4">
          <template v-for="(item, index) in menu">
            <v-list-item
              :to="item.path"
              :key="`nav-${index}`"
              v-if="item.visible"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <log-in></log-in>
      </template>
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
import LogIn from "./components/LogIn.vue";
import SideBar from "./components/SideBar.vue";
import HeadlineBar from "./components/HeadlineBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",

  components: {
    SideBar,
    HeadlineBar,
    AppFooter,
    LogIn,
  },

  data: () => ({
    menu,
    loaded: false,
    drawer: false,
  }),

  methods: {
    can(visible) {
      if (!visible) return false;
      if (typeof visible === "boolean") return true;
      if (!this.loggedIn) return false;
      return visible.includes(this.role);
    },
  },

  computed: {
    appBarVisible() {
      return ["sm", "xs"].includes(this.breakpoint);
    },

    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },

    loggedIn() {
      return Boolean(this.user?.uid);
    },

    user() {
      return this.$root.user;
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
