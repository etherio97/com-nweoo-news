<template>
  <v-card>
    <v-img :src="image"></v-img>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-subtitle>
      {{ num(age) }} နှစ်
      <div class="my-4 subtitle-1">{{ date }}</div>
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
