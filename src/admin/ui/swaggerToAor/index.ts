import { fetchJson } from '../http/fetch';

export * from './factories/create';
export * from './factories/edit';
export * from './factories/list';

export * from './interfaces';

export const fetchAndFormatSwaggerJson = async () => {
  const entityNames = process.env.ADMIN_ENTITIES as string;
  const { json } = await fetchJson(process.env.ADMIN_SWAGGER_PATH as string);

  const formattedPaths = Object.keys(json.paths)
    .filter((entryPoint: string) => {
      return !!Array.from(entityNames).find(entityName =>
        entryPoint.includes(entityName),
      );
    })
    .reduce((acc, entryPoint) => {
      const key = entryPoint.split('/')[2];
      const thing = json.paths[entryPoint].post || json.paths[entryPoint].put;

      let modelName;
      if (thing) {
        const { schema } = thing.parameters.find(
          (param: any) => param.in === 'body',
        );
        modelName = schema.$ref.split('/')[2];
      }

      return {
        ...acc,
        [key]: {
          ...acc[key],
          model: json.definitions[modelName],
        },
      };
    }, {});

  return Object.keys(formattedPaths).map(key => ({
    name: key,
    ...formattedPaths[key],
  }));
};
