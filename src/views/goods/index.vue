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
    <div class="goods-container"></div>
  </div>
</template>

<script lang="ts" setup>
import axios from '@/api'
import { onMounted, ref } from 'vue'
import SupportIcon from '@/components/support-icon/index.vue'
import type { GoodsListProps } from '@/interface/goods-interface'
import { support_type_class } from '@/config'

const goods_list = ref<GoodsListProps[]>([])
const spinning = ref<boolean>(true)

const get_goods_list = () => {
  spinning.value = true
  axios.get<GoodsListProps[]>('/api/seller/goods').then(res => {
    goods_list.value = res
  }).catch(() => {
    goods_list.value = []
  }).finally(() => {
    spinning.value = false
  })
}
onMounted(() => {
  get_goods_list()
})
</script>

<style lang="scss" scoped>
.goods-page {
  display: flex;
  height: 100%;
  overflow: auto;
  .menu-list {
    box-sizing: border-box;
    padding: 0 12px;
    width: 84px;
    background-color: #f3f5f7;
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
  }
}
</style>
