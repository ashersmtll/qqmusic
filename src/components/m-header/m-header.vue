<template>
  <div class="m-header flex-box flex-align-center flex-cont-btw">
	  <div class="title flex-box flex-align-center">
		  <div class="icon"></div>
		  <h1 class="text">我的音乐</h1>
	  </div>
    <router-link tag="div" class="mine pos-rel" :to="LINK.user">
	    <!--<i class="icon-mine pos-abs"></i>-->
	    <span>免责声明</span>
    </router-link>
  </div>
</template>

<script src="./m-header.js"></script>

<style scoped lang="stylus" src="./m-header.styl"></style>