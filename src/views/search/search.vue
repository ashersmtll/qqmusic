<template>
  <div class="search">
    <div class="search-box-wapper">
      <div class="search-box flex-box flex-align-center">
        <i :class="`icon-search ${query !== '' && 'search-color'}`" @click="submitSearch"></i>
        <input v-model="query" class="box" :placeholder="placeholder" @change.enter="submitSearch">
        <i @click="clear" :class="`icon-dismiss ${query !== '' && 'icon-clean'}`" v-show="query"></i>
      </div>
    </div>
    <div class="hot-key">
      <h2 class="title">热门搜索</h2>
      <ul>
        <li @click="addKey(item.k)" class="item"  v-for="(item, index) in hotKeys" :key="index">
          {{item.k}}
        </li>
      </ul>
    </div>
    <div class="search-content">
      <song-list :songs="songList" :class="showPlayer? 'mini-show': ''"></song-list>
    </div>
  </div>
</template>

<script src="./search.js"></script>

<style lang="stylus" scoped src="./search.styl"></style>