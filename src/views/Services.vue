<template>
  <v-container class="mt-10">
    <v-row>
      <v-col cols="12">
        <h2>SMS Service</h2>
        <v-alert type="info">
          Facebook, Messenger က တဆင့်ရယူနိုင်ပါတယ်။ နှစ်ခုစလုံး ပို့ရမဲ့
          ဖုန်းနံပါတ်က အတူတူပါပဲ။
        </v-alert>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card elevation="12">
          <v-img
            src="@/assets/images/smsreporter-cover.jpg"
            height="360px"
          ></v-img>
          <v-card-title>သတင်းများပေးပို့ခြင်း</v-card-title>
          <v-card-subtitle>
            <a href="#" class="blue--text">
              #NweOoSMSReporter
            </a>
          </v-card-subtitle>
          <v-card-text>
            <p>
              SMS ပေးပို့ပြီး
              <a href="https://nweoo.com/fb" ref="no referral" target="_blank">
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
        <v-card elevation="12">
          <v-img src="@/assets/images/smsbot-cover.jpg" height="360px"></v-img>
          <v-card-title>သတင်းများရယူခြင်း</v-card-title>
          <v-card-subtitle>
            <a href="#" class="blue--text">
              #NweOoSMSBot
            </a>
          </v-card-subtitle>
          <v-card-text>
            <p>
              SMS ပို့ပြီးသတင်းတွေရယူလိုတယ်ဆိုရင်တော့
              <strong><code>news</code></strong> ဒါမှမဟုတ်
              <strong><code>သတင်း</code></strong>
              လို့ပို့ပြီးသတင်းများရယူနိုင်ပါတယ်။
              <i>**​Telenor များသာရပါတယ်။**</i>
            </p>
            <p>
              သတင်းတစ်ခါရယူရင် နောက်ဆုံးရသတင်းခေါင်းစဥ် (၅) ခုပြန်ပို့ပါတယ်။ SMS
              ဖြင့်ပို့ရတာဖြစ်တာအတွက် အချိန်ကြာမြင့်တတ်သလို
              မရောက်လာတာတွေလည်းရှိတတ်ပါတယ်။ Bot ကတော့မသိတဲ့အတွက် သတင်းခေါင်းစဥ်
              အခု (၃၀) မပြည့်သေးဘဲ
              <b>"သတင်းလက်ကျန်မရှိပါ။"</b> လို့ပို့တဲ့အခါ
              <strong><code>reset</code></strong> လို့ပို့ပြီး
              သတင်းခေါင်းစဥ်တွေကို အစကနေပြန်လည်ရယူနိုင်ပါတယ်။ reset ချတဲ့အခါ
              အစကနေပြန်ပို့တာကြောင့် သတင်းတွေထပ်နိုင်ပါတယ်။
            </p>
            <p>
              တခြားနံပါတ်နဲ့ ပြန်ပို့ပေးတဲ့အခါ အဲဒီနံပါတ်တွေကို မပို့ဘဲ
              ကြေငြာထားတဲ့နံပါတ်ကိုသာ ပို့ပေးပါ။
            </p>
            <p>
              <strong>
                လက်ရှိပို့ဆောင်နေသည့် သတင်းခေါင်းစဥ်များသည်
                <a
                  href="http://burmese.dvb.no/archives/category/news"
                  rel="no referral"
                  target="_blank"
                >
                  DVB
                </a>
                အွန်လိုင်းစာမျက်နှာပေါ်ရှိ သတင်းများသာဖြစ်ပြီး
                ပြန်လည်ကူးယူဖော်ပြထားခြင်းဖြစ်သာပါတယ်။
              </strong>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <h2>SMS Bot တွင် အသုံးပြုနိုင်သော စကားလုံးများ</h2>
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
            <td colspan="4" class="py-2 pl-4 title">
              v1.1 (current)
            </td>
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
              <p>
                သတင်းခေါင်းစဥ်တွေရယူရန်
              </p>
            </td>
          </tr>
          <tr>
            <td class="text-center"><code>help</code> or <code>info</code></td>
            <td class="text-center">
              <code>ကူညီ</code>
            </td>
            <td class="text-center">
              <v-icon>mdi-check</v-icon>
            </td>
            <td>
              <p>
                ပို့ဆောင်နိုင်သော စကားလုံးများကို သိရှိရန်
              </p>
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
              <v-icon>mdi-check</v-icon>
            </td>
            <td>
              <p>
                သတင်းများကို အစမှပြန်လည်ရယူရန်
              </p>
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
                သတင်းဆောင်းပါးအမှတ် &lt;id&gt; ကို အပြည့်အစုံဖတ်ရန်
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
              <v-icon>mdi-close</v-icon>
            </td>
            <td>
              <p>
                ကျန်ရှိသည့်သတင်းအရေအတွက်ကိုသိရှိရန်
              </p>
            </td>
          </tr>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Services",
  //
};
</script>
