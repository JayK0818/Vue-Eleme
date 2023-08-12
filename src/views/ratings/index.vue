<template>
  <div class="rating-page">
    <spin v-if="spinning"></spin>
    <template v-else>
      <div class="seller-info">
        <div class="score-info border-right-1px">
          <div class="score">{{ seller.score }}</div>
          <p class="sub-text">综合评分</p>
          <p class="rating-rank-text">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <section>
          <div class="item">
            <span class="text">服务态度</span>
            <div class="star-wrapper">
              <star :score="seller.score" size="medium"/>
            </div>
            <span class="score-text">{{ seller.score }}</span>
          </div>
          <div class="item" style="padding: 8px 0;">
            <span class="text">商品评分</span>
            <div class="star-wrapper">
              <star :score="seller.foodScore" size="medium"/>
            </div>
            <span class="score-text">{{ seller.foodScore }}</span>
          </div>
          <div class="item">
            <span class="text">送达时间</span>
            <span class="delivery-time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </section>
      </div>
      <div class="block"></div>
      <rating-select
        :rating_list="rating_list"
        :tabs="tabs"
        :is_only_content_show="is_only_content_show"
        :rating_type="rating_type"
        @toggle="toggle"
      />
      <seller-rating-list
        :rating_list="filter_rating_list"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import axios from '@/api'
import { onMounted, ref, computed } from 'vue'
import { useSellerStore } from '@/store'
import { storeToRefs } from 'pinia'
import Star from '@/components/star/index.vue'
import RatingSelect from '@/components/rating-select/index.vue'
import type { RatingListProps } from '@/interface/rating-interface'
import { RATING_ALL, RATING_POSITIVE, RATING_NEGATIVE, RATING_TYPE_NEGATIVE, RATING_TYPE_POSITIVE } from '@/constants'
import SellerRatingList from '@/components/seller-rating-list/index.vue'
import Spin from '@/components/spinning/index.vue'

const store = useSellerStore()
const { seller } = storeToRefs(store)
const rating_list = ref<RatingListProps[]>([])
const tabs = {
  [RATING_ALL]: '全部',
  [RATING_POSITIVE]: '满意',
  [RATING_NEGATIVE]: '不满意'
}
const is_only_content_show = ref<boolean>(false)
const rating_type = ref<string>(RATING_ALL)
const spinning = ref<boolean>(true)

const get_seller_ratings = () => {
  axios.get('/api/seller/ratings').then(res => {
    rating_list.value = res
  }).catch(() => {
    rating_list.value = []
  }).finally(() => {
    spinning.value = false
  })
}
const toggle = ({ type, payload }: { type: string; payload?: string }) => {
  switch (type) {
    case 'is_only_show_content':
      is_only_content_show.value = !is_only_content_show.value
      break
    case 'rating_type':
      rating_type.value = payload as string
      break
  }
}
const filter_rating_list = computed<RatingListProps[]>(() => {
  let list = rating_list.value.slice()
  if (is_only_content_show.value) {
    list = list.filter(item => item.text)
  }
  switch (rating_type.value) {
    case RATING_POSITIVE:
      list = list.filter(item => item.rateType === RATING_TYPE_POSITIVE)
      break
    case RATING_NEGATIVE:
      list = list.filter(item => item.rateType === RATING_TYPE_NEGATIVE)
  }
  return list
})

onMounted(() => {
  get_seller_ratings()
})
</script>

<style lang="scss" scoped>
.seller-info {
  padding: 18px 0;
  display: flex;
  .score-info {
    width: 160px;
    text-align: center;
    .score {
      font-size: 24px;
      color: rgb(255, 153, 0);
      line-height: 28px;
    }
    .sub-text {
      padding: 6px 8px;
      font-size: 12px;
      color: rgb(7, 17, 27);
      line-height: 12px;
    }
    .rating-rank-text {
      font-size: 10px;
      color: rgba(7, 17, 27, .5);
      line-height: 10px;
    }
  }
  section {
    padding-left: 20px;
    padding-right: 20px;
    flex: 1;
    min-width: 0;
    .item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      .star-wrapper {
        flex: 1;
      }
      .text {
        margin-right: 10px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
      }
      .delivery-time {
        font-size: 12px;
        line-height: 18px;
        color: rgb(147, 153, 159);
      }
      .score-text {
        margin-left: 12px;
        font-size: 12px;
        color: rgb(255, 153, 0);
      }
    }
  }
}
.block {
  height: 16px;
  background-color:#f3f5f7;
  border-top: 1px solid rgba(7, 17, 27, .1);
  border-bottom: 1px solid rgba(7, 17, 27, .1);
}
</style>
