const _ = require('lodash')
const request = require('request')
const config = require('./config')

const bind = function(fn, me) {
  return function() {
    return fn.apply(me, arguments)
  }
}

const Wowza = (function() {
  function Wowza(apikey, accessKey, options) {
    const env = _.get(options, 'env', 'production')
    this.url = _.get(config, 'apiUrl.' + env)

    // bind all available calls crom config
    const that = this

    _.forEach(config.operations, function(op) {
      that[op.operation] = function(data, cb) {
        let requiredFields = _.get(op, 'requiredFields', [])
        let validate = that.validate({ requiredFields: requiredFields, data: data })
        if (validate) return cb(validate)

        let path = op.path
        // replace fields like {id} in path
        const regex = /({[a-z_]*})/g
        let matches = path.match(regex)
        _.forEach(matches, function(match) {
          let key = match.replace(/[{}]/g, '')
          let value = _.get(data, key)
          if (!value) return cb('field_' + key + '_required')
          path = path.replace(match, value)
        })

        // if op has property "root" then the data must be wrapped into this element
        if (_.get(op, 'root')) {
          let root = {}
          _.set(root, _.get(op, 'root'), data)
          data = root
        }

        return that[op.method](path, data, function(err, result) {
          if (err) return cb(err)
          let statusCode = _.get(result, 'statusCode')
          if (statusCode >= 400) {
            err = { statusCode: statusCode, message: _.get(result, 'body.meta.code') }
          }
          return cb(err, _.get(result, 'body'))
        })
      }
    })

    this['delete'] = bind(this['delete'], this)
    this.put = bind(this.put, this)
    this.post = bind(this.post, this)
    this.get = bind(this.get, this)

    let defaultHeaders = {
      'Content-Type': 'application/json',
      'wsc-api-key': apikey,
      'wsc-access-key': accessKey
    }

    this.r = request.defaults({
      headers: defaultHeaders
    })
  }

  Wowza.prototype.get = function(path, data, cb) {
    let params = {
      method: 'get',
      uri: this.url + path,
      json: data
    }
    return this.r(params, cb)
  }

  Wowza.prototype.post = function(path, data, cb) {
    let params = {
      method: 'post',
      uri: this.url + path,
      json: data
    }
    return this.r(params, cb)
  }

  Wowza.prototype.put = function(path, data, cb) {
    let params = {
      method: 'put',
      uri: this.url + path,
      json: data
    }
    return this.r(params, cb)
  }

  Wowza.prototype.patch = function(path, data, cb) {
    let params = {
      method: 'patch',
      uri: this.url + path,
      json: data
    }
    return this.r(params, cb)
  }

  Wowza.prototype['delete'] = function(path, data, cb) {
    let params = {
      method: 'delete',
      uri: this.url + path,
      json: data
    }
    return this.r(params, cb)
  }

  Wowza.prototype.validate = function(params) {
    let requiredFields = params.requiredFields
    let dataToValidate = params.data

    let err
    _.each(requiredFields, function(field) {
      if (!_.has(dataToValidate, field)) err = field + '_missing'
    })
    return err
  }

  return Wowza
})()

module.exports = Wowza
