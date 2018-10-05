const debug = process.env.NODE_ENV !== 'production'

const APP_NAME = 'willshop'

const config = {
  apiRoot: '/api/admin',
  timeout: debug ? 10000 : 15000,
  authTokenKey: `${APP_NAME}_admin_token`,
  userKey: `${APP_NAME}_admin_user`
}

export default config

export {
  APP_NAME
}
