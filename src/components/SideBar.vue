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

    <v-divider></v-divider>

    <v-list class="sidebar__menu">
      <v-list-item v-for="menu in items" :key="menu.path" :to="menu.path" link>
        <v-list-item-icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
  },
  data: () => ({
    drawer: false,
    mini: false,
  }),
};
</script>

<style lang="scss">
@import "@/assets/scss/components/sidebar.scss";
</style>
