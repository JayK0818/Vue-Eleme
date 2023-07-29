import { defineStore } from 'pinia'
import type { SellerDetailProps } from '@/interface/seller-interface'

const useSellerStore = defineStore('seller', {
  state: () => ({
    detail: {} as SellerDetailProps
  }),
  actions: {
    set_seller_detail (payload: SellerDetailProps) {
      this.detail = payload
    }
  }
})

export {
  useSellerStore
}
