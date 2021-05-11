<template>
  <v-list-item class="mb-10">
    <v-btn
      v-if="logged"
      @click="signOut"
      color="primary"
      depressed
      block
      outlined
    >
      အကောင့်မှထွက်ရန်
    </v-btn>
    <v-btn v-else text outlined depressed block color="primary" to="/login">
      အကောင့်သို့ဝင်ရန်
    </v-btn>
  </v-list-item>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "LogIn",
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$root.user = {};
          this.$router.push("/");
        });
    },
  },
  computed: {
    logged() {
      return Boolean(this.$root.user && this.$root.user.uid);
    },
  },
};
</script>
