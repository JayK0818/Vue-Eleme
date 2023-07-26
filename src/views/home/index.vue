<template>
  <div>hello world</div>
</template>

<script lang="ts" setup>
import axios from '@/api'
axios.get('/api/seller/seller_detail').then(res => {
  console.log(res)
})
</script>

<style lang="scss" scoped></style>
