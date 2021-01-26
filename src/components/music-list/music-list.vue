<template>
  <div class="music-list pos-rel" v-show="songs.length">
    <div class="music-top pos-rel">
      <div class="music-title flex-box flex-align-center">
        <div class="back flex-box flex-align-center flex-cont-center">
          <i class="icon-back" @click="back"></i>
        </div>
        <div class="title">{{title}}</div>
      </div>
      <div class="music-bg pos-abs" :style="`background-image: url(${bgImage})`"></div>
      <div class="play-wapper pos-abs">
        <div class="play flex-box flex-align-center flex-cont-center" @click="randomAll">
          <i class="icon-play"></i>
          <span class="text" v-if="isRadio">播放全部</span>
          <span class="text" v-else>{{playing? '添加': '播放'}}全部</span>
        </div>
      </div>
	    <div class="reload pos-abs" v-if="isRadio" @click="reloadRadio">
		    <span>换一换</span>
	    </div>
    </div>
    <div class="song-list-wrapper pos-abs">
      <scroller ref="mescroll">
        <song-list :songs="songs" :class="showPlayer? 'mini-show': ''"></song-list>
      </scroller>
    </div>
  </div>
</template>

<script src="./music-list.js"></script>

<style lang="stylus" scoped src="./music-list.styl"></style>