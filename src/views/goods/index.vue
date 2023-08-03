<template>
  <div class="goods-page">
    <div class="menu-list">
      <ul>
        <li
          v-for="item in goods_list"
          :key="item.name"
          class="menu-item border-bottom-1px"
        >
          <support-icon
            class="menu-icon"
            v-if="item.type > 0"
            :level="3"
            :type="support_type_class[item.type]"
          ></support-icon>
          <span class="menu-text">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="goods-container" ref="container">
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
                  <img :src="food.image" alt="" class="img">
                </div>
                <div class="food-info">
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
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from '@/api'
import { onMounted, ref, nextTick } from 'vue'
import SupportIcon from '@/components/support-icon/index.vue'
import type { GoodsListProps } from '@/interface/goods-interface'
import { support_type_class } from '@/config'
import BetterScroll from 'better-scroll'

const goods_list = ref<GoodsListProps[]>([])
const spinning = ref<boolean>(true)
const container = ref<null | HTMLElement>(null)
const category_card = ref<Array<HTMLElement>>([])
const height_list = ref<number[]>([])

const get_goods_list = () => {
  spinning.value = true
  axios.get<GoodsListProps[]>('/api/seller/goods').then(res => {
    goods_list.value = res
  }).catch(() => {
    goods_list.value = []
  }).finally(() => {
    spinning.value = false
    _init_scroll()
    height_list.value = _get_category_title_height()
  })
}
onMounted(() => {
  get_goods_list()
})
const _init_scroll = ():void => {
  nextTick(() => {
    // eslint-disable-next-line
    const bs_instance = new BetterScroll(container.value as HTMLElement, {
      probeType: 3
    })
    // 监听better-scroll的滚动事件
    bs_instance.on('scroll', ({ y }: { y: number }) => {
      console.log(y)
    })
  })
}
const _get_category_title_height = ():number[] => {
  const temp = [0]
  let height = 0
  category_card.value.forEach(category => {
    height += category.clientHeight
    temp.push(height)
  })
  console.log(temp)
  return temp
}

</script>

<style lang="scss" scoped>
.goods-page {
  display: flex;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  .menu-list {
    box-sizing: border-box;
    padding: 0 12px;
    width: 84px;
    background-color: #f3f5f7;
    overflow: auto;
    .menu-item {
      padding: 13px 0;
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
        height: 100%;
      }
    }
    .food-info {
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
    }
  }
}
</style>
