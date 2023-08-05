interface FoodListProps {
  description: string
  icon: string
  id: number
  image: string
  info: string
  name: string
  oldPrice: number | string
  price: number
  rating: number | string
  ratings: Array<{
    avatar: string
    rateTime: number
    rateType: number
    text: string
    username: string
  }>
  sellCount: number
}

interface GoodsListProps {
  foods: Array<FoodListProps>
  name: string
  type: number
}

export type {
  GoodsListProps,
  FoodListProps
}
