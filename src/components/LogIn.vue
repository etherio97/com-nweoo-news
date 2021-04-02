<template>
  <v-dialog v-model="dialog" width="500" :persistent="loading">
    <template v-slot:activator="{ attr, on }">
      <v-list-item class="mb-10">
        <v-btn v-if="logged" @click="signOut" color="secondary darken-1" block
          >Log Out</v-btn
        >
        <v-btn
          v-else
          text
          outlined
          block
          color="secondary darken-1"
          v-on="on"
          v-bind="attr"
          >အကောင့်သို့ဝင်ရန်</v-btn
        >
      </v-list-item>
    </template>
    <v-form @submit.prevent="signInWithEmailAndPassword">
      <v-card :loading="loading">
        <v-card-title class="font-weight-black">Log In</v-card-title>
        <v-card-text>
          <v-text-field
            label="Username"
            v-model="username"
            prepend-inner-icon="mdi-account"
            outlined
          />
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            prepend-inner-icon="mdi-lock"
            outlined
          />
          <v-expand-transition>
            <v-alert v-show="error" type="error">{{ error }}</v-alert>
          </v-expand-transition>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            color="primary"
            class="px-5 font-weight-bold"
            :loading="loading"
          >
            Log In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "LogIn",
  data: () => ({
    error: false,
    username: "",
    password: "",
    loading: false,
    dialog: false,
  }),
  methods: {
    signOut() {
      const auth = firebase.auth();
      auth.signOut().then(() => {
        this.$root.user = null;
      });
    },
    signInWithEmailAndPassword() {
      this.error = false;
      this.loading = true;
      if (!this.username || !this.password) {
        this.loading = false;
        this.error = "Must fill all required fields";
        return;
      }
      const auth = firebase.auth();
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$root.user = user;
          this.$router.go();
        })
        .catch((e) => {
          this.error = e.message;
        })
        .finally(() => (this.loading = true));
    },
  },
  computed: {
    logged() {
      return Boolean(this.$root.user && this.$root.user.uid);
    },
    email() {
      return this.username + "@nweoo.com";
    },
  },
};
</script>
