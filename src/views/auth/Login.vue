<template>
  <v-container class="mt-10">
    <v-form @submit.prevent="signInWithEmailAndPassword">
      <v-card :loading="loading" max-width="500px" class="px-4 pb-6 mx-auto">
        <v-card-title class="font-weight-black"></v-card-title>
        <v-card-text>
          <v-expand-transition>
            <v-alert v-show="error" type="error">{{ error }}</v-alert>
          </v-expand-transition>
          <v-text-field
            label="Username"
            v-model="username"
            prepend-inner-icon="mdi-account"
            outlined
            ref="usn"
            autocapitalize="off"
          />
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            prepend-inner-icon="mdi-lock"
            outlined
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            type="submit"
            color="primary"
            class="px-5 font-weight-bold"
            :loading="loading"
          >
            Log In
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card max-width="500px" class="mt-8 mx-auto" elevation="0">
        <v-card-text>
          <v-btn
            class="mb-5"
            color="red darken-1"
            @click="signInWithGoogle"
            block
            dark
          >
            <v-icon class="mr-2">mdi-google</v-icon>
            Log in with Google
          </v-btn>

          <v-btn
            class="mt-2"
            color="blue darken-2"
            @click="signInWithFacebook"
            block
            dark
          >
            <v-icon class="mr-2">mdi-facebook</v-icon>
            Log in with Facebook
          </v-btn>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "Login",
  data: () => ({
    error: false,
    username: "",
    password: "",
    loading: false,
  }),
  methods: {
    signIn(user) {
      this.$root.user = user;
      this.loading = false;
      this.$router.push("/");
    },
    signInWithGoogle() {
      this.error = false;
      this.loading = true;
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((u) => this.signIn(u))
        .catch((e) => {
          this.loading = false;
          this.error = e.message;
        });
    },
    signInWithFacebook() {
      this.error = false;
      this.loading = true;
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((u) => this.signIn(u))
        .catch((e) => {
          this.loading = false;
          this.error = e.message;
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
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((u) => this.signIn(u))
        .catch((e) => {
          this.error = e.message;
          this.loading = false;
        });
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
  beforeMount() {
    if (this.logged) {
      this.$router.push("/");
    }
  },
};
</script>
