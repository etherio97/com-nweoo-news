<template>
  <v-menu-transition v-if="headlines.length" color="red darken-4" dark>
    <div class="ticker-wrap" :style="`top:${top};`">
      <div class="ticker" ref="ticker">
        <div class="ticker__item" v-for="(headline, i) in headlines" :key="i">
          {{ headline.title }}
        </div>
      </div>
    </div>
  </v-menu-transition>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HeadlineBar",

  props: {
    top: { default: "47" },
  },

  methods: {
    ...mapActions("articles", ["FETCH_HEADLINES"]),

    resync() {
      const el = this.$refs.ticker;
      if (!el) return;
      const ms = 15280 * this.headlines.length;
      el.style.animationDuration = el.style.webkitAnimationDuration = `${ms}ms`;
      // el.style.animationPlayState = "running";
    },
  },

  computed: mapState("articles", ["headlines"]),

  mounted() {
    this.FETCH_HEADLINES().finally(() => {
      this.loading = false;
      setTimeout(() => this.resync(), 800);
    });
  },
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

@-webkit-keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

.ticker-wrap {
  display: sticky;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 47px;
  overflow: hidden;
  height: 2rem;
  background-color: #880000;
  padding-top: 2px;
  padding-left: 100%;
  box-sizing: content-box;

  .ticker {
    display: inline-block;
    height: 2rem;
    line-height: 2rem;
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-name: ticker;
    animation-name: ticker;
    -webkit-animation-duration: 30s;
    animation-duration: 30s;
    animation-play-state: running;

    &__item {
      display: inline-block;
      padding: 0 2rem;
      font-size: 1rem;
      color: white;
      z-index: 1;
      &::before {
        content: "•";
        padding-right: 5px;
      }
    }
    &:hover {
      animation-play-state: paused;
    }
  }
}
</style>
