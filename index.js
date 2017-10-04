'use strict'

const Is = require( '@mojule/is' )
const defaultOptions = require( './src/default-options' )

const Mapper = options => {
  options = Object.assign( {}, defaultOptions, options )

  const { map, predicates } = options

  if( !map )
    throw TypeError( 'options missing required maps property' )

  const is = Is( predicates )

  const mapper = ( value, mapOptions ) => {
    mapOptions = Object.assign( {}, options, { is, mapper }, mapOptions )

    const type = is.of( value )
    const result = map[ type ]( value, mapOptions )

    return result
  }

  return mapper
}


module.exports = Mapper
