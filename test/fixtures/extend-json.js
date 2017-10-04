'use strict'

const is = require( '@mojule/is' )

const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

const isSingleProperty = value =>
  is.object( value ) && Object.keys( value ).length === 1

const predicates = {
  date: value => value instanceof Date,
  buffer: value => value instanceof Buffer,
  NaN: value => Number.isNaN( value ),
  jsonDate: value => is.string( value ) && dateRegex.test( value ),
  jsonBuffer: value => isSingleProperty( value ) && is.string( value.$buffer ),
  jsonNaN: value => isSingleProperty( value ) && value.$number === 'NaN'
}

const map = {
  date: value => value.toJSON(),
  buffer: value => ({ $buffer: value.toString( 'base64' ) }),
  NaN: value => ({ $number: 'NaN' }),
  jsonDate: value => new Date( value ),
  jsonBuffer: value => Buffer.from( value.$buffer, 'base64' ),
  jsonNaN: value => NaN
}

module.exports = { predicates, map }
