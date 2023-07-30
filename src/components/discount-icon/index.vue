<template>
  <span
    class="icon"
    :class="{
      [type]: true,
      ['level-'+level]: true
    }"
  ></span>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped>
@import '../../style/background-image.scss';
.icon {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  &.decrease {
    &.level-1 {
      @include bg-image('./icons/decrease_1');
    }
    &.level-2 {
      @include bg-image('./icons/decrease_2');
    }
    &.level-3 {
      @include bg-image('./icons/decrease_3');
    }
  }
  &.discount {
    &.level-1 {
      @include bg-image('./icons/discount_1');
    }
    &.level-2 {
      @include bg-image('./icons/discount_2');
    }
    &.level-3 {
      @include bg-image('./icons/discount_3');
    }
  }
  &.guarantee {
    &.level-1 {
      @include bg-image('./icons/guarantee_1');
    }
    &.level-2 {
      @include bg-image('./icons/guarantee_2');
    }
    &.level-3 {
      @include bg-image('./icons/guarantee_3');
    }
  }
  &.special {
    &.level-1 {
      @include bg-image('./icons/special_1');
    }
    &.level-2 {
      @include bg-image('./icons/special_2');
    }
    &.level-3 {
      @include bg-image('./icons/special_3');
    }
  }
  &.invoice {
    &.level-1 {
      @include bg-image('./icons/invoice_1');
    }
    &.level-2 {
      @include bg-image('./icons/invoice_2');
    }
    &.level-3 {
      @include bg-image('./icons/invoice_3');
    }
  }
}

</style>
