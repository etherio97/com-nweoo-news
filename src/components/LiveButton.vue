<template>
  <div>
    <v-btn
      v-if="usingRTDB"
      small
      text
      @click="useAPI"
      color="red darken-3"
      rounded
    >
      <v-icon class="mr-1" small>mdi-radiobox-marked</v-icon>
      Live
    </v-btn>
    <v-btn v-else small text @click="useRTDB" color="grey lighten-2" rounded>
      <v-icon class="mr-1" small>mdi-radiobox-marked</v-icon>
      Live
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <p class="body-1">
            လုပ်ဆောင်ချက်အချိန်ကြာမြင့်နေပါက Live Mode ပိတ်ပြီး
            အသုံးပြုလိုပါသလား။
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="dialog = false">ပယ်ဖျက်</v-btn>
          <v-btn color="primary" @click="useAPI">အိုကေ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
let __checker;

export default {
  props: {
    loaded: { type: Boolean, required: true },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    useAPI() {
      localStorage.setItem("network_mode", "api");
      this.$router.go();
    },
    useRTDB() {
      localStorage.setItem("network_mode", "rtdb");
      this.$router.go();
    },
  },
  computed: {
    usingRTDB() {
      return this.$root["network_mode"] === "rtdb";
    },
  },
  watch: {
    loaded(value) {
      if (__checker) {
        clearTimeout(__checker);
        __checker = undefined;
      }
    },
  },
  mounted() {
    if (this.usingRTDB) {
      __checker = setTimeout(() => {
        this.dialog = true;
      }, 15000); // 15 seconds
    }
  },
};
</script>

<style>
</style>
