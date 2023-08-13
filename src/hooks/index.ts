import { Ref, computed } from 'vue'
import { RATING_POSITIVE, RATING_NEGATIVE, RATING_TYPE_POSITIVE, RATING_TYPE_NEGATIVE } from '@/constants'

const useFilterRating = <T extends { text: string; rateType: number }>(data: Ref<T[]>, is_only_show_content: Ref<boolean>, rate_type: Ref<string>) => {
  const rating_list = computed<T[]>(() => {
    let list = data.value || []
    if (is_only_show_content.value) {
      list = list.filter(item => item.text)
    }
    switch (rate_type.value) {
      case RATING_POSITIVE:
        list = list.filter(item => item.rateType === RATING_TYPE_POSITIVE)
        break
      case RATING_NEGATIVE:
        list = list.filter(item => item.rateType === RATING_TYPE_NEGATIVE)
        break
    }
    return list
  })
  return rating_list
}

export {
  useFilterRating
}
