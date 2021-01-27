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
      <template v-slot:prepend>
        <router-link :to="user ? '/profile' : '/login'">
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img v-if="user && user.photoURL" :src="user.photoURL" />
              <v-icon v-else large>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="ml-2 mt-1"
                v-html="user ? user.dislpayName : 'Guest'"
              />
              <v-list-item-subtitle v-show="user">
                <v-btn small color="red" dark @click="signOut">
                  Log Out
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </template>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <template v-for="(menu, index) in items">
            <v-list-item :to="menu.path" :key="index" v-if="menu.visible">
              <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    signOut() {
      this.$auth()
        .signOut()
        .then(() => this.$router.push("/login"));
    },
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
