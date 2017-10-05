# mapper

A simple module for mapping things from one value to another.

`npm install @mojule/mapper`

With no options passed, it defaults to returning a function that expects JSON
compatible values and clones them:

```javascript
const Mapper = require( '@mojule/mapper' )

const mapper = Mapper()

const data = { foo: 'bar' }
const clone = mapper( data )
```

The real value of it comes when you pass custom predicates and mappings.

Clone the value, and while cloning it convert any instances of a legacy person
object to a new person object:

```javascript
const Mapper = require( '@mojule/mapper' )
const is = require( '@mojule/is' )

const map = {
  legacyPerson: value => {
    const { name, age } = value
    const [ firstName, lastName ] = name.split( ' ' )

    return { firstName, lastName, age }
  }
}

const predicates = {
  legacyPerson: value =>
    is.object( value ) && is.string( value.name ) && is.number( value.age )
}

const mapper = Mapper( { map, predicates } )

const data = {
  department: 'Mad Science',
  people: [
    { name: 'Xjkzlor Wijklmon', age: 107 },
    { name: 'Vrnujghx Brjhamix', age: 9 }
  ]
}

/*
  {
    department: 'Mad Science',
    people: [
      { firstName: 'Xjkzlor', lastName: 'Wijklmon', age: 107 },
      { firstName: 'Vrnujghx', lastName: 'Brjhamix', age: 9 }
    ]
  }
*/
const result = mapper( data )
```

The easiest way to understand is probably to look at the test fixtures where you
can see examples of:

- Mapping objects to and from arrays of name value pairs
- Mapping non-JSON compatible values to and from JSON-compatible values
- Mapping objects to and from JSON schema
