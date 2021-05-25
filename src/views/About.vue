<template>
  <v-container class="mt-4">
    <h1 class="h4">ကျွန်ုပ်တို့အကြောင်း</h1>
    <div class="mt-4">
      <h2 class="py-2 h3">သတင်းများတင်ဆက်မှု</h2>
      <p class="body-1 mt-2">
        ယုံကြည်စိတ်ရသောသတင်းဌာနများမှ သတင်းများကို ကွန်ပျူတာပရိုဂရမ် (Bot) ဖြင့်
        RSS Feed များမှတဆင့် အလိုအလျှောက်စောင့်ကြည့်ထားပြီး
        <a href="https://nweoo.com">nweoo.com</a> တွင်လည်းကောင်း၊
        <a href="https://fb.me/nweoo22222" target="_blank" rel="no referral">
          Facebook Page
        </a>
        တွင်လည်းကောင်း၊
        <a href="https://t.me/nweoonews" target="_blank" rel="no referral">
          Telegram Channel
        </a>
        တွင်လည်းကောင်းပြန်လည်ကူးယူဖော်ပြထားခြင်းဖြစ်ပါသည်။
      </p>
    </div>
    <div class="mt-4">
      <h4 class="py-2 h5">လက်ရှိစောင့်ကြည့်ထားသောသတင်းဌာနများ</h4>
      <v-row>
        <v-col cols="6" sm="4">
          <a href="https://burmese.dvb.no" rel="noreferral" target="_blank">
            <v-img src="/images/logo/dvb.png" contain></v-img>
          </a>
        </v-col>
        <v-col cols="6" sm="4">
          <a href="https://rfa.org/burmese" rel="noreferral" target="_blank">
            <v-img src="/images/logo/rfa.png" contain></v-img>
          </a>
        </v-col>
        <v-col cols="6" sm="4">
          <a
            href="https://burmese.voanews.com"
            rel="noreferral"
            target="_blank"
          >
            <v-img src="/images/logo/voa.png" contain></v-img>
          </a>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "About",
};
</script>
