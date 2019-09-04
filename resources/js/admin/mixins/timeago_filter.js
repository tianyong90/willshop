import _timeago from 'timeago.js'

export default {
  filters: {
    timeago (time) {
      const _timeagoInstance = _timeago(null, 'zh_CN')
      return _timeagoInstance.format(time)
    },
  },
}
