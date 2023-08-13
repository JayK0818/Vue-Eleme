<template>
  <div class="goods-page">
    <spin v-if="spinning"></spin>
    <template v-else>
      <div class="menu-list">
        <ul>
          <li
            v-for="(item, idx) in goods_list"
            :key="item.name"
            class="menu-item"
            :class="{active: active_idx === idx }"
            @click.stop="menu_jump(idx)"
          >
            <div
              class="border-bottom-1px menu-box"
              :class="{ 'border-none': active_idx === idx }"
            >
              <support-icon
                class="menu-icon"
                v-if="item.type > 0"
                :level="3"
                :type="support_type_class[item.type]"
              ></support-icon>
              <span class="menu-text">{{ item.name }}</span>
              <div
                class="category-count"
                v-if="food_category_count_map[item.name]"
              >{{ food_category_count_map[item.name] > 99 ? '99+' : food_category_count_map[item.name] }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="goods-container" ref="container" @touchstart.stop="is_clicked">
        <section>
          <div
            class="good-category"
            v-for="good in goods_list"
            :key="good.name"
            ref="category_card"
          >
            <template v-if="good.foods && good.foods.length">
              <div class="category-title">{{ good.name }}</div>
              <div class="category-food-container">
                <div
                  class="food-item border-bottom-1px"
                  v-for="(food, i) in good.foods"
                  :key="food.id"
                  :class="{ 'border-none': i === good.foods.length - 1 }"
                >
                  <div class="food-img">
                    <img v-lazy="food.image" alt="" class="img">
                  </div>
                  <div class="food-info" @click.stop="get_food_detail(food)">
                    <div class="food-title">{{ food.name }}</div>
                    <div class="food-desc" v-if="food.description">{{ food.description }}</div>
                    <div style="padding-top: 8px; line-height:10px;">
                      <span class="sell-count">月售{{ food.sellCount }}份</span>
                      <span class="rating-text">好评率{{ food.rating }}%</span>
                    </div>
                    <div class="price">
                      <span class="new-price">{{ food.price }}</span>
                      <span class="old-price" v-if="food.oldPrice">{{ food.oldPrice }}</span>
                    </div>
                    <div class="food-control-container">
                      <food-control-button :food="food"/>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </section>
      </div>
    </template>
  </div>
  <transition name="slide">
    <template v-if="is_visible">
      <food-detail :food="active_food" @cancel="is_visible = false"/>
    </template>
  </transition>
</template>

<script lang="ts" setup>
import axios from '@/api'
import { onMounted, ref, nextTick, computed } from 'vue'
import SupportIcon from '@/components/support-icon/index.vue'
import type { GoodsListProps, FoodListProps } from '@/interface/goods-interface'
import { support_type_class } from '@/config'
import BetterScroll from 'better-scroll'
import FoodControlButton from '@/components/food-control-button/index.vue'
import FoodDetail from './components/food-detail.vue'
import { useShoppingCarStore } from '@/store/index'
import Spin from '@/components/spinning/index.vue'
import { storeToRefs } from 'pinia'

const goods_list = ref<GoodsListProps[]>([])
const spinning = ref<boolean>(true)
const container = ref<null | HTMLElement>(null)
const category_card = ref<Array<HTMLElement>>([])
const height_list = ref<number[]>([])
const active_idx = ref<number>(0)
const scroll_instance = ref<null | any>(null)
const is_click_menu = ref<boolean>(false)
const active_food = ref<FoodListProps | any>({})
const is_visible = ref<boolean>(false)

// store
const store = useShoppingCarStore()
const { food_id_count_map } = storeToRefs(store)

const get_goods_list = () => {
  spinning.value = true
  axios.get<GoodsListProps[]>('/api/seller/goods').then(res => {
    goods_list.value = res
  }).catch(() => {
    goods_list.value = []
  }).finally(() => {
    spinning.value = false
    nextTick(() => {
      _init_scroll()
      height_list.value = _get_category_title_height()
    })
  })
}
onMounted(() => {
  get_goods_list()
})
const _init_scroll = ():void => {
  // eslint-disable-next-line
  const bs_instance = new BetterScroll(container.value as HTMLElement, {
    probeType: 3,
    click: true
  })
  scroll_instance.value = bs_instance
  // 监听better-scroll的滚动事件
  bs_instance.on('scroll', ({ y }: { y: number }) => {
    if (is_click_menu.value) return
    calc_menu_idx(Math.abs(y))
  })
}
const _get_category_title_height = ():number[] => {
  const temp = [0]
  let height = 0
  category_card.value.forEach(category => {
    height += category.clientHeight
    temp.push(height)
  })
  return temp
}

const calc_menu_idx = (y: number):void => {
  for (let i = 0, length = height_list.value.length; i < length - 1; i++) {
    const h1 = height_list.value[i]
    const h2 = height_list.value[i + 1]
    if (y >= h1 && y < h2) {
      active_idx.value = i
    }
  }
}

/**
 * @description 点击菜单跳转
*/
const menu_jump = (idx: number):void => {
  is_click_menu.value = true
  const top = height_list.value[idx]
  active_idx.value = idx
  scroll_instance.value && scroll_instance.value.scrollTo(0, -top, 300)
}

const is_clicked = ():void => {
  is_click_menu.value = false
}

/**
 * @description 获取食物详情
*/
const get_food_detail = (food: FoodListProps):void => {
  active_food.value = { ...food }
  nextTick(() => {
    is_visible.value = true
  })
}
/**
 * @description 品类下的商品数量
*/
const food_category_count_map = computed(() => {
  const map: {[key: string]: number} = {}
  goods_list.value.forEach(category => {
    if (!map[category.name]) {
      map[category.name] = 0
    }
    category.foods.forEach(food => {
      if (food_id_count_map.value[food.id]) {
        map[category.name] += food_id_count_map.value[food.id]
      }
    })
  })
  return map
})
</script>

<style lang="scss" scoped>
.goods-page {
  display: flex;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  .menu-list {
    box-sizing: border-box;
    width: 84px;
    background-color: #f3f5f7;
    overflow: auto;
    .menu-item {
      position: relative;
      padding: 0 12px;
      &.active {
        background-color: #fff;
      }
      .menu-box {
        position: relative;
        padding: 13px 0;
        .category-count {
          position: absolute;
          right: -4px;
          top: 0;
          width: 24px;
          font-size: 10px;
          height: 14px;
          line-height: 14px;
          text-align: center;
          border-radius: 6px;
          z-index: 2;
          background-color: rgb(240, 20, 20);
          color: #fff;
        }
      }
      .menu-text {
        padding-left: 2px;
        font-size: 12px;
        line-height: 14px;
        color: #07111b;
      }
    }
    .menu-icon {
      display: inline-block;
      vertical-align: -3px;
    }
  }
  .goods-container {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }
  .category-title {
    height: 26px;
    padding-left: 14px;
    font-size:12px;
    line-height: 26px;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
    border-left: 1px solid #d9dde1;
  }
  .category-food-container {
    padding: 0 18px;
    .food-item {
      padding: 18px 0;
      display: flex;
    }
    .food-img {
      width: 57px;
      height: 57px;
      text-align: center;
      line-height: 57px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .food-info {
      position: relative;
      padding-left: 10px;
      flex: 1;
      min-width: 0;
      .food-title {
        padding-top: 2px;
        font-size: 14px;
        line-height: 14px;
        color: rgb(7, 17, 27);
      }
      .food-desc, .sell-count, .rating-text {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .rating-text {
        padding-left: 12px;
      }
      .food-desc {
        line-height: 10px;
        padding-top: 8px;
      }
      .price {
        line-height: 20px;
        padding-top: 6px;
      }
      .new-price {
        color: red;
        font-size: 14px;
        font-weight: 700;
      }
      .new-price:before, .old-price:before {
        content: '¥';
        font-weight: normal;
        font-size: 10px;
        padding-right: 2px;
        vertical-align: bottom;
      }
      .old-price {
        margin-left: 8px;
        text-decoration: line-through;
        color: rgb(147, 153, 159);
        font-weight: 700;
        font-size: 10px;
      }
      .food-control-container {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all .2s linear;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>
