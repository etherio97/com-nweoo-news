<template>
  <v-footer padless dark>
    <v-card flat tile width="100%" class="secondary darken-1 text-center">
      <v-card-text>
        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          icon
          href="tel:+66928650591"
          target="_blank"
        >
          <v-icon size="24px">mdi-phone</v-icon>
        </v-btn>

        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          icon
          href="mailto:nweoo22222@yahoo.com"
          target="_blank"
        >
          <v-icon size="24px">mdi-email</v-icon>
        </v-btn>

        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
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
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
