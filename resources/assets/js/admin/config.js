const debug = process.env.NODE_ENV !== 'production'

const config = {
  apiRoot: '/api/admin',
  timeout: debug ? 10000 : 15000,
  authTokenKey: 'mj_admin_token',
  userKey: 'mj_admin_user'
}

export default config
