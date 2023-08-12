/**
 * @description 将时间戳转换为时间
*/
function paddingLeftZero (n: string | number) {
  return ('00' + n).substring(n.toString().length)
}

const format_timestamp = (timestamp: number, fmt = 'yyyy-MM-dd: hh:mm:ss'): string => {
  const date = new Date(timestamp)
  const o: {[key: string]: number } = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const key in o) {
    const ret = new RegExp('(' + key + ')').exec(fmt)
    if (!ret) continue
    if (/(y+)/.test(key)) {
      fmt = fmt.replace(ret[1], o[key].toString().substring(4 - ret[1].length))
    } else {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? o[key].toString() : paddingLeftZero(o[key]))
    }
  }
  return fmt
}

export {
  format_timestamp
}
