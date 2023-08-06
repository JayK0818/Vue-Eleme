import { defineStore } from 'pinia'
import type { SellerDetailProps } from '@/interface/seller-interface'
// import type { ShoppingCarGoodsListProps } from '@/interface/shopping-car-interface'
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
type ShoppingCarGoodsListProps = FoodListProps & {
  count: number
}
const useShoppingCarStore = defineStore('shopping-car', {
  state: () => ({
    food_list: [] as ShoppingCarGoodsListProps[]
  }),
  actions: {
    increment (payload: FoodListProps) {
      const good_idx = this.food_list.findIndex(food => food.id === payload.id)
      if (good_idx === -1) {
        this.food_list.push({ ...payload, count: 1 })
      } else {
        this.food_list[good_idx].count += 1
      }
    },
    decrement (payload: ShoppingCarGoodsListProps) {
      const good_idx = this.food_list.findIndex(food => food.id === payload.id)
      if (good_idx === -1) return
      this.food_list[good_idx].count -= 1
      if (this.food_list[good_idx].count === 0) {
        this.food_list.splice(good_idx, 1)
      }
    },
    clear () {
      this.food_list = []
    }
  },
  getters: {
    price_total: (state) => state.food_list.reduce((p, n) => p + n.count * n.price, 0),
    count_total: (state) => state.food_list.reduce((p, n) => p + n.count, 0),
    food_id_count_map: (state) => {
      const map: {[key: number]: number} = {}
      state.food_list.forEach(item => {
        map[item.id] = item.count
      })
      return map
    }
  }
})

export {
  useSellerStore,
  useShoppingCarStore
}
