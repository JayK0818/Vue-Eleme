<template>
  <div class="shopping-car-wrapper">
    <section style="flex: 1; display: inline-flex;">
      <div class="car-container">
        <div
          class="count-icon"
          v-if="goods_list.length"
        >{{ count_total > 99 ? '99+' : count_total }}</div>
        <div
          class="car"
          :class="{active: goods_list.length > 0}"
        >
          <span class="car-icon icon-shopping_cart"></span>
        </div>
      </div>
      <div
        class="price-container"
        :class="{
          active: goods_list.length > 0
        }"
      >
        ¥{{ price_total }}
      </div>
      <div class="delivery-info-container">
        <div class="delivery-info border-left-1px">另需配送费 ¥{{seller.deliveryPrice || 0}}元</div>
      </div>
    </section>
    <div
      class="confirm-btn"
      :class="{ active: price_total >= delivery_min_price }"
    >
      <template v-if="goods_list.length === 0">¥{{delivery_min_price}}起送</template>
      <template v-else>
        {{ price_total < delivery_min_price ? `还差¥ ${delivery_min_price - price_total}起送` : '去结算' }}
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useShoppingCarStore, useSellerStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useShoppingCarStore()
const seller_store = useSellerStore()
const { price_total, count_total, goods_list } = storeToRefs(store)
const { seller } = storeToRefs(seller_store)

const delivery_min_price = computed(() => {
  if (seller.minPrice === undefined) return 10
  return seller.minPrice
})

</script>

<style lang="scss" scoped>
.shopping-car-wrapper {
  display: flex;
  height: 48px;
  background-color: #141d27;
  .car-container {
    position: relative;
    margin-left: 12px;
    margin-top: -10px;
    width: 44px;
    height: 44px;
    padding: 6px;
    background-color: #141d27;
    border-radius: 50%;
    z-index: 10;
    .car {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      color: rgba(255, 255, 255, .4);
      background-color: #2b343c;
      &.active {
        background-color: #00a1dc ;
        .car-icon {
          color: #fff;
        }
      }
      .count-icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 16px;
        font-size: 9px;
        line-height: 16px;
        font-weight: 700;
        text-align: center;
        color: #fff;
        background-color: red;
        z-index: 20;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
        border-radius: 16px;
      }
    }
    .car-icon {
      font-size: 24px;
      line-height: 24px;
    }
  }
  .confirm-btn {
    box-sizing: border-box;
    padding: 0 8px;
    width: 100px;
    height: 100%;
    font-size: 12px;
    line-height: 48px;
    font-weight: 700;
    text-align: center;
    color: rgba(255, 255, 255, .4);
    background-color: #2b333b;
    &.active {
      background-color: #07c160;
      color: #fff;
    }
  }
  .price-container {
    width: 50px;
    text-align: center;
    line-height: 48px;
    font-weight: bold;
    font-size: 16px;
    color: rgba(255, 255, 255, .4);
    &.active {
      color: #fff;
    }
  }
  .delivery-info-container {
    flex: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    .delivery-info {
      padding-left: 12px;
      font-size: 14px;
      color: rgba(255, 255, 255, .4);
      font-weight: 200;
      line-height: 24px;
    }
  }
}
</style>
