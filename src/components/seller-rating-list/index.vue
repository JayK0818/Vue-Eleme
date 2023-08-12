<template>
  <div class="seller-rating-container">
    <ul>
      <li
        class="rating-item border-bottom-1px"
        v-for="rating in rating_list"
        :key="rating.rateTime"
      >
        <div class="avatar">
          <img :src="rating.avatar" class="img"/>
        </div>
        <div class="rating-content">
          <div class="username">{{ rating.username }}</div>
          <div class="score-delivery-item">
            <div class="score-container">
              <star :score="rating.score" size="small"/>
            </div>
            <span class="delivery-time" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟</span>
          </div>
          <p class="rating-text" v-if="rating.text">{{ rating.text }}</p>
          <div class="recommend-item">
            <i
              class="rating-icon"
              :class="[rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down', rating.rateType === 0 ? 'active' : '']"
            ></i>
            <template v-if="rating.recommend && rating.recommend.length">
              <span class="recommend-food" v-for="f in rating.recommend" :key="f">{{ f }}</span>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { RatingListProps } from '@/interface/rating-interface'
import { PropType } from 'vue'
import Star from '@/components/star/index.vue'

defineProps({
  rating_list: {
    type: Array as PropType<RatingListProps[]>,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.seller-rating-container {
  padding: 0 18px 30px;
  .rating-item {
    position: relative;
    padding: 18px 0;
    .avatar {
      position: absolute;
      width: 28px;
      height: 28px;
      overflow: hidden;
      border-radius: 50%;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .rating-content {
    padding-left: 40px;
  }
  .username {
    font-size: 10px;
    color: rgb(7, 17, 27);
    line-height: 12px;
  }
  .score-delivery-item {
    display: flex;
    padding: 4px 0 6px;
    align-items: center;
    .score-container {
      width: 60px;
    }
    .delivery-time {
      margin-left: 6px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 12px;
    }
  }
  .rating-text {
    font-size: 12px;
    line-height: 18px;
    color: rgb(7, 17, 27);
  }
  .recommend-item {
    padding-top: 8px;
    .rating-icon {
      font-size: 12px;
      line-height: 16px;
      color: rgb(183, 187, 191);
      &.active {
        color: rgb(0, 160, 220);
      }
    }
    .recommend-food {
      display: inline-block;
      box-sizing: border-box;
      margin-left: 8px;
      padding: 0 6px;
      width: 62px;
      height: 15px;
      font-size: 9px;
      line-height: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgb(147, 153, 159);
      border: 1px solid rgba(7, 17, 27, .1);
    }
  }
}
</style>
