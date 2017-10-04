'use strict'

const KitchenSink = () => {
  const kitchenSink = {
    string: 'foo',
    emptyString: '',
    number: -1.5,
    true: true,
    false: false,
    null: null,
    array: [ 1, 2, 3 ],
    emptyArray: [],
    object: { foo: 'bar', baz: 'qux' },
    emptyObject: {}
  }

  return kitchenSink
}

module.exports = KitchenSink
