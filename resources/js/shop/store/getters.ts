import userConfig from '../config'

const getters = {
  user: state => {
    const temp = window.localStorage.getItem(userConfig.userKey)

    return temp ? JSON.parse(temp) : {}
  },
}

export default getters
