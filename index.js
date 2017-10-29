'use strict'

const extendOptions = require( './src/extend-options' )

const Mapper = options => {
  options = extendOptions( options )

  const mapper = ( value, mapOptions ) => {
    mapOptions = Object.assign( {}, options, { mapper }, mapOptions  )

    const { map, is } = mapOptions
    const type = is.of( value )
    const fn = map[ type ]

    if( is.function( fn ) )
      return fn( value, mapOptions )

    return value
  }

  return mapper
}

module.exports = Mapper
