<template>
  <v-menu-transition color="red darken-4" dark>
    <div class="ticker-wrap" :style="`top:${top};`">
      <div class="ticker" ref="ticker">
        <template v-if="headlines.length">
          <div class="ticker__item" v-for="(headline, i) in headlines" :key="i">
            <span class="font-weight-bold">{{ headline.title }}</span>
          </div>
        </template>
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
    resync() {
      const el = this.$refs.ticker;
      if (!el) return;
      const duration = 15.2 * this.headlines.length;
      el.style.animationDuration =
        el.style.webkitAnimationDuration = `${duration}s`;
      el.style.animationPlayState = el.style.webkitAnimationPlayState =
        "running";
    },
  },
  computed: mapState("articles", ["headlines"]),
  watch: {
    headlines() {
      this.resync();
    },
  },
};
</script>

<style scoped lang="scss">
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
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;

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
