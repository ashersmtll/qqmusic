<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress pos-abs" ref="progress"></div>
      <div
        class="progress-btn-wrapper pos-abs"
        ref="progressBtn"
      >
      </div>
    </div>
  </div>
</template>

<script src="./progress-bar.js"></script>

<style scoped lang="stylus" src="./progress-bar.styl"></style>