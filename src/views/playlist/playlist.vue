<template>
	<div class="diss-list flex-box">
		<div class="lists-wapper flex-box">
			<div class="list-nav pos-rel">
				<scroller ref="nav">
					<ul class="silder" :class="showPlayer? 'mini-show': ''">
						<li class="item" @click="changeItem(i)" :class="{active: active === i}" v-for="(item, i) in listNav" :key="item.id">
							<span>{{item.name}}</span>
						</li>
					</ul>
				</scroller>
			</div>
			<div class="list-content pos-rel">
				<scroller ref="content">
					<ul class="content-wapper" :class="showPlayer? 'mini-show': ''">
						<li class="list flex-box" v-for="list in showList" :key="list.dissid" @click="goto(list)">
							<img class="item-img" :alt="list.name" v-lazy="list.imgurl" />
							<div class="song-list flex-box flex-column flex-cont-btw">
								<h2 class="song">{{list.name}}</h2>
								<span class="num">播放{{(list.listennum / 10000).toFixed(1)}}万</span>
							</div>
						</li>
					</ul>
				</scroller>
			</div>
		</div>
	</div>
</template>

<script src="./playlist.js"></script>

<style scoped lang="stylus" src="./playlist.styl"></style>