export default {
  filters: {
    priceFilter: function (val) {
      return '￥' + Number(val).toFixed(2)
    }
  }
}
