<template>
  <header class="header">
    <div class="content">
      <div class="avatar">
        <img :src="seller.avatar" class="img">
      </div>
      <div class="info-wrapper">
        <div>
          <span class="brand"></span>
          <span class="title">{{ seller.name }}</span>
        </div>
        <div class="delivery-info">
          <span class="delivery-type">{{ seller.description }}</span>
          <span class="split-item">/</span>
          <span class="delivery-time">{{ seller.deliveryTime }}分钟送达</span>
        </div>
        <div class="discount-info" v-if="seller.supports && seller.supports.length">
          <support-icon
            :level="1"
            :type="support_type_class[seller.supports[0].type]"
          />
          <span class="discount-text">{{ seller.supports[0].description }}</span>
        </div>
        <div class="count-container" @click.stop="show_seller_detail">
          <i>5个</i><i class="icon-keyboard_arrow_right icon"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-container">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div
      class="header-image"
      :style="{
        'background-image': 'url(' + seller.avatar + ')'
      }"
      v-if="seller.avatar"
    ></div>
  </header>
</template>

<script lang="ts" setup>
import type { SellerDetailProps } from '@/interface/seller-interface'
import { PropType } from 'vue'
import SupportIcon from '@/components/support-icon/index.vue'
import { support_type_class } from '@/config'

defineProps({
  seller: {
    type: Object as PropType<SellerDetailProps>,
    required: true
  }
})

const emit = defineEmits(['show'])
const show_seller_detail = ():void => emit('show')
</script>

<style lang="scss" scoped>
@import '../../style/background-image.scss';
.header {
  position: relative;
  background-color: rgba(7, 17, 27, .5);
  overflow: hidden;
  .header-image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(6px);
  }
  .content {
    display: flex;
    padding: 24px 12px 18px 24px;
  }
  .info-wrapper {
    position: relative;
    flex: 1;
    font-size: 0px;
    padding: 2px 0 2px 16px;
    color: #fff;
    .count-container {
      position: absolute;
      right: 0;
      bottom: -2px;
      width: 44px;
      height: 24px;
      text-align: center;
      color: #fff;
      font-size: 10px;
      line-height: 24px;
      background-color: rgba(0, 0, 0, .2);
      border-radius: 12px;
      .icon {
        font-size: 12px;
        vertical-align: -2px;
      }
    }
  }
  .avatar {
    width: 64px;
    height: 64px;
    text-align: center;
    border-radius: 4px;
    overflow: hidden;
    .img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .brand {
    display: inline-block;
    width: 30px;
    height: 18px;
    @include bg-image('./icons/brand');
    background-size: 30px 18px;
    background-position: center;
  }
  .title {
    padding-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    vertical-align: bottom;
  }
  .delivery-info {
    padding: 8px 0;
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    .split-item {
      padding: 0 3px;
    }
  }
  .discount-info {
    display: flex;
    align-items: center;
    font-size: 10px;
    .discount-text {
      padding-left: 4px;
      line-height: 12px;
      font-weight: 200;
    }
  }
  .bulletin-container{
    display: flex;
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    height: 28px;
    color: #fff;
    background-color: rgb(7, 17, 27, .2);
    .bulletin-icon {
      width: 22px;
      height: 12px;
      background-size: 22px 12px;
      @include bg-image('./icons/bulletin');
      background-position: center;
    }
    .bulletin-text {
      padding-left: 4px;
      flex: 1;
      line-height: 28px;
      font-size: 10px;
      font-weight: 200;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
