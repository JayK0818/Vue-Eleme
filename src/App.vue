<template>
  <header></header>
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
</template>

<script lang="ts" setup>
import { nav_list } from '@/config/nav'

</script>

<style lang="scss" scoped>
.tab-list {
  display: flex;
  height: 0.8rem;
  line-height: 0.8rem;
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
