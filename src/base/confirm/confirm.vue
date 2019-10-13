<template>
  <transition name="confirm-fade">
    <div class="confirm" v-if="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate flex-box flex-align-center">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./confirm.js"></script>

<style scoped lang="stylus" src="./confirm.styl"></style>