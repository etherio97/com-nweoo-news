<template>
  <v-container class="mt-4 mb-6">
    <v-form ref="login" @submit.prevent="signInWithEmailPassword">
          <v-stepper v-model="step">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-text-field
                  v-model="username"
                  type="text"
                  label="Username"
                  :rules="required"
                  autocapitalize="off"
                  outlined
                  append-icon="mdi-send"
                  prepend-icon="mdi-account"
                />
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-text-field
                  v-model="password"
                  type="password"
                  label="Password"
                  :rules="required"
                  outlined
                />
              </v-stepper-content>
</v-stepper-items>
        </v-stepper>
    </v-form>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth"

export default {
  name: "LogIn",
  data: () => ({
    username: "",
    password: "",
    required: [(v) => !!v],
    loading: false,
    step: 1,
  }),
  methods: {
    signInWithEmailPassword() {
      if (this.disabled) return;
      this.loading = true;
    },
  },
  computed: {
    disabled() {
      return !(this.username || "").length || !(this.password || "").length;
    },
  },
}
</script>
