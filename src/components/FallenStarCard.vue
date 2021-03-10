<template>
  <v-card>
    <v-img :src="image"></v-img>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-subtitle>
      <v-chip class="ma-1" color="grey darken-2" dark small>{{ num(age) }} နှစ်</v-chip>
    </v-card-subtitle>
    <v-card-subtitle>
    <v-chip class="ma-1" color="primary" small>{{ region }}</v-chip>
    <v-chip class="ma-1" color="primary lighten-2" small>{{ date }}</v-chip>
    <v-chip v-show="reason" class="ma-1" color="primary darken-2" small>{{ reason }}</v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { convertDate, convertMonth } from "../functions/burmeseDate";
import burmeseNumber from "../functions/burmeseNumber";
import avatar from "../assets/avatar.png";

export default {
  name: "FallenStarCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    district: {
      type: String,
    },
    reason: {
      type: String,
    },
    remarks: {
      type: String,
    },
    image: {
      type: String,
      default: avatar,
    },
  },

  methods: {
    num: burmeseNumber,
  },

  computed: {
    date() {
      const d = new Date(parseInt(this.id));
      return `${convertMonth(d.getMonth())}လ (${convertDate(d.getDate())}) ရက်`;
    },
  },
};
</script>
