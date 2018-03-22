export interface SwaggerAorOptions {
  name: string;
  endpoints: string[];
  model: {
    properties: {
      [key: string]: {
        description: string;
        type: string;
      };
    };
    required: string[];
  };
}
