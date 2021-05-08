<template>
  <v-footer padless dark>
    <v-card flat tile width="100%" class="secondary darken-1 text-center">
      <v-card-text>
        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          icon
          href="tel:+959758035929"
        >
          <v-icon size="24px">mdi-phone</v-icon>
        </v-btn>

        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          icon
          href="mailto:nweoo22222@yandex.com"
          target="_blank"
        >
          <v-icon size="24px">mdi-email</v-icon>
        </v-btn>

        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          icon
          href="https://fb.me/nweoo22222"
          target="_blank"
        >
          <v-icon size="24px">mdi-facebook</v-icon>
        </v-btn>

        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          icon
          href="https://m.me/nweoo22222"
          target="_blank"
        >
          <v-icon size="24px">mdi-facebook-messenger</v-icon>
        </v-btn>

        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          icon
          href="https://t.me/nweoonews"
          target="_blank"
        >
          <v-icon size="24px">mdi-telegram</v-icon>
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
