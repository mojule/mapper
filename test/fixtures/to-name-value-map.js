'use strict'

const cloneMap = require( '../../src/clone-map' )

const toNameValueMap = Object.assign( {}, cloneMap, {
  object: ( value, options ) => {
    const { mapper } = options
    const keys = Object.keys( value )

    if( keys.length === 0 ){
      return [{
        name: null,
        value: null
      }]
    }

    return keys.map( key => ({
      name: key,
      value: mapper( value[ key ], options )
    }))
  }
})

module.exports = toNameValueMap
