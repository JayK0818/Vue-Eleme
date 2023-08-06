type RatingListProps = {
  avatar: string
  rateTime: number
  rateType: number
  text: string
  username: string
}

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
  ratings: Array<RatingListProps>
  sellCount: number
}

interface GoodsListProps {
  foods: Array<FoodListProps>
  name: string
  type: number
}

export type {
  GoodsListProps,
  FoodListProps,
  RatingListProps
}
