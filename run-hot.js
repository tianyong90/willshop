'use strict'

const portfinder = require('portfinder')
const execa = require('execa')

portfinder.getPortPromise({
  port: 8080,
  stopPort: 9000,
}).then((port) => {
    execa.stdout(`encore dev-server --hot --port ${port}`)
  }).catch((err) => {
    console.error(err)
  })
