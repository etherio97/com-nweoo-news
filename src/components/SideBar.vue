<template>
  <v-navigation-drawer app v-model="drawer" :mini-variant="mini" permanent>
    <v-list-item>
      <v-list-item-title style="max-width: 40px;">
        <v-img src="../assets/logo-bw.png"></v-img>
      </v-list-item-title>
      <v-list-item-subtitle class="pl-3 subtitle-1 font-weight-bold">
        NEG
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-btn icon @click="mini = !mini">
        <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
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

    <v-list dense>
      <v-list-item v-for="item in items" :to="item.path" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
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
};
</script>
