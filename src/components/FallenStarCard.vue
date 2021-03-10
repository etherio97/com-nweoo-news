<template>
  <v-card>
    <v-img :src="image" />
    <v-card-title class="mb-2">
      <h4 class="text-subtitle-1 font-weight-bold text--darken-4">
        {{ name }}
      </h4>
      <v-chip class="ma-1" color="red darken-2" dark small>
        {{ num(age) }} နှစ်
      </v-chip>
    </v-card-title>
    <v-card-subtitle>
      <v-chip
        class="my-1 mr-1"
        color="grey  darken-1"
        dark
        small
        @click="filterByDate(id)"
      >
        {{ date }}
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
            {{ reason }}
          </h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="text-caption">
          {{ remarks }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card-text v-else>
      <h4 class="text-caption text-body-1 font-weight-bold">
        {{ reason }}
      </h4>
    </v-card-text>
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
    filterByDate: {
      type: Function,
      required: true,
    },
    filterByRegion: {
      type: Function,
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
