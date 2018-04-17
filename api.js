'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var config = require('./config')
var jwt = require('jwt-simple')
var moment = require('moment')
var models = require('./models/models')

var Produce = models.Produce

module.exports = function (wagner) {
  var api = express.Router()
  api.use(bodyParser.json())
  api.use(bodyParser.urlencoded({
    extended: true
  }))

  function ensureAuthenticated (req, res, next) {
    if (!req.header('Authorization')) {
      return res.status(401).send({
        message: 'Please make sure your request has an Authorization header'
      })
    }
    var token = req.header('Authorization').split(' ')[1]

    var payload = null
    try {
      payload = jwt.decode(token, config.TOKEN_SECRET)
    } catch (err) {
      return res.status(401).send({
        message: err.message
      })
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'Token has expired'
      })
    }
    req.user = payload.sub
    next()
  }

  api.get('/produce', function (req, res) {
    Produce.find({published: true}, 'name ingredients pictures').then(produces => {
      return res.json({
        produces: produces
      })
    }).catch(e => {
      console.log(e)
      return res.status(500).json({
        error: e.toString()
      })
    })
  })

  api.get('/produce/:id', function (req, res) {
    Produce.findById(parseInt(req.params.id), 'name').then(produce => {
      return res.json({
        produce: produce
      })
    }).catch(e => {
      console.log(e)
      return res.status(500).json({
        error: e.toString()
      })
    })
  })

  api.get('/produce/image/:id', function (req, res) {
    Produce.findById(parseInt(req.params.id), 'image').then(produce => {
      res.contentType(produce.image.contentType)
      return res.end(produce.image.data)
    }).catch(e => {
      console.log(e)
      return res.status(500).json({
        error: e.toString()
      })
    })
  })

  return api
}
