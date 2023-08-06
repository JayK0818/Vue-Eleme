<template>
  <div class="foods-list-container">
    <header class="header border-bottom-1px">
      <span class="title">购物车</span>
      <span class="cancel-text" @click.stop="clear">清空</span>
    </header>
    <main class="main">
      <ul>
        <li
          v-for="food in food_list"
          :key="food.id"
          class="food-item border-bottom-1px"
        >
          <span class="food-name">{{ food.name }}</span>
          <span class="food-price-total">
            <span class="price-prefix">¥</span>
            {{ food.count * food.price }}
          </span>
          <food-control-button :food="food"/>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts" setup>
import FoodControlButton from '@/components/food-control-button/index.vue'
import { useShoppingCarStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const store = useShoppingCarStore()
const { food_list } = storeToRefs(store)

const clear = ():void => {
  store.clear()
}
</script>

<style lang="scss" scoped>
.foods-list-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 420px;
  bottom: 48px;
  left: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  z-index: 2;
  .header {
    padding: 0 18px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f3f6f6;
    .cancel-text {
      color: #00a1dc;
    }
    .title {
      color: #212121;
    }
    .title, .cancel-text {
      font-size: 12px;
    }
  }
  .main {
    padding: 0 18px 12px;
    flex: 1;
    overflow: auto;
    .food-item {
      display: flex;
      align-items: center;
      padding: 16px 0;
    }
    .food-name {
      font-size: 14px;
      color: #212121;
    }
    .food-price-total {
      padding-right: 14px;
      flex: 1;
      text-align: right;
      color: rgb(240, 20, 20);
      font-weight: bold;
      font-size: 16px;
      .price-prefix {
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
}
</style>
