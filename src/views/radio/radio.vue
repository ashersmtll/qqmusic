<template>
	<div class="radio">
		<div class="item-lists" v-for="item in radioList" :key="item.type">
			<p class="item-title flex-box flex-align-center"><span class="title">{{item.name}}</span></p>
			<ul class="lists flex-box flex-wrap flex-align-center">
				<li class="list flex-box" v-for="list in item.radioList" :key="list.radioId" @click="goto(list)">
					<img class="item-img" :alt="list.radioName" v-lazy="list.radioImg">
					<div class="song-list flex-box flex-column flex-cont-btw">
						<h2 class="song flex-box">{{list.radioName}}</h2>
						<span class="num">播放{{(list.listenNum / 10000).toFixed(1)}}万</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script src="./radio.js"></script>

<style scoped lang="stylus" src="./radio.styl"></style>