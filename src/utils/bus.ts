import mitt from 'mitt'
type Events = {
  update: any
}
const bus = mitt<Events>()

export default bus
