<template>
  <div class="button-wrapper">
    <Transition name="slide-fade">
      <span
        class="icon icon-remove_circle_outline remove-icon"
        @click.stop="reduce_food"
        v-if="food_id_count_map[food.id] > 0"
      ></span>
    </Transition>
    <span class="count-text">{{ food_id_count_map[food.id] }}</span>
    <span
      class="icon icon-add_circle add-icon"
      @click.stop="add_food"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import type { FoodListProps } from '@/interface/goods-interface'
import { PropType } from 'vue'
import { useShoppingCarStore } from '@/store'
import { storeToRefs } from 'pinia'

const props = defineProps({
  food: {
    type: Object as PropType<FoodListProps>,
    required: true
  }
})
const store = useShoppingCarStore()

const { food_id_count_map } = storeToRefs(store)

const add_food = ():void => {
  store.increment(props.food)
}
const reduce_food = ():void => {
  store.decrement(props.food)
}
</script>

<style lang="scss" scoped>
.button-wrapper {
  font-size: 0;
  width: 70px;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-align: right;
  .icon {
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
    &.icon-remove {
      position: relative;
      z-index: 1;
    }
  }
  .count-text {
    display: inline-block;
    text-align: center;
    width: 20px;
    font-size: 14px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    vertical-align: top;
  }
}
// 按钮动画样式
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.15s linear;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
