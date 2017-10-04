'use strict'

const assert = require( 'assert' )
const tv4 = require( 'tv4' )
const Mapper = require( '..' )
const toNameValueMap = require( './fixtures/to-name-value-map' )
const fromNameValue = require( './fixtures/from-name-value' )
const expectNameValue = require( './fixtures/expect-name-value.json' )
const toSchemaMap = require( './fixtures/to-schema' )
const fromSchema = require( './fixtures/from-schema' )
const KitchenSink = require( './fixtures/kitchen-sink' )

describe( 'mapper', () => {
  describe( 'default (clone)', () => {
    const mapper = Mapper()

    it( 'clones', () => {
      const instance = KitchenSink()
      const expect = KitchenSink()
      const cloned = mapper( instance )

      assert.notEqual( cloned, expect )
      assert.notEqual( cloned, instance )
      assert.deepEqual( cloned, expect )
    })
  })

  describe( 'name value mapper', () => {
    const toMapper = Mapper( { map: toNameValueMap } )

    it( 'converts to name value map', () => {
      const nameValues = toMapper( KitchenSink() )

      assert.deepEqual( nameValues, expectNameValue )
    })

    it( 'converts from name value map', () => {
      const nameValues = toMapper( KitchenSink() )
      const fromMapper = Mapper( fromNameValue )

      const kitchenSink = fromMapper( nameValues )

      assert.deepEqual( kitchenSink, KitchenSink() )
    })
  })

  describe( 'schema mapper', () => {
    const toMapper = Mapper( { map: toSchemaMap } )

    it( 'converts to schema', () => {
      const instance = KitchenSink()
      const schema = toMapper( instance )

      assert( tv4.validate( instance, schema ) )
    })

    it( 'converts from schema', () => {
      const fromMapper = Mapper( fromSchema )
      const instance = KitchenSink()
      const schema = toMapper( instance )

      const kitchenSink = fromMapper( schema )

      assert.deepEqual( kitchenSink, KitchenSink() )
    })
  })
})
