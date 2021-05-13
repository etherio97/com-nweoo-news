<template>
  <v-footer padless dark>
    <v-card flat tile width="100%" class="secondary darken-1 text-center">
      <v-card-text>
        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          href="https://fb.me/nweoo22222"
          target="_blank"
          icon
        >
          <v-icon size="24px">mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          href="mailto:nweoo22222@yandex.com"
          icon
        >
          <v-icon size="24px">mdi-email</v-icon>
        </v-btn>
        <v-btn
          class="mx-4 secondary darken-1 white--text text-center"
          href="https://t.me/nweoonews"
          target="_blank"
          icon
        >
          <v-icon size="24px">mdi-telegram</v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="body-2 white--text">
        &copy; {{ new Date().getFullYear() }} — NweOo.
        <div class="text-center">
          <router-link to="/terms-of-services">Terms of Services</router-link>
          |
          <router-link to="/privacy-policy">Privacy Policy</router-link>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
