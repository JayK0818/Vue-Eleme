<template>
  <div class="shopping-car-wrapper">
    <section style="flex: 1; display: inline-flex;">
      <div class="car-container">
        <div class="car">
          <span class="car-icon icon-shopping_cart"></span>
        </div>
      </div>
      <div class="price-container"></div>
      <div class="delivery-info-container">
        <div class="delivery-info border-left-1px">另需配送费 ¥4元</div>
      </div>
    </section>
    <div class="confirm-btn"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.shopping-car-wrapper {
  display: flex;
  height: 48px;
  background-color: #141d27;
  .car-container {
    margin-left: 12px;
    margin-top: -10px;
    width: 44px;
    height: 44px;
    padding: 6px;
    background-color: #141d27;
    border-radius: 50%;
    z-index: 10;
    .car {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      color: rgba(255, 255, 255, .4);
      background-color: #2b343c;
    }
    .car-icon {
      font-size: 24px;
      line-height: 24px;
    }
  }
  .confirm-btn {
    box-sizing: border-box;
    padding: 0 8px;
    width: 100px;
    height: 100%;
    font-size: 12px;
    line-height: 24px;
    font-weight: 700;
    text-align: center;
    color: rgba(255, 255, 255, .4);
    background-color: #2b333b;
  }
  .price-container {
    width: 50px;
    text-align: center;
    line-height: 48px;
    font-weight: bold;
    font-size: 16px;
    color: rgba(255, 255, 255, .4);
  }
  .delivery-info-container {
    flex: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    .delivery-info {
      padding-left: 12px;
      font-size: 14px;
      color: rgba(255, 255, 255, .4);
      font-weight: 200;
      line-height: 24px;
    }
  }
}
</style>
