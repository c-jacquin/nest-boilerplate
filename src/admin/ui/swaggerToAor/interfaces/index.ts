export interface SwaggerAorOptions {
  name: string;
  endpoints: string[];
  model: {
    properties: {
      [key: string]: {
        description: string;
        display: string;
        required: boolean;
        type: string;
      };
    };
    required: string[];
  };
}
