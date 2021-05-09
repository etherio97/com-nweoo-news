<template>
  <v-dialog v-model="dialog" width="500" :persistent="loading">
    <template v-slot:activator="{ attr, on }">
      <v-list-item class="mb-10">
        <v-btn
          v-if="logged"
          @click="signOut"
          color="primary"
          depressed
          block
          outlined
          >အကောင့်မှထွက်ရန်</v-btn
        >
        <v-btn
          v-else
          text
          outlined
          depressed
          block
          color="primary"
          v-on="on"
          v-bind="attr"
          >အကောင့်သို့ဝင်ရန်</v-btn
        >
      </v-list-item>
    </template>
    <v-form @submit.prevent="signInWithEmailAndPassword">
      <v-card :loading="loading" class="px-4 pb-6">
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
            :disabled="!loading"
          />
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            prepend-inner-icon="mdi-lock"
            outlined
            :disabled="!loading"
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
        <v-card-text class="mt-3">
          <v-btn
            class="mb-2"
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
    signInWithGoogle() {
      this.error = false;
      this.loading = true;
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((u) => {
          this.$root.user = u;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    signInWithFacebook() {
      this.error = false;
      this.loading = true;
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((u) => {
          this.$root.user = u;
        })
        .catch((e) => {
          this.loading = false;
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
        .then((user) => {
          this.$root.user = user;
        })
        .catch((e) => {
          this.error = e.message;
        })
        .finally(() => {
          this.loading = false;
          this.dialog = false;
        });
    },
  },
  watch: {
    dialog(value) {
      if (value) {
        setTimeout(
          () => this.$refs.usn.$el.querySelector("input").focus(),
          320
        );
      }
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
