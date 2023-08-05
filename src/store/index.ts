import { defineStore } from 'pinia'
import type { SellerDetailProps } from '@/interface/seller-interface'
import type { ShoppingCarGoodsListProps } from '@/interface/shopping-car-interface'
import type { FoodListProps } from '@/interface/goods-interface'
/**
 * @description 商家详情
*/
const useSellerStore = defineStore('seller', {
  state: () => ({
    seller: {} as SellerDetailProps
  }),
  actions: {
    set_seller_detail (payload: SellerDetailProps) {
      this.seller = payload
    }
  }
})

/**
 * @description 购物车
*/
const useShoppingCarStore = defineStore('shopping-car', {
  state: () => ({
    goods_list: [] as ShoppingCarGoodsListProps[]
  }),
  actions: {
    increment (payload: FoodListProps) {
      const { id, name, image, price } = payload
      const good_idx = this.goods_list.findIndex(good => good.id === id)
      if (good_idx === -1) {
        this.goods_list.push({
          count: 1,
          id,
          name,
          url: image,
          price
        })
      } else {
        this.goods_list[good_idx].count += 1
      }
    },
    decrement (payload: ShoppingCarGoodsListProps) {
      const good_idx = this.goods_list.findIndex(good => good.id === payload.id)
      if (good_idx === -1) return
      this.goods_list[good_idx].count -= 1
    }
  },
  getters: {
    price_total: (state) => state.goods_list.reduce((p, n) => p + n.count * n.price, 0),
    count_total: (state) => state.goods_list.reduce((p, n) => p + n.count, 0)
  }
})

export {
  useSellerStore,
  useShoppingCarStore
}
