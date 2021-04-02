<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant="mini" permanent>
    <v-list-item class="sidebar__logo">
      <v-list-item-title class="sidebar__logo__img">
        <v-img src="../assets/images/nweoo-logo.png"></v-img>
      </v-list-item-title>
      <v-list-item-subtitle class="sidebar__logo__brand">
        နွေဦးတော်လှန်ရေး
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item @click="mini = !mini">
      <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
      <v-spacer></v-spacer>
      <v-btn icon v-show="logged">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-list-item>

    <v-list-item v-if="logged" to="/profile" link>
      <v-list-item-avatar class="ml-n1">
        <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
        <v-icon v-else>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-subtitle>
        {{ user.displayName || user.email || user.phoneNumber }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider></v-divider>

    <v-list class="sidebar__menu">
      <template v-for="menu in items">
        <v-list-item :key="menu.title" :to="menu.path" v-if="menu.visible" link>
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",

  props: {
    items: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    logged: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    drawer: false,
    mini: true,
  }),

  watch: {
    mini(value) {
      if ("localStorage" in window) {
        value
          ? window.localStorage.setItem("_sidebar_open", "1")
          : window.localStorage.setItem("_sidebar_open", "");
      }
    },
  },

  beforeMount() {
    if ("localStorage" in window) {
      this.mini = window.localStorage.getItem("_sidebar_open") || false;
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/sidebar.scss";
</style>
