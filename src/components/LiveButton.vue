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
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <p class="body-1">
            လုပ်ဆောင်ချက်အချိန်ကြာမြင့်နေပါက Live Mode ကို ပိတ်ပြီးအသုံးပြုပါ။
          </p>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="grey lighten-1" @click="dialog = false">
            ပယ်ဖျက်
          </v-btn>
          <v-btn class="ml-2" color="red darken-2" dark @click="useAPI">
            Live Mode ပိတ်
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    loaded: { type: Boolean, required: true },
    timeout: { type: Number, default: 15000 },
    items: { type: Array, required: true },
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
  beforeMount() {
    this.usingRTDB = setTimeout(() => {
      this.dialog = this.items && !this.items.length;
    }, this.timeout);
  },
};
</script>

<style>
</style>
