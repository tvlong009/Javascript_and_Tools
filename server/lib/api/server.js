import morgan from 'morgan'
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
import routes from './routes'
import config from './config'

export default class ApiServer {
  constructor(port) {
    this._port = port
    this._server = express()

    this._server.set('superSecret', config.secret)

    this._server.use(bodyParser.urlencoded({extended: false}))
    this._server.use(bodyParser.json())
    this._server.use(expressValidator({
      customValidators: {
        gte: (param, num) => {
          return param >= num
        }
      }
    }))
    this._server.use(morgan('dev'))

    routes(this._server)
  }

  start() {
    mongoose.Promise = require('bluebird')
    mongoose.connect(config.database)
    this._server.listen(this._port)
  }
}
