<template>
  <div class="shopping-car-wrapper">
    <section style="flex: 1; display: inline-flex;">
      <div class="car-container">
        <div
          class="count-icon"
          v-if="food_list.length"
        >{{ count_total > 99 ? '99+' : count_total }}</div>
        <div
          class="car"
          :class="{active: food_list.length > 0}"
        >
          <span class="car-icon icon-shopping_cart"></span>
        </div>
      </div>
      <div
        class="price-container"
        :class="{
          active: food_list.length > 0
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
      <template v-if="food_list.length === 0">¥{{delivery_min_price}}起送</template>
      <template v-else>
        {{ price_total < delivery_min_price ? `还差 ¥ ${delivery_min_price - price_total} 起送` : '去结算' }}
      </template>
    </div>
  </div>
  <!-- 小球动画 -->
  <div class="ball-container">
    <template v-for="(ball, i) in ball_list" :key="i">
      <transition
        @before-enter="before_enter"
        @enter="enter"
        @after-enter="after_enter"
      >
        <div
          class="ball"
          :key="i"
          v-if="ball.visible"
        >
          <div class="inner"></div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useShoppingCarStore, useSellerStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import bus from '@/utils/bus'

const store = useShoppingCarStore()
const seller_store = useSellerStore()
const { price_total, count_total, food_list } = storeToRefs(store)
const { seller } = storeToRefs(seller_store)

const delivery_min_price = computed(() => {
  if (seller.value.minPrice === undefined) return 10
  return seller.value.minPrice
})

const ball_list = ref<{ visible: boolean }>([])
const drop_balls = ref<HTMLElement[]>([])

onMounted(() => {
  for (let i = 0; i < 10; i++) {
    ball_list.value.push({ visible: false })
  }
  bus.on('update', (target) => {
    for (let i = 0, length = ball_list.value.length; i < length; i++) {
      const ball = ball_list.value[i]
      if (!ball.visible) {
        ball.visible = true
        ball.el = target
        drop_balls.value.push(ball)
        break
      }
    }
  })
})

const before_enter = (el):void => {
  const ball = drop_balls.value[drop_balls.value.length - 1]
  const { left, top } = ball.el.getBoundingClientRect()
  const x = left - 30
  const y = -(window.innerHeight - top - 32)
  el.style.display = ''
  el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
  const inner = el.querySelector('.inner')
  inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
}

const enter = (el, done):void => {
  // eslint-disable-next-line
  const h = el.offsetHeight
  el.style.transform = el.style.webkitTransform = 'translate3d(0, 0, 0)'
  const inner = el.querySelector('.inner')
  inner.style.transform = inner.style.webkitTransform = 'translate3d(0, 0, 0)'
  el.addEventListener('transitionend', done)
}

const after_enter = (el):void => {
  const ball = drop_balls.value.shift()
  if (ball) {
    ball.visible = false
    el.style.display = 'none'
  }
}
onBeforeUnmount(() => {
  bus.off('update')
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
        background-color: #00a1dc;
        .car-icon {
          color: #fff;
        }
      }
    }
    .car-icon {
      font-size: 24px;
      line-height: 24px;
    }
    .count-icon {
      position: absolute;
      right: 0;
      top: 0;
      width: 24px;
      height: 16px;
      font-size: 10px;
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
.ball-container {
  .ball {
    position: fixed;
    left: 36px;
    bottom: 32px;
    z-index: 100;
    transition: all .5s cubic-bezier(.4, -0.64, .82, .72);
    .inner {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgb(0, 160, 220);
      transition: all .5s linear;
    }
  }
}
</style>
