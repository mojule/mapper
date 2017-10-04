'use strict'

const assert = require( 'assert' )
const tv4 = require( 'tv4' )
const Mapper = require( '..' )
const toNameValueMap = require( './fixtures/to-name-value-map' )
const fromNameValue = require( './fixtures/from-name-value' )
const toSchemaMap = require( './fixtures/to-schema' )
const fromSchema = require( './fixtures/from-schema' )
const extendJson = require( './fixtures/extend-json' )
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

  describe( 'extended JSON mapper', () => {
    const mapper = Mapper( extendJson )

    it( 'to JSON', () => {
      const data = {
        date: new Date( '1980-10-09' ),
        buffer: new Buffer([ 1, 2, 3 ]),
        number: NaN
      }

      const expect = {
        date: '1980-10-09T00:00:00.000Z',
        buffer: { $buffer: 'AQID' },
        number: { $number: 'NaN' }
      }

      const result = mapper( data )

      assert.deepEqual( result, expect )
    })

    it( 'from JSON', () => {
      const data = {
        date: '1980-10-09T00:00:00.000Z',
        buffer: { $buffer: 'AQID' },
        number: { $number: 'NaN' }
      }

      const obj = mapper( data )

      const { date, buffer, number } = obj

      assert( date instanceof Date )
      assert( buffer instanceof Buffer )

      assert.strictEqual( date.toJSON(), '1980-10-09T00:00:00.000Z' )
      assert.deepEqual( Array.from( buffer ), [ 1, 2, 3 ] )
      assert( Number.isNaN( number ) )
    })
  })

  describe( 'name value mapper', () => {
    const toMapper = Mapper( { map: toNameValueMap } )

    it( 'converts to and from name value map', () => {
      const nameValues = toMapper( KitchenSink() )
      const fromMapper = Mapper( fromNameValue )

      const kitchenSink = fromMapper( nameValues )

      assert.deepEqual( kitchenSink, KitchenSink() )
    })
  })

  describe( 'schema mapper', () => {
    const toMapper = Mapper( { map: toSchemaMap } )
    const toMapperNoDefaults = Mapper( { map: toSchemaMap, omitDefault: true } )

    it( 'converts to schema', () => {
      const instance = KitchenSink()
      const schema = toMapper( instance )
      const result = tv4.validateMultiple( instance, schema )

      assert( result.valid )
    })

    it( 'converts from schema', () => {
      const fromMapper = Mapper( fromSchema )
      const instance = KitchenSink()
      const schema = toMapper( instance )

      const kitchenSink = fromMapper( schema )

      assert.deepEqual( kitchenSink, KitchenSink() )
    })

    it( 'creates from schema with no defaults', () => {
      const fromMapper = Mapper( fromSchema )
      const schema = toMapperNoDefaults( KitchenSink() )
      const model = fromMapper( schema )

      const result = tv4.validateMultiple( model, schema )

      assert( result.valid )
    })
  })
})
