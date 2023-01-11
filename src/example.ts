import coioteShadow from "./input/shadow.json";
import { LwM2MIds } from "./input/LwM2M-ids";
import jsonSchema from "../node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json"; // TODO: export json schema from lib
import { main } from "./index";

main(coioteShadow, jsonSchema, LwM2MIds);
