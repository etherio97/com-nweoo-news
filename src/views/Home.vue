<template>
  <v-container class="mb-12">
    <v-row class="mt-2">
      <v-col cols="8">
        <h2 class="text-h6 mm-font">
          {{$t('feb_1')}} {{$t('from')}} {{ getDate(updatedAt) }} {{$t('to')}}
        </h2>
        <p class="text-body-1 mt-2">
          {{$t('deaths_or_detained')}}
        </p>
      </v-col>
      <v-col cols="4">
        <v-select
          label="language"
          dense
          outlined
          :items="languages"
          v-model="current_language"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-4"
          :title="$t('deaths')"
          :total="today.death"
          :count="death"
          :to="{ name: 'FallenStars' }"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-3"
          :title="$t('arrested')"
          :total="arrestedToday"
          :count="detention + released"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-2"
          :title="$t('detained')"
          :total="today.detention"
          :count="detention"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-1"
          :title="$t('survivors')"
          :total="today.released"
          :count="released"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red"
          :title="$t('who_avoided')"
          :total="today.warrant"
          :count="warrant"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red lighten-1"
          :title="$t('who_punished')"
          :total="today.sentenced"
          :count="sentenced"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
    </v-row>
    <v-divider class="mt-5"></v-divider>
    <v-row>
      <v-col cols="12">
        <p class="text-body-1 mt-2">
          {{$t('people_in_cdm')}}
        </p>
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-4"
          :title="$t('goverment_employees')"
          :total="cdm.participant"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-3"
          :title="$t('positon')"
          :total="cdm.position"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-2"
          :title="$t('offices')"
          :total="cdm.sector"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-2"
          :title="$t('ministry')"
          :total="cdm.ministry"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-1"
          :title="$t('township')"
          :total="cdm.cityAndDistrict"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-1"
          :title="$t('state')"
          :total="cdm.stateAndRegion"
          :count="sentenced"
          :loading="loading"
          :locale="locale"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { backDate, formatDate } from "@/functions/burmeseDate";
import engFormatDate from '@/functions/normalDate';
import StatisticCard from "../components/StatisticCard.vue";
import { getURL, getStatisticURL } from "../functions/database";
import { getLocale } from '../i18n';

const components = {
  StatisticCard,
};

function fetchCDM(axios) {
  return axios(getURL("v0/cdm")).then((res) => res.data);
}

export default {
  name: "Home",
  components,
  data: () => ({
    loading: true,
    col: [6, 4, 4, 2, 2],
    cdm: {},
    today: {},
    yesterday: {},
    updatedAt: null,
    locale: '',
    languages : ['English','Myanmar Uni'],
    current_language : null
  }),
  methods: {
    changeLocale (locale) {
      this.$i18n.locale = locale;
      window.localStorage.setItem('lang',locale);
      this.$router.go();
    },
    fetchTodayStatistic() {
      return this.axios(getStatisticURL()).then((res) => res.data);
    },
    fetchYesterdayStatistic() {
      return this.axios(getStatisticURL(1)).then((res) => res.data);
    },
    fetchDayBeforeYesterday() {
      return this.axios(getStatisticURL(2)).then((res) => res.data);
    },
    getDate(updatedAt) {
      switch (this.locale) {
        case 'mm':
          return formatDate(updatedAt);
        case 'eg':
          return engFormatDate(updatedAt);
      }
    }
  },
  async beforeMount() {
    this.cdm = await fetchCDM(this.axios);
    this.updatedAt = backDate(0);
    this.today = await this.fetchTodayStatistic();
    this.locale = getLocale();
    if (!this.today) {
      this.updatedAt = backDate(1);
      this.today = (await this.fetchYesterdayStatistic()) || {};
      this.yesterday = (await this.fetchDayBeforeYesterday()) || {};
    } else {
      this.yesterday = (await this.fetchYesterdayStatistic()) || {};
    }
    this.loading = false;
  },
  computed: {
    death() {
      return (
        parseInt(this.today.death || 0) - parseInt(this.yesterday.death || 0)
      );
    },
    arrestedToday() {
      return (
        parseInt(this.today.detention || 0) + parseInt(this.today.released || 0)
      );
    },
    arrestedYesterday() {
      return (
        parseInt(this.yesterday.detention || 0) +
        parseInt(this.yesterday.released || 0)
      );
    },
    detention() {
      return (
        parseInt(this.today.detention || 0) -
        parseInt(this.yesterday.detention || 0)
      );
    },
    released() {
      return (
        parseInt(this.today.released || 0) -
        parseInt(this.yesterday.released || 0)
      );
    },
    sentenced() {
      return (
        parseInt(this.today.sentenced || 0) -
        parseInt(this.yesterday.sentenced || 0)
      );
    },
    warrant() {
      return (
        parseInt(this.today.warrant || 0) -
        parseInt(this.yesterday.warrant || 0)
      );
    },
  },
  watch: {
    current_language: function() {
      console.log("language changed");
      if(this.current_language == 'English') {
        this.changeLocale('eg');
      } else if(this.current_language == 'Myanmar Uni') {
        this.changeLocale('mm');
      }
    }
  }
};
</script>
