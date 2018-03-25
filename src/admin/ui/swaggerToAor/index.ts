import { fetchJson } from '../http/fetch';

export * from './factories/create';
export * from './factories/edit';
export * from './factories/list';

import config from '../config.json';
import { deepAssign } from '../helpers/object';
import { capitalizeFirstLetter } from '../helpers/string';
import { SwaggerAorOptions } from './interfaces';
export * from './interfaces';

export const fetchAndFormatSwaggerJson = async (): Promise<
  SwaggerAorOptions[]
> => {
  const entityNames = process.env.ADMIN_ENTITIES as string;
  const { json } = await fetchJson(process.env.SWAGGER_JSON_PATH as string);
  const formattedPaths = Object.keys(json.paths)
    .filter(
      (entryPoint: string) =>
        !!Array.from(entityNames).find(entityName =>
          entryPoint.includes(entityName),
        ),
    )
    .reduce((acc, entryPoint) => {
      const key = entryPoint.split('/')[2];
      let endpoints = Object.keys(json.paths[entryPoint]);

      if (acc[key]) {
        endpoints = [...endpoints, ...acc[key].endpoints];
      }
      const { properties, required } = json.definitions[
        capitalizeFirstLetter(key)
      ];
      const model: any = { properties: {} };
      for (const prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          model.properties[prop] = !!properties[prop].$ref
            ? json.definitions[capitalizeFirstLetter(prop)]
            : properties[prop];
          model.required = required.includes(prop);
        }
      }

      return {
        ...acc,
        [key]: {
          ...acc[key],
          endpoints: Array.from(new Set(endpoints)),
          model,
          name: key,
        },
      };
    }, {});

  return Object.values<SwaggerAorOptions>(deepAssign()(formattedPaths, config));
};
