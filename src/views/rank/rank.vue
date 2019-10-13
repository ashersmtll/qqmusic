<template>
  <div class="rank" v-if="topLists.length">
    <div class="item-lists" v-for="item in topLists" :key="item.id">
      <p class="item-title flex-box flex-align-center"><span class="title">{{item.name}}</span></p>
      <ul class="lists">
        <li class="list flex-box" v-for="list in item.lists" :key="list.id" @click="goto(list)">
          <img class="item-img" :alt="list.title" v-lazy="list.picUrl">
          <div class="song-list">
            <h2 class="song flex-box" v-for="(song, i) in list.song" :key="song.rank">
              <span class="num">{{i + 1}}</span>
              <b class="song-name">{{song.title}}</b>
            </h2>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./rank.js"></script>

<style lang="stylus" scoped src="./rank.styl"></style>