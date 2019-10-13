<template>
	<div class="home">
		<div class="item-lists" v-if="playList.length">
			<p class="item-title flex-box flex-align-center"><span class="title">网络歌曲推荐</span></p>
			<ul class="lists flex-box flex-wrap">
				<li class="item-box" v-for="(item, i) in playList" :key="i">
					<img @click="goto(item)" class="item-img" :alt="item.title" v-lazy="item.cover_url_small">
					<h2 class="title">{{item.title}}</h2>
					<span class="desc">播放：{{(item.access_num / 10000).toFixed(1)}}万</span>
				</li>
			</ul>
		</div>
		<div class="item-lists" v-if="toplist.length">
			<p class="item-title flex-box flex-align-center"><span class="title">歌曲飙升榜</span></p>
			<ul class="lists flex-box flex-wrap">
				<li class="item-box" v-for="(item, i) in toplist" :key="i" @click="addSong(item)">
					<img class="item-img" :alt="item.title" v-lazy="item.image">
					<h2 class="title">{{item.name}}</h2>
					<span class="desc">{{item.singer}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script src="./home.js"></script>

<style scoped lang="stylus" src="./home.styl"></style>