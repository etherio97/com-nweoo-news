<template>
  <v-container class="mt-10">
    <v-dialog v-model="selected">
      <v-card>
        <v-card-subtitle>
          <v-row class="pa-4">
            <h2 class="pt-2">{{ selectedTitle }}</h2>
            <v-spacer></v-spacer>
            <v-btn icon @click="selected = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-row>
          <v-divider></v-divider>
        </v-card-subtitle>
        <v-card-text>
          <v-img :src="selectedImage"></v-img>
          <div class="mt-4" v-html="selectedDescription"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <h2>စာတိုဝန်ဆောင်မှု</h2>
        <h3 class="grey--text">SMS Services</h3>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card elevation="12" @click="viewSMSReporter">
          <v-img :src="SMSReporter" height="360px"></v-img>
          <v-card-title>သတင်းများပေးပို့ခြင်း</v-card-title>
          <v-card-subtitle>
            <a href="#" class="blue--text"> #NweOoSMSReporter </a>
          </v-card-subtitle>
          <v-card-text ref="smsreporter">
            <p>
              SMS ပေးပို့ပြီး
              <a
                href="https://fb.me/nweoo22222"
                ref="no referral"
                target="_blank"
              >
                NweOo Facebook Page
              </a>
              ပေါ် တိုက်ရိုက်သတင်းများ တင်နိုင်ပါတယ်။ ပို့တဲ့အခါ
              <code>#nweoo</code> ပါမှ အလိုအလျောက် အွန်လိုင်းပေါ်
              တင်ပေးနေတာဖြစ်တဲ့အတွက် ပို့တဲ့အခါထည့်သွင်းမမေ့ဖို့အရေးကြီးပါတယ်။
            </p>
            <p>
              စမ်းသပ်ချင်တဲ့သူတွေ စမ်းပြီးတင်လို့ရအောင်လို့
              ကိုယ့်ဘာသာပြန်ဖျက်လို့ရတဲ့စနစ်ကို ထည့်သွင်းပေးထားပါတယ်။
              ပြန်ဖျက်ချင်တယ်ဆို တင်ပြီးသွားတဲ့ပိုစ့်မှာ
              <strong>report or delete this post</strong> ဆိုပြီး report
              ထုတဲ့လင့်ခ် ထည့်သွင်းပေးထားပါတယ်။ ဒါမှမဟုတ်
              <a href="/articles">ပေးပို့ချက်များ</a> ကနေတဆင့်ကိုယ်ပို့ခဲ့တဲ့
              message ကို ရှာပြီးပြန်ဖျက်လို့ရပါတယ်။
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card elevation="12" @click="viewSMSBot">
          <v-img :src="SMSBot" height="360px"></v-img>
          <v-card-title>သတင်းများရယူခြင်း</v-card-title>
          <v-card-subtitle>
            <a href="#" class="blue--text"> #NweOoSMSBot </a>
          </v-card-subtitle>
          <v-card-text ref="smsbot">
            <p>
              SMS ပို့ပြီးသတင်းတွေရယူလိုတယ်ဆိုရင်တော့
              <strong><code>news</code></strong> ဒါမှမဟုတ်
              <strong><code>သတင်း</code></strong>
              လို့ပို့ပြီးသတင်းများရယူနိုင်ပါတယ်။
            </p>
            <p>
              သတင်းတစ်ခါရယူရင် သတင်းခေါင်းစဥ် ၃ ခုကို ၃
              စောင်နှုန်းနဲ့ပြန်ပို့ပါတယ်။ SMS နဲ့ ပို့ရတဲ့အတွက်
              အချိန်ကြာမြင့်တတ်တာကြောင့် တစ်စောင်နဲ့တစ်စောင်
              ခြားပြီးပို့စောင်ပေးပါ။
            </p>
            <p>
              <i>**​Telenor များသာ**</i>
              <br />
              <i>**ဇော်ဂျီဖောင့်အသုံးမပြုပါ။</i>
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- notice -->
      <v-col cols="12">
        <v-alert type="info">
          ပို့ရမဲ့ဖုန်းနံပါတ်ကို
          <a
            class="link text-decoration-underline"
            target="_blank"
            rel="no referral"
            href="https://m.me/nweoo22222"
            >Facebook Messenger</a
          >
          က တဆင့်ရယူနိုင်ပါတယ်။ နှစ်ခုစလုံး ပို့ရမဲ့ ဖုန်းနံပါတ်က အတူတူပါပဲ။
        </v-alert>
      </v-col>

      <!-- keywords -->
      <v-col cols="12" class="mt-2" ref="keywords">
        <a href="javascript:void(0);" id="keywords">
          <h2 class="mt-1 mb-2">အသုံးပြုနိုင်သော စကားလုံးများ</h2>
        </a>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-center">English</th>
              <th class="text-center">မြန်မာ (Unicode)</th>
              <th class="text-center">ရရှိမှု</th>
              <th>ဖော်ပြချက်</th>
            </tr>
          </thead>
          <tr>
            <td colspan="4" class="py-2 pl-4 title">v1.2 (current)</td>
          </tr>
          <tr>
            <td class="text-center">
              <code>info</code>
            </td>
            <td class="text-center"></td>
            <td class="text-center"><v-icon>mdi-check</v-icon></td>
            <td class="text-left">
              <p>ပြန်လည်ပို့စောင်ပေးမည့်အစောင်အရေအတွက်ကိုသိရှိရန်</p>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="py-2 pl-4 title">v1.1</td>
          </tr>
          <tr>
            <td class="text-center">
              <code>news</code>
            </td>
            <td class="text-center">
              <code>သတင်း</code>
            </td>
            <td class="text-center">
              <v-icon>mdi-check</v-icon>
            </td>
            <td>
              <p>သတင်းခေါင်းစဥ်များရယူရန်</p>
            </td>
          </tr>
          <tr>
            <td class="text-center"><code>help</code></td>
            <td class="text-center">
              <code>ကူညီ</code>
            </td>
            <td class="text-center">
              <v-icon>mdi-close</v-icon>
            </td>
            <td>
              <p>ပို့ဆောင်နိုင်သော စကားလုံးများကို သိရှိရန်</p>
            </td>
          </tr>
          <tr>
            <td class="text-center">
              <code>reset</code>
            </td>
            <td class="text-center">
              <code>ပြန်စ</code>
            </td>
            <td class="text-center">
              <v-icon>mdi-close</v-icon>
            </td>
            <td>
              <p>သတင်းများကို အစမှပြန်လည်ရယူရန်</p>
            </td>
          </tr>
          <tr>
            <td class="py-2 pl-4 title">v1.0</td>
          </tr>
          <tr>
            <td class="text-center">
              <code>read <i>&lt;id&gt;</i></code>
            </td>
            <td class="text-center">
              <code><i>&lt;id&gt;</i> ဖတ်ရန်</code>
            </td>
            <td class="text-center">
              <v-icon>mdi-close</v-icon>
            </td>
            <td>
              <p>
                သတင်းဆောင်းပါးအပြည့်အစုံကိုဖတ်ရန်။<br />
                <i>
                  <code>&lt;id&gt;</code> ဆိုတဲ့နေရာမှာ
                  သတင်းခေါင်းစဉ်ရဲ့အမှတ်စဉ်ကိုအစားသွင်းရမှာပါ။
                </i>
              </p>
            </td>
          </tr>
          <tr>
            <td class="text-center">
              <code>count</code>
            </td>
            <td class="text-center">
              <code>ကျန်သေးလား</code>
            </td>
            <td class="text-center">
              <v-icon>mdi-check</v-icon>
            </td>
            <td>
              <p>ကျန်ရှိသည့်သတင်းအရေအတွက်ကိုသိရှိရန်</p>
            </td>
          </tr>
        </v-simple-table>
      </v-col>

      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <!-- rate limits -->
      <v-col cols="12" class="mt-2" ref="rateLimits">
        <a href="javascript:void(0);" id="rate-limits">
          <h2 class="mb-2 mt-1">သတ်မှတ်ထားသော ကန့်သတ်ချက်များ</h2>
        </a>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-center">အမျိုးအစား</th>
              <th class="text-center">အတိုင်းအတာ</th>
              <th class="text-center">အရေအတွက်</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <p>ဝင်စာ</p>
              </td>
              <td class="text-center">
                <p><code>၃၀ စက္ကန့်</code> အတွင်း</p>
              </td>
              <td class="text-center">
                <p><code>၁</code> စောင်</p>
              </td>
            </tr>

            <tr>
              <td class="text-center">
                <p>ပြန်စာ</p>
              </td>
              <td class="text-center">
                <p><code>၁ နာရီ</code> အတွင်း</p>
              </td>
              <td class="text-center">
                <p><code>၁၂</code> စောင်</p>
              </td>
            </tr>

            <tr>
              <td class="text-center">
                <p>ပြန်စာ</p>
              </td>
              <td class="text-center">
                <p><code>၂၄ နာရီ</code> အတွင်း</p>
              </td>
              <td class="text-center">
                <p><code>၆၀</code> စောင်</p>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>

      <!-- updated at -->
      <v-col cols="12">
        <p>
          နောက်ဆုံးပြောင်းသည့်နေ့
          <code>{{ new Date("2021-05-03T04:41Z").toLocaleString() }}</code>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SMSBot from "@/assets/images/smsbot-cover.jpg";
import SMSReporter from "@/assets/images/sms-reporting-ads.jpg";

export default {
  data: () => ({
    SMSReporter,
    SMSBot,
    selected: false,
    selectedTitle: "",
    selectedImage: "",
    selectedDescription: "",
  }),
  methods: {
    viewSMSBot({ target }) {
      this.selectedTitle = "သတင်းများရယူခြင်း";
      this.selectedImage = SMSBot;
      this.selectedDescription = `${this.$refs["smsbot"].innerHTML}
<br><hr><br>
${this.$refs["keywords"].innerHTML}
<br><hr><br>
${this.$refs["rateLimits"].innerHTML}`;
      this.selected = true;
    },
    viewSMSReporter({ target }) {
      this.selectedTitle = "သတင်းများပေးပို့ခြင်း";
      this.selectedImage = SMSReporter;
      this.selectedDescription = this.$refs["smsreporter"].innerHTML;
      this.selected = true;
    },
  },
};
</script>


<style scoped>
.link {
  color: rgb(255, 255, 255);
}

.link:hover {
  color: rgb(182, 182, 182);
}
</style>
