const debug = process.env.NODE_ENV !== 'production'

const config = {
  apiRoot: '/api/shop',
  timeout: debug ? 10000 : 15000,
  smsResendCountdown: 60,
  userKey: 'willshop_shop_user',
}

export default config
