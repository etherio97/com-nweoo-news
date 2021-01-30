<template>
  <v-app-bar app color="primary darken-1" dark v-if="appBarVisible">
    <nav-bar :items="menu" :user="user" :logged="logged"></nav-bar>

    <v-spacer></v-spacer>
    <v-img
      alt="Vuetify Logo"
      class="shrink mr-10"
      contain
      src="../assets/logo-dark.png"
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
    <v-spacer></v-spacer>
  </v-app-bar>
  <side-bar :items="menu" :user="user" :logged="logged" v-else></side-bar>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default {
  name: "AppBar",
  props: {
    menu: {
      required: true,
      type: Array,
    },
  },
  methods: {
    signOut() {
      //
    },
  },
  computed: {
    appBarVisible() {
      return ["sm", "xs"].includes(this.breakpoint);
    },

    breakpoint() {
      return this.$vuetify.breakpoint.name;
    },

    ...mapState("auth", ["user", "logged"]),
  },
  components: {
    NavBar,
    SideBar,
  },
};
</script>
