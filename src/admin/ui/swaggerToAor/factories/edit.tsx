import { Edit, SimpleForm, TextInput } from 'admin-on-rest';
import * as React from 'react';

import { capitalizeFirstLetter } from '../../helpers/string';
import { SwaggerAorOptions } from '../interfaces';

export const formEditFactory = (options: SwaggerAorOptions) => {
  const EntityList: React.SFC<any> = props => (
    <Edit {...props}>
      <SimpleForm>
        {Object.keys(options.model.properties).map((property, idx) => (
          <TextInput source={property} key={idx} />
        ))}
      </SimpleForm>
    </Edit>
  );

  EntityList.displayName = `${capitalizeFirstLetter(options.name)}_EDIT`;

  return EntityList;
};
