'use strict'

const Is = require( '@mojule/is' )
const defaultOptions = require( './default-options' )

const { map: defaultMap } = defaultOptions

const extendOptions = options => {
  options = Object.assign( {}, defaultOptions, options )

  const { predicates, map } = options

  options.map = Object.assign( {}, defaultMap, map )
  options.is = Is( predicates )

  return options
}

module.exports = extendOptions
