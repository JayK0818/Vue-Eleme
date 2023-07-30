<template>
  <div class="seller-layer">
    <div class="container clearfix">
      <main>
        <div class="title">{{ seller.name }}</div>
        <div class="star-container">
          <star size="large" :score="seller.score"/>
        </div>
        <div class="sub-title-container">
          <span class="sub-title-text">优惠信息</span>
        </div>
        <ul class="discount-container" v-if="seller.supports && seller.supports.length">
          <li
            v-for="(discount, idx) in seller.supports"
            :key="discount.type"
            class="discount-item"
            :class="discount_type_class[idx]"
          >
            <discount-icon :type="discount_type_class[idx]" :level="2"/>
            <span class="discount-text">{{ discount.description }}</span>
          </li>
        </ul>
        <div class="sub-title-container">
          <span class="sub-title-text">商家公告</span>
        </div>
        <p class="bulletin-text">{{ seller.bulletin }}</p>
      </main>
    </div>
    <div class="footer">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import type { SellerDetailProps } from '@/interface/seller-interface'
import Star from '@/components/star/index.vue'
import DiscountIcon from '@/components/discount-icon/index.vue'
import { discount_type_class } from '@/config/index'

defineProps({
  seller: {
    type: Object as PropType<SellerDetailProps>,
    required: true
  }
})

</script>

<style lang="scss" scoped>
.seller-layer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(7, 17, 27, .65);
  overflow: auto;
  .container {
    width: 100%;
    min-height: 100%;
    color: #fff;
    main {
      padding: 64px 36px 64px;
    }
    .star-container {
      margin: 0 auto;
      width: 186px;
      padding-top: 16px;
      padding-bottom: 28px;
    }
  }
  .title {
    font-size: 16px;
    text-align: center;
    font-weight: 700;
    line-height: 16px;
  }
  .footer {
    margin-top: -64px;
    color: #fff;
    font-size: 32px;
    text-align: center;
  }
  .sub-title-container {
    display: flex;
    align-items: center;
    &:before, &:after {
      content: "";
      flex: 1;
      height: 1px;
      background-color: rgba(255, 255, 255, .2);
    }
    .sub-title-text {
      padding: 0 12px;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      line-height: 28px;
    }
  }
  .bulletin-text {
    padding: 24px 12px 0;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    color: #ffffff;
  }
  .discount-container {
    padding: 24px 0;
    .discount-item {
      padding: 6px 0;
      display: flex;
      align-items: center;
      height: 16px;
    }
    .discount-text {
      padding-left: 6px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      font-weight: 200;
      line-height: 12px;
      color: #fff;
    }
  }
}
</style>
