<template>
  <div class="seller-page">
    <div class="seller-info">
      <div class="top border-bottom-1px">
        <section style="flex: 1;">
          <div class="seller-name">{{ seller.name }}</div>
          <section style="display: flex; align-items: center; padding-top: 8px;">
            <div class="star-wrapper">
              <star :score="seller.score" size="medium"/>
            </div>
            <span class="sell-count">月售{{ seller.sellCount }}单</span>
          </section>
        </section>
        <div class="favorite-wrapper">
          <i class="icon-favorite"></i>
          <div class="favorite-text">收藏</div>
        </div>
      </div>
      <div class="main">
        <div class="flex-1 border-right-1px">
          <div class="text">起送价</div>
          <div>
            <span class="delivery-price">{{ seller.deliveryPrice }}</span>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="flex-1 border-right-1px">
          <div class="text">商家配送</div>
          <div>
            <span class="delivery-type">{{ seller.deliveryPrice }}</span>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="flex-1">
          <div class="text">平均配送时间</div>
          <div>
            <span class="delivery-time">{{ seller.deliveryTime }}</span>
            <span class="unit">分钟</span>
          </div>
        </div>
      </div>
    </div>
    <div class="block"></div>
    <div class="bulletin-support-wrapper">
      <div class="title">公告与活动</div>
      <p class="bulletin-text">{{ seller.bulletin }}</p>
      <ul v-if="seller.supports && seller.supports.length" class="support-list">
        <li
          v-for="(support, i) in seller.supports"
          :key="i"
          class="support-item border-top-1px"
        >
          <support-icon
            :type="support_type_class[support.type]"
            :level="3"
            class="support-icon"
          />
          <span class="support-text">{{ support.description }}</span>
        </li>
      </ul>
    </div>
    <template v-if="seller.pics && seller.pics.length">
      <div class="block"></div>
      <div class="seller-pics-container">
        <div class="title">商家实景</div>
        <section style="overflow: auto;">
          <ul class="pic-list">
            <li v-for="(url, i) in seller.pics" :key="i" class="pic-item">
              <img :src="url" alt="" class='img'>
            </li>
          </ul>
        </section>
      </div>
    </template>
    <div class="block"></div>
    <div class="seller-detail-wrapper">
      <div class="title">商家信息</div>
      <ul class="info-list">
        <li
          class="info-item border-top-1px"
          v-for="(info, i) in seller.infos"
          :key="i"
        >{{ info }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { get_seller_detail } from '@/api/request'
import type { SellerDetailProps } from '@/interface/seller-interface'
import Star from '@/components/star/index.vue'
import SupportIcon from '@/components/support-icon/index.vue'
import { support_type_class } from '@/config'

const spinning = ref<boolean>(true)
const seller = ref<SellerDetailProps | any>({})

onMounted(() => {
  get_seller_detail().then(res => {
    console.log(res)
    seller.value = res
  }).catch(() => {
    seller.value = {}
  }).finally(() => {
    spinning.value = false
  })
})
</script>

<style lang="scss" scoped>
.seller-page {
  padding-bottom: 20px;
  .seller-info {
    padding: 18px;
    .top {
      display: flex;
      padding-bottom: 18px;
      .seller-name {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
      }
      .star-wrapper {
        width: 100px;
      }
      .sell-count {
        font-size: 10px;
        color: rgb(77, 85, 93);
        margin-left: 12px;
        line-height: 18px;
      }
      .favorite-wrapper {
        width: 40px;
        text-align: center;
        .icon-favorite {
          font-size: 24px;
          line-height: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .favorite-text {
          margin-top: 4px;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 10px;
        }
      }
    }
    .main {
      padding-top: 18px;
      display: flex;
      .flex-1 {
        flex: 1;
        min-width: 0;
        color: rgb(7, 17, 27);
        text-align: center;
        .text {
          margin-bottom: 4px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
        }
        .unit {
          line-height: 24px;
          font-size: 10px;
        }
        .delivery-price, .delivery-type, .delivery-time {
          font-size: 24px;
          line-height: 24px;
        }
      }
    }
  }
  .block {
    height: 18px;
    background-color: #f3f5f7;
    border-top: 1px solid rgba(7, 17, 27, .1);
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .bulletin-support-wrapper {
    padding: 18px 18px 0;
    .title {
      font-size: 12px;
      color: rgb(7, 17, 27);
    }
    .bulletin-text {
      margin-top: 8px;
      padding: 0 12px 16px;
      font-size: 12px;
      color: rgb(240, 20, 20);
      line-height: 24px;
    }
    .support-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
    }
    .support-item {
      font-size: 0;
      padding: 16px 12px;
      .support-text {
        padding-left: 6px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 16px;
        vertical-align: bottom;
      }
    }
  }
  .seller-detail-wrapper {
    padding: 18px;
    color: rgb(7, 17, 27);
    .title {
      padding-bottom: 12px;
      font-size: 12px;
    }
    .info-item {
      padding: 16px 12px;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .seller-pics-container {
    padding: 18px 0 18px 18px;
    .pic-list {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }
    .title {
      margin-bottom: 12px;
      font-size: 12px;
    }
    .pic-item {
      margin-right: 6px;
      min-width: 120px;
      width: 120px;
      height: 90px;
      .img {
        max-width: 100%;
      }
    }
  }
}
</style>
