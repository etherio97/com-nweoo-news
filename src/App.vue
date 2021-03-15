<template>
  <v-app>
    <app-bar :menu="menu"></app-bar>

    <v-main>
      <router-view :key="$route.path"></router-view>
    </v-main>

    <v-footer padless dark>
      <v-card flat tile width="100%" class="red darken-2 text-center">
        <v-card-text>
          <v-btn
            class="mx-4 red darken-2 white--text text-center"
            icon
            v-show="!$root.logged"
            :to="{ name: 'LogIn' }"
          >
            <v-icon size="24px">mdi-account</v-icon>
          </v-btn>

          <v-btn
            class="mx-4 red darken-2 white--text text-center"
            icon
            href="tel:+12029006727"
            target="_blank"
          >
            <v-icon size="24px">mdi-phone</v-icon>
          </v-btn>

          <v-btn
            class="mx-4 red darken-2 white--text text-center"
            icon
            href="mailto:nweoo22222@yahoo.com"
            target="_blank"
          >
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>

          <v-btn
            class="mx-4 red darken-2 white--text text-center"
            icon
            href="https://facebook.com/nweoo22222"
            target="_blank"
          >
            <v-icon size="24px">mdi-facebook</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy; {{ new Date().getFullYear() }} — NweOo.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import menu from './menu';

export default {
  name: "App",

  components: {
    AppBar,
  },

  data: () => ({
    menu,
    loaded: false,
    drawer: false,
  }),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
