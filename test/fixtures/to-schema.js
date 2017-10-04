'use strict'

const toSchemaMap = {
  string: ( value, options ) => {
    return {
      type: 'string',
      default: value
    }
  },
  number: ( value, options ) => {
    return {
      type: 'number',
      default: value
    }
  },
  boolean: ( value, options ) => {
    return {
      type: 'boolean',
      default: value
    }
  },
  null: ( value, options ) => {
    return {
      type: 'null'
    }
  },
  array: ( value, options ) => {
    const { mapper } = options

    const schema = {
      type: 'array',
      default: value
    }

    const types = new Set()

    const schemas = value.map( current => {
      const schema = mapper( current, options )

      types.add( schema.type )

      return schema
    })

    if( types.size === 1 ){
      const type = types.values().next().value
      schema.items = { type }
    } else {
      // handle where the array has different items
    }

    return schema
  },
  object: ( value, options ) => {
    const { mapper } = options

    const schema = {
      type: 'object',
      default: value
    }

    const properties = Object.keys( value ).reduce( ( obj, key ) => {
      obj[ key ] = mapper( value[ key ], options )

      return obj
    }, {})

    if( Object.keys( properties ).length )
      schema.properties = properties

    return schema
  }
}

module.exports = toSchemaMap
