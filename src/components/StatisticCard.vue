<template>
  <v-card :color="color" :dark="dark" :to="to" :loading="loading">
    <v-card-title>
      <div class="text-center font-weight-bold" style="width: 100%;">
        {{ loading ? "-" : toNumber }}
        <span v-if="parseInt(count)">{{ updated }}</span>
      </div>
    </v-card-title>
    <v-card-text class="text-center">{{ title }}</v-card-text>
  </v-card>
</template>

<script>
import burmeseNumber from "../functions/burmeseNumber";

export default {
  name: "StatisticCard",
  props: {
    to: {
      type: String,
      default: "",
    },
    dark: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "primary",
    },
    title: {
      type: String,
    },
    count: {
      type: [Number, String],
      default: 0,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    locale: {
      type: String,
      required: true
    }
  },
  computed: {
    toNumber() {
      switch (this.locale) {
        case 'mm':
          return burmeseNumber(parseInt(this.total).toLocaleString());
        default:
          return this.total.toLocaleString();
      }
    },
    updated() {
      let value = parseInt(this.count);
      value = value < 0 ? value * -1 : value;
      switch (this.locale) {
        case 'mm':
          return `${value ? "+" : ""}${burmeseNumber(value.toLocaleString())}`;
        default:
          return `${value ? "+" : ""}${value.toLocaleString()}`;
      }
    },
  },
};
</script>

<style scoped>
span {
  font-weight: normal;
  font-size: 0.8rem;
  letter-spacing: 2px;
}

span::before {
  content: "(";
}

span::after {
  content: ")";
}
</style>
