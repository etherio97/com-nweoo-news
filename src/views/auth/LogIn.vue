<template>
  <v-container class="mt-4 mb-6">
    <v-form ref="login" @submit.prevent="signInWithEmailPassword">
      <v-row align="center" justify="center" class="text-center">
        <v-col cols="11" sm="9" md="7" lg="5" xl="5">
          <div style="content: ''; height: 10px;"></div>
          <v-avatar size="64" rounded="100">
            <v-img src="@/assets/nweoo-logo-text.png" width="64" height="64" />
          </v-avatar>
          <div style="content: ''; height: 30px;"></div>
          <v-stepper v-model="step">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card elevation="0">
                  <v-card-title>
                    <v-row class="mb-2 text-center">
                      <v-col cols="12">
                        <h4 class="text-center" style="width: 100%;">
                          Log In
                        </h4>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="username"
                      type="text"
                      label="Username"
                      autocapitalize="off"
                      ref="username"
                      outlined
                    />
                    <v-alert type="error" v-if="error">
                      {{ error }}
                    </v-alert>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      type="submit"
                      color="primary"
                      @click="fetchSignInMethodsForEmail"
                      :loading="loading"
                    >
                      Next <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <!-- login into account -->
              <v-stepper-content step="2">
                <v-card elevation="0">
                  <v-card-text>
                    <v-row class="mb-4 text-center">
                      <v-col cols="12">
                        <v-chip close @click:close="step = 1">
                          <v-avatar
                            class="mr-2"
                            rounded="100"
                            color="red lighten-2"
                          >
                            {{ (this.username[0] || "").toUpperCase() }}
                          </v-avatar>
                          {{ email }}
                        </v-chip>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="showPassword = !showPassword"
                      ref="signIn"
                      outlined
                    />
                    <v-alert type="error" v-if="error">
                      {{ error }}
                    </v-alert>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      type="submit"
                      color="primary"
                      @click="registerWithEmailPassword"
                      :loading="loading"
                    >
                      <v-icon class="mr-2">mdi-login</v-icon> Log In
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>

              <!-- create new account -->
              <v-stepper-content step="3">
                <v-card elevation="0">
                  <v-card-text>
                    <v-row class="mb-2 text-center">
                      <v-col cols="12">
                        <v-chip close @click:close="step = 1">
                          <v-avatar
                            class="mr-2"
                            rounded="100"
                            color="red lighten-2"
                          >
                            {{ (this.username[0] || "").toUpperCase() }}
                          </v-avatar>
                          {{ email }}
                        </v-chip>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="showPassword = !showPassword"
                      ref="createAccount"
                      outlined
                    />
                    <v-alert type="error" v-if="error">
                      {{ error }}
                    </v-alert>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      type="submit"
                      @click="step = 1"
                      text
                      :disabled="loading"
                    >
                      <v-icon class="mr-2">mdi-chevron-left</v-icon>
                      Back
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      type="submit"
                      color="primary"
                      @click="registerWithEmailPassword"
                      :loading="loading"
                    >
                      Create new account
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "LogIn",
  data: () => ({
    error: null,
    username: "",
    password: "",
    loading: false,
    showPassword: false,
    step: 1,
  }),
  methods: {
    login() {
      if (this.$root.logged) {
        this.$router.push({ name: "Home" });
      }
    },
    focus() {
      let el;
      switch (this.step) {
        case 1:
          el = this.$refs.username;
          break;
        case 2:
          el = this.$refs.signIn;
          break;
        case 3:
          el = this.$refs.createAccount;
          break;
      }
      setTimeout(() => el.focus(), 400);
    },
    fetchSignInMethodsForEmail() {
      if (!this.username) {
        this.error = "You must enter username";
        return;
      }
      this.loading = true;
      this.error = null;
      firebase
        .auth()
        .fetchSignInMethodsForEmail(this.email)
        .then((res) => {
          this.loading = false;
          if (!res.length) {
            this.step = 3;
            this.showPassword = true;
          } else {
            this.step = 2;
            this.showPassword = false;
          }
          this.focus();
        })
        .catch((err) => {
          this.error = err.message;
          this.loading = false;
        });
    },
    signInWithEmailPassword() {
      if (this.disabled) return;
      this.error = null;
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.loading = false;
          this.$root.logged = Boolean(user);
          this.$root.user = user;
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.loading = false;
          switch (err.code) {
            case "auth/wrong-password":
              this.error = "Incorrect password";
              this.password = "";
              break;
            default:
              this.error = err.message;
          }
          this.focus();
        });
    },
    registerWithEmailPassword() {
      if (this.disabled) return;
      this.error = null;
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$root.logged = Boolean(user);
          this.$root.user = user;
          this.login();
        })
        .catch((err) => {
          this.error = err.message;
          this.autofocus = true;
          this.loading = false;
        });
    },
  },
  computed: {
    email() {
      return (this.username || "") + "@nweoo.com";
    },
    disabled() {
      return !(this.username || "").length || !(this.password || "").length;
    },
  },
  beforeMount() {
    this.login();
  },
  mounted() {
    this.focus();
  },
};
</script>
