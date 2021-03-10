<template>
  <v-app-bar
    app
    color="red darken-4"
    elevate-on-scroll
    dark
    dense
    v-if="appBarVisible"
  >
    <nav-bar :items="menu" :user="user" :logged="logged"></nav-bar>
    <v-spacer></v-spacer>
    <router-link to="/">
      <v-img
        alt="NweOo Logo"
        class="shrink mr-10"
        contain
        src="../assets/nweoo-logo.png"
        transition="scale-transition"
        width="40"
      />
    </router-link>
    <v-spacer></v-spacer>
  </v-app-bar>
  <side-bar :items="menu" :user="user" :logged="logged" v-else></side-bar>
</template>

<script>
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default {
  name: "AppBar",
  props: {
    menu: {
      required: true,
      type: Array,
    },
    user: {
      default: Object,
      type: Object,
    },
    logged: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    appBarVisible() {
      return ["sm", "xs"].includes(this.breakpoint);
    },

    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },
  },
  components: {
    NavBar,
    SideBar,
  },
};
</script>
