import coioteLwM2MJsonShcema from "../shadow/coioteLwM2MJsonShcema.schema.json"
import sc from "schema-casting";

const input = {
  "3303:1.1": [
    {
      "5518": "1665149633",
      "5601": "23.51",
      "5602": "23.51",
      "5603": "-40",
      "5604": "85",
      "5700": "24.57",
      "5701": "Celsius degrees",
    },
    {
      "5518": 1665149633,
      "5601": "23.51",
      "5602": "23.51",
      "5603": "-40",
      "5604": "85",
      "5700": 24.57,
      "5701": "Celsius degrees",
    },
  ],
};


// NOTE: this implementation is temporal
const castData = (schema: object, value: object) => sc(schema, value)
console.log(castData(coioteLwM2MJsonShcema,input))
