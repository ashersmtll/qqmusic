<template>
  <div id="app">
    <mHeader></mHeader>
    <tab></tab>
	  <transition name="slide">
	    <keep-alive>
	      <router-view class="contents" :font_size="font_size" :class="showPlayer? 'mini-show': ''"/>
	    </keep-alive>
	  </transition>
    <loading v-if="loading"/>
    <player ref="play"></player>
  </div>
</template>

<script>
import mHeader from './components/m-header/m-header.vue';
import Tab from './components/tab/tab.vue';
import loading from './base/loading/loading.vue';
import Player from './components/player/player.vue';
import {mapGetters} from 'vuex';
export default {
  name: 'App',
  components: {
    mHeader,
    Tab,
    loading,
    Player
  },
	data() {
  	return {
		  font_size: 14,
	  }
	},
  computed: {
    ...mapGetters(['showPlayer', 'loading'])
  },
  created() {
    this.customFontSize();
    window.addEventListener('resize', this.customFontSize, false);
	  document.addEventListener('click', this._, false);
	  document.addEventListener('touchend', this._, false);
  },
  methods: {
  	_(){
		  document.getElementById('openplayapi').play();
		  document.removeEventListener('click', this._);
		  document.removeEventListener('touchend', this._);
	  },
    customFontSize() {
  	  let w = window.innerWidth || document.documentElement.clientWidth,
      h = window.innerHeight || document.documentElement.clientHeight,
      fsize = (w >= h? h / 12: w / 7.5);
      this.font_size = fsize;
      document.documentElement.style.fontSize = fsize + 'px';
    }
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.customFontSize);
  }
};
</script>

<style lang="stylus">
	#app {
		position fixed;
		height 100%;
		width 100%;
		overflow hidden;
	}
	.contents{
		height calc(100% - 1.68rem);
		overflow-y auto;
    position absolute;
    top 1.68rem;
    left 0;
    width 100%;
	}
/*	.slide-enter-active, .slide-leave-active{
		transition: all .3s;
	}
	.slide-enter, .slide-leave-to{
		opacity 0
	}*/
  .slide-enter-active{
    animation fadeInRight .3s;
  }
  .slide-leave-active{
    animation fadeOutLeft .3s;
  }
  @keyframes fadeInRight {
    0% {
      transform translateX(100%);
    }
    to {
      transform translateX(0);
    }
  }
  @keyframes fadeOutLeft {
    0% {
      transform translateX(0);
    }
    to {
      transform translateX(-100%);
    }
  }
</style>

