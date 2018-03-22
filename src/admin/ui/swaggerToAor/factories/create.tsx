import { Create, SimpleForm, TextInput } from 'admin-on-rest';
import * as React from 'react';

import { capitalizeFirstLetter } from '../../helpers/string';
import { SwaggerAorOptions } from '../interfaces';

export const formCreateFactory = (options: SwaggerAorOptions) => {
  const EntityList: React.SFC<any> = props => (
    <Create {...props}>
      <SimpleForm>
        {Object.keys(options.model.properties).map((property, idx) => (
          <TextInput source={property} key={idx} />
        ))}
      </SimpleForm>
    </Create>
  );

  EntityList.displayName = `${capitalizeFirstLetter(options.name)}_CREATE`;

  return EntityList;
};
