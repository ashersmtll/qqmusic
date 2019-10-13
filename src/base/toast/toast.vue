<template>
	<transition name="fade">
		<div class="toast" v-if="show" v-html="message"></div>
	</transition>
</template>

<script src="./toast.js"></script>

<style scoped lang="stylus" src="./toast.styl"></style>