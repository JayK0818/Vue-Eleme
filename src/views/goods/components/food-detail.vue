<template>
  <div class="food-detail-wrapper">
    <div class="food-avatar">
      <span class="back-icon icon-arrow_lift" @click="cancel"></span>
      <img :src="food.image" class="img">
    </div>
    <div class="food-info-wrapper">
      <h3 class="title">{{ food.name }}</h3>
      <div class="sell-info">
        <span class="sell-count">月售{{ food.sellCount }}份</span>
        <span class="rating">好评率 {{ food.rating }}%</span>
      </div>
      <div class="price">
        <span class="new-price">{{ food.price }}</span>
        <span class="old-price" v-if="food.oldPrice">{{ food.oldPrice }}</span>
      </div>
      <div class="food-control-area">
        <template v-if="food_id_count_map[food.id] && food_id_count_map[food.id] > 0">
          <food-control-button :food="food"/>
        </template>
        <template v-else>
          <div class="add-cart-button" @click="add_good">加入购物车</div>
        </template>
      </div>
    </div>
    <template v-if="food.info">
      <div class="block"></div>
      <div class="food-desc">
        <h3 class="sub-title">商品介绍</h3>
        <p class="desc">{{ food.info }}</p>
      </div>
    </template>
    <div class="block"></div>
  </div>
</template>

<script lang="ts" setup>
import type { FoodListProps } from '@/interface/goods-interface'
import { PropType } from 'vue'
import { useShoppingCarStore } from '@/store'
import { storeToRefs } from 'pinia'
import FoodControlButton from '@/components/food-control-button/index.vue'
import bus from '@/utils/bus'

const props = defineProps({
  food: {
    type: Object as PropType<FoodListProps>
  }
})
const emit = defineEmits(['cancel'])
const cancel = ():void => emit('cancel')

const store = useShoppingCarStore()
const { food_id_count_map } = storeToRefs(store)

const add_good = (event):void => {
  store.increment(props.food)
  bus.emit('update', event.target)
}

</script>

<style lang="scss" scoped>
.food-detail-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 48px;
  background-color: #fff;
  overflow: auto;
  .sub-title {
    font-size: 14px;
    color: #212121;
  }
  .food-avatar {
    position: relative;
    width: 100%;
    padding-top: 75%;
    height: 0;
    .img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .back-icon {
      position: absolute;
      left: 12px;
      top: 12px;
      color: #fff;
      font-size: 22px;
      z-index: 10;
    }
  }
  .food-info-wrapper {
    position: relative;
    padding: 18px;
    .title {
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      color: rgb(7, 17, 27);
    }
    .sell-info {
      padding-top: 8px;
      color: rgb(147, 153, 159);
      line-height: 10px;
      font-size: 10px;
    }
    .rating {
      margin-left: 12px;
    }
    .price {
      padding-top: 18px;
      font-weight: 700;
    }
    .new-price:before, .old-price:before {
      content: '¥';
      padding-right: 2px;
      font-weight: normal;
      font-size: 10px;
    }
    .new-price {
      font-size: 14px;
      color: rgb(240, 20, 20)
    }
    .old-price {
      margin-left: 10px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      text-decoration: line-through;
    }
  }
  .add-cart-button {
    width: 74px;
    height: 24px;
    background-color: rgb(0, 160, 220);
    text-align: center;
    line-height: 24px;
    font-size: 10px;
    color: #fff;
    border-radius: 12px;
  }
  .food-control-area {
    position: absolute;
    right: 18px;
    bottom: 18px;
  }
  .block {
    height: 16px;
    background-color: #f3f5f7;
    border-top: 1px solid rgba(7, 17, 27, .1);
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .food-desc {
    padding: 18px;
    .desc {
      margin-top: 6px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
  }
}
</style>
