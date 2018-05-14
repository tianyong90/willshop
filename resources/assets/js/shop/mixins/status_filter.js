export default {
  filters: {
    statusFilter: function (status) {
      switch (status) {
        case 'need_to_pay':
          return '待支付'
        case 'paid':
          return '待支付'
        case 'delivered':
          return '待支付'
        case 'finished':
          return '待支付'
        case 'canceled':
          return '待支付'
        default:
          return ''
      }
    }
  }
}
