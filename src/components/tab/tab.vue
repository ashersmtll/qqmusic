<template>
  <div class="tab flex-box">
    <router-link tag="div" class="tab-item" v-for="(item , i) in tabs" :to="item.url" :key="i">
      <span class="tab-link">{{item.name}}</span>
    </router-link>
  </div>
</template>

<script src="./tab.js"></script>

<style scoped lang="stylus" src="./tab.styl"></style>