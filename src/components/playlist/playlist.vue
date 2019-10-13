<template>
  <transition name="list-fade" @after-enter="scrollToCurrent">
    <div class="playlist" v-if="showFlag" @click="isShow(!1)">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h3 class="title flex-box flex-cont-btw flex-align-center">
            <div class="left flex-box flex-align-center">
              <i class="icon" :class="iconMode" @click="changeMode"></i>
              <span class="text">{{getModeText}}</span>
              <span class="text total">共有{{playlist.length}}首</span>
            </div>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h3>
        </div>
        <div class="lists pos-rel">
          <scroller ref="scroller">
            <transition-group name="list" tag="ul">
              <li @click="selectItem(item, index)" ref="listItem" class="item flex-box flex-align-center"
                v-for="(item, index) in sequenceList" :key="item.id"
              >
                <i class="current" :class="getCurrentIcon(item)"></i>
                <span class="text">{{item.name}}</span>
                <span class="delete" @click.stop="deleteOne(item)"><i class="icon-delete"></i></span>
              </li>
            </transition-group>
          </scroller>
        </div>
        <div class="list-close" @click="isShow(!1)"><span>关闭</span></div>
      </div>
    </div>
  </transition>
</template>

<script src="./playlist.js"></script>

<style lang="stylus" scoped src="./playlist.styl"></style>