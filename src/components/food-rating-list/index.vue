<template>
  <div class="rating-list" v-if="rating_list.length">
    <ul>
      <li
        v-for="(rating, i) in rating_list"
        :key="i"
        class="rating-item border-bottom-1px"
      >
        <div class="rating-time">{{ rating.rateTime }}</div>
        <div class="rating-content">
          <span
            class="rating-icon"
            :class="{
              'icon-thumb_up': rating.rateType === RATING_TYPE_POSITIVE,
              'icon-thumb_down': rating.rateType === RATING_TYPE_NEGATIVE,
              active: rating.rateType === RATING_TYPE_POSITIVE
            }"
          ></span>
          <span class="rating-text" v-if="rating.text">{{ rating.text }}</span>
        </div>
      </li>
    </ul>
  </div>
  <v-empty v-else/>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import type { RatingListProps } from '@/interface/goods-interface'
import { RATING_ALL, RATING_TYPE_POSITIVE, RATING_TYPE_NEGATIVE } from '@/constants/index'
import VEmpty from '@/components/v-empty/index.vue'

defineProps({
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
</script>

<style lang="scss" scoped>
.rating-list {
  padding: 0 18px;
  background-color: #fff;
  .rating-item {
    padding: 16px 0;
  }
  .rating-content {
    padding-top: 6px;
  }
  .rating-icon {
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 24px;
    &.active {
      color: rgb(0, 160, 220);
    }
  }
  .rating-text {
    margin-left: 4px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    line-height: 16px;
  }
}
</style>
