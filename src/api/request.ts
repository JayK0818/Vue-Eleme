import axios from './index'
import { useSellerStore } from '@/store'
import { SellerDetailProps } from '@/interface/seller-interface'
/**
 * @description 将商家详情结果缓存
*/
const get_seller_detail = async (): Promise<SellerDetailProps | any> => {
  const store = useSellerStore()
  if (Object.keys(store.detail).length) {
    return store.detail
  }
  try {
    const data = await axios.get('/api/seller/seller_detail') as SellerDetailProps
    store.set_seller_detail(data)
    return data
  } catch (err) {
    return {}
  }
}

export {
  get_seller_detail
}
