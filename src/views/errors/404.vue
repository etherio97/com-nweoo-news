<template>
  <v-container class="mt-6">
    <p><code>404</code> Page Not Found!</p>
    <h2 class="text-header mb-4">သင်ရှာနေသော စာမျက်နှာကို ရှာမတွေ့ပါ။</h2>
    <v-btn
      color="grey lighten-1"
      class="ma-2 pl-2 pr-4"
      @click="$router.back(-1)"
    >
      <v-icon class="mr-2">mdi-chevron-left</v-icon>
      နောက်ပြန်သွားရန်
    </v-btn>
    <v-btn color="primary" class="ma-2 pl-2 pr-4" to="/">
      <v-icon class="mr-2">mdi-home</v-icon>
      မူလစာမျက်သို့သွားရန်
    </v-btn>
  </v-container>
</template>
