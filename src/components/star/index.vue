<template>
  <div class="star-wrapper" :class="size">
    <span
      v-for="cls in classes"
      :class="{ [cls]: true, 'star-item': true }"
      :key="cls"
    ></span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  size: {
    type: String,
    required: true
  },
  score: {
    type: [Number, String],
    default: 5
  }
})
const classes = computed(() => {
  const list: string[] = []
  const is_integer = Number.isInteger(props.score)
  for (let i = 0, length = Number.parseInt(props.score.toString(), 10); i < length; i++) {
    list.push('on')
  }
  if (!is_integer) {
    list.push('half')
  }
  while (list.length < 5) {
    list.push('off')
  }
  return list
})
</script>

<style lang="scss" scoped>
@import '../../style/background-image.scss';
.star-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .star-item {
    background-repeat: no-repeat;
    background-position: center;
  }
  &.large {
    .star-item {
      width: 24px;
      height: 24px;
      background-size: 24px 24px;
      &.on {
        @include bg-image('./icons/star48_on');
      }
      &.half {
        @include bg-image('./icons/star48_half');
      }
      &.off {
        @include bg-image('./icons/star48_off');
      }
    }
  }
  &.medium {
    .star-item {
      width: 18px;
      height: 18px;
      background-size: 18px 18px;
      &.on {
        @include bg-image('./icons/star36_on');
      }
      &.half {
        @include bg-image('./icons/star36_half');
      }
      &.off {
        @include bg-image('./icons/star36_off');
      }
    }
  }
  &.small {
    .star-item {
      width: 12px;
      height: 12px;
      background-size: 12px 12px;
      &.on {
        @include bg-image('./icons/star24_on');
      }
      &.half {
        @include bg-image('./icons/star24_half');
      }
      &.off {
        @include bg-image('./icons/star24_off');
      }
    }
  }
}
</style>
