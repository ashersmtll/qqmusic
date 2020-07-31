<template>
	<div class="player">
		<audio
			preload="metadata"
			ref="audio"
			@canplay="ready"
			@error="error"
			@timeupdate="updateTime"
			@ended="end"
			@waiting="waiting"
			:src="currentSong.url"
		>
		</audio>
		<transition name="mini">
			<div class="mini-player pos-fixed box-size flex-box flex-align-center" v-show="playlist.length">
				<div class="progress-bar-wrapper pos-abs">
					<progress-bar :percent="percent" @percent-change="percentChange"></progress-bar>
				</div>
				<div class="mini-img" >
					<div class="imgWrapper" ref="miniWrapper" @click="downLyc(currentSong.mid)">
						<img ref="miniImage" :class="rotate" :src="currentSong.image">
					</div>
				</div>
				<div class="text">
					<div class="flex-box flex-align-center flex-cont-btw">
						<h2 class="name" v-html="currentSong.name"></h2>
						<span v-if="songWait">加载中...</span>
					</div>
					<p class="desc flex-box flex-align-center flex-cont-btw">
						<span class="songer-name" v-html="currentSong.singer"></span>
						<span class="time">{{formatTime(currentTime)}}/{{formatTime(currentSong.duration)}}</span>
					</p>
				</div>
				<div class="control flex-box flex-align-center flex-nowrap flex-cont-btw">
					<div class="icon" :class="disable" @click="prev">
						<i class="icon-prev"></i>
					</div>
					<div class="icon" @click.stop="togglePlay">
						<i class="icon-mini" :class="mIconPlay"></i>
					</div>
					<div class="icon" :class="disable" @click="next">
						<i class="icon-next"></i>
					</div>
					<div v-if="!isRadio" class="icon" @click.stop="showPlaylist">
						<i class="icon-playlist"></i>
					</div>
				</div>
			</div>
		</transition>
		<playlist ref="playlist"></playlist>
	</div>
</template>

<script src="./player.js"></script>

<style lang="stylus" scoped src="./player.styl"></style>