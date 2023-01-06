import sc from "schema-casting";
import { cast } from "./cast";

/**
 * Draft schema of 3303
 */
const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    "5518": { required: true, type: "integer" },
  },
  required: true,
  additionalProperties: false,
};

const input = {
  "5518": "1665149633",
};

const output = sc(schema, input);
// { '5518': 1665149633 }
console.log(output);

console.log(cast(schema, input))
