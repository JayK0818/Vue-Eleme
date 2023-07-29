<template>
  <div class="seller-layer">
    <div class="container clearfix">
      <main>
        <div class="title">{{ seller.name }}</div>
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
}
</style>
