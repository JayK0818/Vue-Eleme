<template>
  <div class="rating-wrapper">
    <div class="title" v-if="is_show_title">商品评价</div>
    <div class="select-container border-bottom-1px">
      <div
        v-for="(v, k) in tabs"
        :key="k"
        :class="[k, {
          active: k === rating_type
        }]"
        class="rating-select-btn"
        @click.stop="toggle_rating_type(k)"
      >{{ v }}
      <span class="rating-count">{{ get_rating_count(rating_type_map[k]) }}</span>
      </div>
    </div>
    <div
      class="select-rating-content-container"
      @click.stop="toggle_only_show_content"
      :class="{ active: is_only_content_show }"
    >
      <span
        class="check-icon icon-check_circle"
      ></span>
      <span class="check-text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import {
  RATING_NEGATIVE, RATING_POSITIVE, RATING_ALL,
  RATING_TYPE_ALL, RATING_TYPE_POSITIVE, RATING_TYPE_NEGATIVE
} from '@/constants/index'
import type { RatingListProps } from '@/interface/goods-interface'

const props = defineProps({
  is_show_title: {
    type: Boolean,
    default: false
  },
  tabs: {
    type: Object as PropType<{ [key: string]: string}>,
    default () {
      return {
        [RATING_ALL]: '全部',
        [RATING_POSITIVE]: '推荐',
        [RATING_NEGATIVE]: '吐槽'
      }
    }
  },
  rating_list: {
    type: Array as PropType<RatingListProps[]>,
    required: true
  },
  is_only_content_show: {
    type: Boolean,
    default: false
  },
  rating_type: {
    type: String,
    default: RATING_ALL
  }
})
const rating_type_map = ref({
  [RATING_ALL]: RATING_TYPE_ALL,
  [RATING_POSITIVE]: RATING_TYPE_POSITIVE,
  [RATING_NEGATIVE]: RATING_TYPE_NEGATIVE
})
const emit = defineEmits(['toggle'])
/**
 * @description 获取评价数量
*/
const get_rating_count = (type: number): number => {
  switch (type) {
    case RATING_TYPE_POSITIVE:
      return props.rating_list.filter(rating => rating.rateType === RATING_TYPE_POSITIVE).length
    case RATING_TYPE_NEGATIVE:
      return props.rating_list.filter(rating => rating.rateType === RATING_TYPE_NEGATIVE).length
    default:
      return props.rating_list.length
  }
}
/**
 * @description 切换是否显示内容
*/
const toggle_only_show_content = ():void => {
  emit('toggle', {
    type: 'is_only_show_content'
  })
}
/**
 * @description 切换评价类型
*/
const toggle_rating_type = (type: string | number) => {
  emit('toggle', {
    type: 'rating_type',
    payload: type
  })
}
</script>

<style lang="scss" scoped>
.rating-wrapper {
  padding: 18px 18px 0;
  border-bottom: 1px solid rgba(7, 17, 27, .1);
  .title {
    font-size: 14px;
    color: #212121;
  }
  .select-container {
    display: flex;
    padding-top: 18px;
    padding-bottom: 18px;
  }
  .rating-select-btn {
    margin-right: 8px;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 1px;
    line-height: 16px;
    .rating-count {
      font-size: 8px;
    }
    &.rating_positive, &.rating_all {
      color:rgb(77, 85, 93);
      background-color: rgba(0, 160, 220, .2);
      &.active {
        background-color: rgb(0, 160, 220);
        color: #fff;
      }
    }
    &.rating_negative {
      color:rgb(77, 85, 93);
      background-color: rgba(77, 85, 93, .2);
      &.active {
        background-color: rgb(77, 85, 93);
        color: #fff;
      }
    }
  }
  .select-rating-content-container {
    padding: 12px 0;
    line-height: 24px;
    color: rgb(147, 153, 159);
    .check-icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .check-text {
      margin-left: 4px;
      font-size: 12px;
    }
    &.active {
      .check-icon {
        color: #00c850;
      }
    }
  }
}
</style>
