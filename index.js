'use strict'

const Is = require( '@mojule/is' )
const defaultOptions = require( './src/default-options' )

const Mapper = options => {
  options = Object.assign( {}, defaultOptions, options )

  const { map, predicates } = options

  if( !map )
    throw TypeError( 'options missing required map' )

  const is = Is( predicates )

  const mapper = ( value, mapOptions ) => {
    mapOptions = Object.assign( {}, options, { is, mapper }, mapOptions )

    const type = is.of( value )
    const fn = map[ type ]

    if( is.function( fn ) )
      return map[ type ]( value, mapOptions )

    return value
  }

  return mapper
}

module.exports = Mapper
