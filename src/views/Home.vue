<template>
  <v-container class="mb-12">
    <v-row class="mt-2">
      <v-col cols="12">
        <h2 class="text-h6 mm-font">
          ဖေဖော်ဝါရီလ(၁)ရက် မှ {{ formatDate(updatedAt) }} ထိ
        </h2>
        <p class="text-body-1 mt-2">
          ဖမ်းစီးထိန်းသိမ်းကျဆုံးမှုများ
        </p>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-4"
          title="သေဆုံးသူ"
          :total="today.death"
          :count="death"
          :to="{ name: 'FallenStars' }"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-3"
          title="ဖမ်းစီးခံရသူ"
          :total="arrestedToday"
          :count="detention + released"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-2"
          title="ထိန်းသိမ်းထားသူ"
          :total="today.detention"
          :count="detention"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red darken-1"
          title="လွတ်မြောက်လာသူ"
          :total="today.released"
          :count="released"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red"
          title="ရှောင်တိမ်းနေရသူ"
          :total="today.warrant"
          :count="warrant"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="red lighten-1"
          title="ပြစ်ဒဏ်ချမှတ်ခံရသူ "
          :total="today.sentenced"
          :count="sentenced"
          :loading="loading"
        />
      </v-col>
    </v-row>
    <v-divider class="mt-5"></v-divider>
    <v-row>
      <v-col cols="12">
        <p class="text-body-1 mt-2">
          CDM တွင်ပါ၀င်လာသူများ
        </p>
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-4"
          title="အစိုးရဝန်ထမ်းများ"
          :total="cdm.participant"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-3"
          title="ကျွမ်းကျင်မှု/ရာထူး"
          :total="cdm.position"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-2"
          title="အစိုးရဌာနများ"
          :total="cdm.sector"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-2"
          title="ဝန်ကြီးဌာန"
          :total="cdm.ministry"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-1"
          title="မြို့နယ်"
          :total="cdm.cityAndDistrict"
          :loading="loading"
        />
      </v-col>
      <v-col :cols="col[0]" :sm="col[1]" :md="col[2]" :lg="col[3]" :xl="col[4]">
        <statistic-card
          color="blue darken-1"
          title="ပြည်နယ်/တိုင်း"
          :total="cdm.stateAndRegion"
          :count="sentenced"
          :loading="loading"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { backDate, formatDate } from "@/functions/burmeseDate";
import StatisticCard from "../components/StatisticCard.vue";
import { getURL, getStatisticURL } from "../functions/database";

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
  }),
  methods: {
    fetchTodayStatistic() {
      return this.axios(getStatisticURL()).then((res) => res.data);
    },
    fetchYesterdayStatistic() {
      return this.axios(getStatisticURL(1)).then((res) => res.data);
    },
    fetchDayBeforeYesterday() {
      return this.axios(getStatisticURL(2)).then((res) => res.data);
    },
    formatDate,
  },
  async beforeMount() {
    this.cdm = await fetchCDM(this.axios);
    this.updatedAt = backDate(0);
    this.today = await this.fetchTodayStatistic();
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
};
</script>
