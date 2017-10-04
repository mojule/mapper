'use strict'

const cloneMap = {
  array: ( value, options ) => {
    const { mapper } = options

    return value.map( item => mapper( item, options ) )
  },
  object: ( value, options ) => {
    const { mapper } = options

    return Object.keys( value ).reduce( ( obj, key ) => {
      obj[ key ] = mapper( value[ key ], options )

      return obj
    }, {})
  }
}

module.exports = cloneMap
