import { Datagrid, EditButton, List, TextField } from 'admin-on-rest';
import * as React from 'react';

import { capitalizeFirstLetter } from '../../helpers/string';
import { SwaggerAorOptions } from '../interfaces';

export const listFactory = (options: SwaggerAorOptions) => {
  const EntityList: React.SFC<any> = props => (
    <List {...props}>
      <Datagrid>
        {Object.keys(options.model.properties).map((property, idx) => (
          <TextField source={property} key={idx} />
        ))}
        <EditButton />
      </Datagrid>
    </List>
  );

  EntityList.displayName = `${capitalizeFirstLetter(options.name)}_LIST`;

  return EntityList;
};
