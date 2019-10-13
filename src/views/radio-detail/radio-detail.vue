<template>
	<div class="redio-detail">
		<music-list :title="dissInfo.radioName" :songs="songList" :bgImage="dissInfo.radioImg"/>
	</div>
</template>

<script src="./radio-detail.js"></script>

<style scoped lang="stylus" src="./radio-detail.styl"></style>