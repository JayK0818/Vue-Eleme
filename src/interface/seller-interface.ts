/**
 * ApifoxModel
 */
type SellerDetailProps = {
  avatar: string
  bulletin: string
  deliveryPrice: number
  deliveryTime: number
  description: string
  foodScore: number
  infos: string[]
  minPrice: number
  name: string
  pics: string[]
  rankRate: number
  ratingCount: number
  score: number
  sellCount: number
  serviceScore: number
  supports: Support[]
}
interface Support {
  description: string
  type: number
}

export type {
  SellerDetailProps
}
