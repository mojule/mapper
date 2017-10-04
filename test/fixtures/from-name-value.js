'use strict'

const is = require( '@mojule/is' )

const predicates = {
  nameValues: value =>
    is.array( value ) && value.length > 0 && value.every( current =>
      is.object( current ) &&
      ( is.string( current.name ) || is.null( current.name ) ) &&
      ( 'value' in current ) &&
      Object.keys( current ).length === 2
    )
}

const map = {
  nameValues: ( value, options ) => {
    const { mapper } = options

    return value.reduce( ( obj, pair ) => {
      const { name, value } = pair

      if( name )
        obj[ name ] = mapper( value, options )

      return obj
    }, {})
  }
}

module.exports = { predicates, map }
