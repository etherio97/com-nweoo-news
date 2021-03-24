<template>
  <div>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      light
      temporary
      hide-overlay
    >
      <template v-slot:prepend v-if="logged">
        <v-list-item two-line to="/profile">
          <v-list-item-avatar>
            <v-img v-if="user && user.photoURL" :src="user.photoURL" />
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
          <template v-for="(menu, index) in items">
            <v-list-item :to="menu.path" :key="index" v-if="menu.visible">
              <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t(menu.title) }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <v-list-item class="mb-10">
          <v-btn v-if="logged" color="secondary darken-1" block>Log Out</v-btn>
          <v-btn
            v-else
            text
            outlined
            color="secondary darken-1"
            block
            :to="{ name: 'LogIn' }"
            >အကောင့်သို့ဝင်ရန်</v-btn
          >
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "NavBar",
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
  }),

  methods: {
    signOut() {
      //
    },
  },
};
</script>
