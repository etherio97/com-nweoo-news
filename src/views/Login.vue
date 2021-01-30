<template>
  <v-row class="top-spacer text-center" justify="center">
    <v-form @submit.prevent="signInWithUsername" ref="loginForm">
      <v-card max-width="460" min-width="300">
        <v-card-title>
          <div style="width: 100%; align-text: center;">Log In</div>
        </v-card-title>
        <v-card-text>
          <!-- input username -->
          <v-text-field
            v-model="username"
            label="Username"
            :rules="rules.username"
            type="text"
            autocapitalize="off"
            autocomplete="username"
            aria-autocomplete="username"
            outlined
          />

          <!-- input password -->
          <v-text-field
            label="Password"
            v-model="password"
            :rules="rules.password"
            :type="hidden ? 'password' : 'text'"
            :append-icon="hidden ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="hidden = !hidden"
            autocomplete="current-password"
            aria-autocomplete="current-password"
            outlined
          />
        </v-card-text>

        <v-card-actions>
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-row>
</template>

<script>
import firebase from "firebase/app";
import { mapState } from "vuex";

let validators = [true, true];

export default {
  name: "Login",

  data: () => ({
    hidden: true,
    username: "",
    password: "",
    rules: {
      username: [() => !!validators[0]],
      password: [() => !!validators[1]],
    },
  }),

  methods: {
    signInWithUsername() {
      validators = [true, true];
      if (!this.checkErrors()) {
        return;
      }
      this.signInWithEmailAndPassword();
    },
    signInWithEmailAndPassword() {
      return firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
              return this.invalidEmail(err);
            case "auth/wrong-password":
              return this.wrongPassword(err);
            case "auth/user-not-found":
              return this.userNotFound(err);
            default:
              return this.unexceptedError(err);
          }
        });
    },
    hasError({ username, password }) {
      validators = [!(username || false), !(password || false)];
      return this.$refs.loginForm.validate();
    },
    checkErrors() {
      let errors = {};
      if (!this.password) {
        errors.password = true;
      }
      if (!this.username) {
        errors.username = true;
      }
      return this.hasError(errors);
    },
    invalidEmail({ message }) {
      this.error = message;
      this.password = "";
      this.hasError({ username: true });
    },
    wrongPassword({ message }) {
      this.error = message;
      this.password = "";
      this.hasError({ password: true });
    },
    userNotFound({ message }) {
      this.error = message;
      this.password = "";
      this.hasError({ username: true });
    },
    unexceptedError({ code, message }) {
      console.error("uncaught-error", code);
      this.error = message;
      this.hasError({ username: true, password: true });
    },
  },

  computed: {
    ...mapState("auth", ["user"]),

    email() {
      return this.username.split("@").length == 1
        ? `${this.username}@etherio.net`
        : this.username;
    },
  },

  beforeMount() {
    if (this.user) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
.top-spacer {
  margin-top: 20vh;
}
</style>
