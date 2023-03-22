import { promises } from 'node:fs'

/**
 * helper script to parse and rewrite the openapi.json file
 * the openapi-typescript-fetch generator cannot correctly create types based on the existing schema,
 * as the discriminator-property is not correctly resolved
 * instead of a union-type an extendable interface is created, which causes issue when the base-type is used
 * e.g.
 * ```ts
 *   type AuthMethod = AuthMethodTan | AuthMethodDecoupled | AuthMethodChallengeResponse
 * ```
 * vs
 * ```ts
 *   interface AuthMethod {
 *     flow: FlowType
 *   }
 *
 *   interface AuthMethodTan extends AuthMethod {
 *     flow: FlowType.TAN,
 *     id: string,
 *     ...
 *   }
 * ```
 */

const openApiFile = await promises.readFile('openapi.json', { encoding: 'utf8' });
const openApi = JSON.parse(openApiFile);
for (const [schemaName, schema] of Object.entries(openApi.components.schemas)) {
    if (schema.discriminator?.mapping) {
        schema.oneOf = schema.oneOf || []; // using one-of allows the typescript-fetch generator to discriminate correctly

        for (const [value, path] of Object.entries(schema.discriminator.mapping)) {
            schema.oneOf.push({ $ref: path });

            const discriminatedName = path.split('/').at(-1); // path like "#/components/schemas/AuthMethodTan", need only "AuthMethodTan"
            const discriminatedSchema = openApi.components.schemas[discriminatedName]
            // find index of discriminator-entry in discriminated-allOf array
            const discriminatorIndex = discriminatedSchema.allOf.findIndex(allOfEntry => allOfEntry.$ref.split('/').at(-1) === schemaName);
            if (discriminatorIndex !== -1) {
                // overwrite with property entry to correctly allow discrimination
                discriminatedSchema.allOf[discriminatorIndex] = {
                    properties: {
                        [schema.discriminator.propertyName]: {
                            type: 'string', // can't use value as type as it does not resolve correctly
                            enum: [value],
                        },
                    },
                };
            } else {
                throw new Error('Discriminator entry unexpectedly not found')
            }
        }
    }
}

await promises.writeFile('openapi.json', JSON.stringify(openApi, null, "    "));