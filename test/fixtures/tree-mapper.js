'use strict'

const Mapper = require( '../../' )
const extendOptions = require( '../../src/extend-options' )

const Node = () => {
  return {
    type: undefined,
    value: undefined,
    childNodes: []
  }
}

const TreeMapper = options => {
  options = extendOptions( options )

  const { map } = options

  const wrappedMap = Object.keys( map ).reduce( ( obj, key ) => {
    const LogFn = fn => ( value, options ) => {
      const { is } = options
      const node = Node()

      if( options[ TreeMapper.parentSymbol ] ){
        node[ TreeMapper.parentSymbol ] = options.parent
        options[ TreeMapper.parentSymbol ].childNodes.push( node )
      } else {
        TreeMapper.root = node
      }

      options[ TreeMapper.parentSymbol ] = node

      const result = fn( value, options )

      node.type = is.of( result )
      node.value = result

      return result
    }

    obj[ key ] = LogFn( map[ key ] )

    return obj
  }, {} )

  const wrappedOptions = Object.assign( {}, options, { map: wrappedMap } )

  return Mapper( wrappedOptions )
}

TreeMapper.parentSymbol = Symbol( 'parentNode' )
TreeMapper.root = null

module.exports = TreeMapper
