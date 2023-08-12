<template>
  <div class="rating-list" v-if="rating_list.length">
    <ul>
      <li
        v-for="(rating, i) in rating_list"
        :key="i"
        class="rating-item border-bottom-1px"
      >
        <div class="rating-info">
          <div class="rating-time">{{ format_timestamp(rating.rateTime) }}</div>
          <div class="rating-user">
            <span class="username">{{ rating.username }}</span>
            <div class="avatar">
              <img :src="rating.avatar" alt="" class="img">
            </div>
          </div>
        </div>
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
import { format_timestamp } from '@/utils/date'

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
  .rating-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .rating-time {
      color: rgb(147, 153, 159);
      line-height: 12px;
      font-size: 10px;
    }
    .rating-user {
      display: inline-flex;
      align-items: center;
      .username {
        font-size: 10px;
        color: rgb(147, 153, 159);
        line-height: 24px;
      }
      .avatar {
        margin-left: 6px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
}
</style>
