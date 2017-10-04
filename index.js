'use strict'

const Is = require( '@mojule/is' )
const defaultOptions = require( './src/default-options' )

const { map: defaultMap } = defaultOptions

const Mapper = options => {
  options = Object.assign( {}, defaultOptions, options )

  const { predicates } = options
  const is = Is( predicates )

  let { map } = options

  if( map !== defaultMap )
    map = Object.assign( {}, defaultMap, map )

  const mapper = ( value, mapOptions ) => {
    mapOptions = Object.assign( {}, options, { is, mapper }, mapOptions )

    const type = is.of( value )
    const fn = map[ type ]

    if( is.function( fn ) )
      return fn( value, mapOptions )

    return value
  }

  return mapper
}

module.exports = Mapper
