<template>
  <v-header :seller="seller"/>
  <div class="tab-list border-bottom-1px">
    <router-link
      v-for="nav in nav_list"
      :key="nav.label"
      :to="nav.value"
      custom
      v-slot="{ navigate, isActive }"
    >
      <div
        class="tab-item"
        @click="navigate"
        :class="{ active: isActive }"
      >{{ nav.label }}</div>
    </router-link>
  </div>
  <div class="content">
    <router-view/>
  </div>
  <!-- 弹出层 -->
  <teleport to="body">
    <seller-layer :seller="seller"/>
  </teleport>
</template>

<script lang="ts" setup>
import { nav_list } from '@/config/nav'
import SellerLayer from '@/components/seller-layer/index.vue'
import VHeader from '@/components/v-header/index.vue'
import type { SellerDetailProps } from '@/interface/seller-interface'
import { ref, onMounted } from 'vue'
import { get_seller_detail } from '@/api/request'

const seller = ref<SellerDetailProps | any>({})
const spinning = ref<boolean>(true)

onMounted(() => {
  get_seller_detail().then(res => {
    seller.value = res
    console.log(res)
  })
    .catch((err) => {
      console.log(err)
      seller.value = {}
    })
    .finally(() => {
      spinning.value = false
    })
})
</script>

<style lang="scss" scoped>
.tab-list {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  .tab-item {
    flex: 1;
    text-align: center;
    color: rgb(77, 85, 93);
    font-size: 14px;
    cursor: pointer;
    &.active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
