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
    <v-btn
      v-else
      text
      outlined
      depressed
      block
      color="primary"
      @click="dialog = !dialog"
    >
      အကောင့်သို့ဝင်ရန်
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form @submit.prevent="signInWithEmailAndPassword">
        <v-card :loading="loading" max-width="500px" class="px-4 pb-6 mx-auto">
          <v-card-title class="font-weight-black"></v-card-title>
          <v-card-text>
            <v-expand-transition>
              <v-alert v-show="error" type="error">{{ error }}</v-alert>
            </v-expand-transition>
            <v-text-field
              type="email"
              label="Email Address"
              v-model="email"
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
      </v-form>
    </v-dialog>
  </v-list-item>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "LogIn",
  data: () => ({
    error: undefined,
    loading: undefined,
    dialog: false,
    email: "",
    password: "",
    shown: false,
  }),
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
    signIn(user) {
      this.loading = false;
      this.dialog = false;
      this.email = "";
      this.password = "";
      this.$root.user = user;
      // this.$router.push("/");
    },
    signInWithEmailAndPassword() {
      this.error = false;
      this.loading = true;
      if (!this.email || !this.password) {
        this.loading = false;
        this.error = "Email နှင့် Password တို့အားဖြည့်ရန်လိုအပ်သည်။";
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => this.signIn(user))
        .catch((err) => {
          this.loading = false;
          this.error = err.message;
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
