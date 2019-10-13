<template>
	<ul class="song-list">
		<li class="item flex-box flex-align-center" v-for="(song, index) in songs" :key="index">
			<span class="text">{{index + 1}}</span>
			<div class="content">
				<h2 class="name">{{song.name}}</h2>
				<p class="desc">{{song.singer}} - {{song.album.name}}</p>
			</div>
			<div class="action flex-box flex-align-center flex-cont-ard">
				<span v-if="song.id === currentSong.id" class="current-play">播放</span>
				<span v-else class="start-play" @click="playSelectSong(song)">播放</span>
				<div v-if="!isRadio">
					<span v-if="isAdd(song)" class="del-song-list" @click="deleteSong(song)">移除</span>
					<span v-else class="add-song-list" @click="addSong(song)">添加</span>
				</div>
			</div>
		</li>
	</ul>
</template>

<script src="./song-list.js"></script>

<style scoped lang="stylus" src="./song-list.styl"></style>