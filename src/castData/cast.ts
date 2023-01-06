

'use strict';

import _ from 'lodash';
import Validator from 'jsonschema' 

const types = {
  integer: {
    test: (val: number) => !isNaN(val),
    cast: (val: string) => parseInt(val, 10)
  },
  number: {
    test: (val: number) => !isNaN(val),
    cast: (val: string) => parseFloat(val, 10)
  },
  boolean: {
    test: _.isBoolean,
    cast: (val: string) => val === 'true' || val === '1'
  },
  array: {
    test: _.isArray,
    cast: JSON.parse
  }
};

export const cast = (schema: any, input: any) => {
  const errors = Validator.validate(input, schema).errors;

  if (errors === null) {
    return input;
  }

  const BASE_NAME = 'instance';
  const carrier = {
    [BASE_NAME]: _.cloneDeep(input)
  };

  _(errors)
    .filter({ name: 'type' })
    .filter(({ argument }) => _.has(types, argument[0]))
    .forEach((error) => {
      // E.g. 'instance.a.b.c'
      const key = error.property;
      const type = types[error.schema.type];

      const val = type.cast(_.get(carrier, key));
      if (type.test(val)) {
        _.set(carrier, key, val);
      }
    });

  return carrier[BASE_NAME];
};