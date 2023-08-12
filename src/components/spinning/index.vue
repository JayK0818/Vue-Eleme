<template>
  <div class="loading-wrapper">
    <div class="spin-container">
      <span class="spin-icon"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes move {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  .spin-container {
    position: relative;
    top: 50%;
    transform:translateY(-50%);
    text-align: center;
  }
  .spin-icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    border: 2px solid rgba(0, 0, 0, 0);
    border-radius: 50%;
    border-top-color: rgb(0, 160, 220);
    animation: move 1.2s linear 0s infinite;
  }
}
</style>
