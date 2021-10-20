<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant="mini" permanent>
    <template v-slot:prepend>
      <router-link to="/">
        <v-list-item class="sidebar__logo">
          <v-list-item-title class="sidebar__logo__img">
            <v-img src="/images/logo/nweoo-text.png" />
          </v-list-item-title>
          <v-list-item-subtitle class="sidebar__logo__brand">
            နွေဦးတော်လှန်ရေး
          </v-list-item-subtitle>
        </v-list-item>
      </router-link>
    </template>

    <v-divider></v-divider>

    <v-list-item @click="mini = !mini">
      <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
    </v-list-item>
    <v-divider></v-divider>

    <!-- <v-list-item v-if="loggedIn" to="/profile">
      <v-list-item-avatar class="ml-n1">
        <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
        <v-icon v-else>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-subtitle>
        {{ user.displayName || user.email || user.phoneNumber }}
      </v-list-item-subtitle>
    </v-list-item> -->

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

    <!-- <template v-slot:append v-if="!mini">
      <log-in></log-in>
    </template> -->
  </v-navigation-drawer>
</template>

<script>
// import LogIn from "./LogIn.vue";

export default {
  name: "SideBar",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    drawer: false,
    mini: false,
  }),
  // components: {
  //   LogIn,
  // },
  // computed: {
  //   loggedIn() {
  //     return Boolean(this.user["uid"]);
  //   },
  //   user() {
  //     return this.$root.user || {};
  //   },
  // },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/sidebar.scss";
</style>
