<template>
  <v-card>
    <v-img :src="image" v-if="image" />
    <v-card-title class="mb-2">
      <v-chip class="ma-1" color="red darken-2" dark small>
        {{ num(age) }} {{ $t("year") }}
      </v-chip>
      <h4 class="text-subtitle-1 font-weight-bold text--darken-4">
        {{ name }}
      </h4>
    </v-card-title>
    <v-card-subtitle>
      <v-chip
        class="my-1 mr-1"
        color="grey  darken-1"
        dark
        small
        @click="filterByDate(deceased)"
      >
        {{ deceased }}
      </v-chip>
      <v-chip
        class="my-1 mr-1"
        color="grey  darken-1"
        dark
        small
        @click="filterByRegion(region)"
      >
        {{ region }}
      </v-chip>
    </v-card-subtitle>
    <v-expansion-panels v-if="remarks">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h4 class="text-caption text-body-1 font-weight-bold">
            {{ (remarks || "").slice(0, 20) }}..
          </h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="text-caption">
          {{ remarks }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { convertDate, convertMonth } from "../functions/burmeseDate";
import burmeseNumber from "../functions/burmeseNumber";
//import avatar from "../assets/avatar.png";

export default {
  name: "FallenStarCard",
  props: {
    deceased: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    sr: {
      type: String,
    },
    cd: {
      type: String,
    },
    remarks: {
      type: String,
    },
    image: {
      type: String,
      //default: avatar,
    },
    filterByDate: {
      type: Function,
      required: true,
    },
    filterByRegion: {
      type: Function,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    filtered: {
      date: false,
      region: false,
    },
  }),

  methods: {
    num(age) {
      switch (this.locale) {
        case "mm":
          return burmeseNumber(age);
        default:
          return age;
      }
    },
  },

  computed: {
    displayDate() {
      const d = new Date(this.date);
      return `${convertMonth(d.getMonth())}လ (${convertDate(d.getDate())}) ရက်`;
    },
    region() {
      return (
        (this.cd || "").replace(/township/i, "") +
        " " +
        (this.sr || "").replace(/(?:state|region)/i, "")
      );
    },
  },
};
</script>
