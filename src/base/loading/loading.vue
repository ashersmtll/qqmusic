<template>
  <div class="loading flex-box flex-cont-center flex-align-center">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  };
</script>
<style scoped lang="stylus">
  .loading{
    width: 100%;
    height: 100vh;
    position fixed;
    top 0;
    left 0;
    text-align: center;
    z-index 1000;
    background $color-background-d;
    img {
      width: .6rem;
      height: .6rem;
      margin-right: .2rem;
    }
    .desc{
      line-height: .4rem;
      font-size: $font16;
      color: $c666;
    }
  }
</style>
