import {
  ChipField,
  Datagrid,
  EditButton,
  List,
  ReferenceField,
  ReferenceManyField,
  SingleFieldList,
  TextField,
} from 'admin-on-rest';
import React from 'react';

import { capitalizeFirstLetter } from '../../helpers/string';
import { SwaggerAorOptions } from '../interfaces';

export const listFactory = (options: SwaggerAorOptions) => {
  const EntityList: React.SFC<any> = props => (
    <List {...props}>
      <Datagrid>
        {Object.keys(options.model.properties).map((property, idx) => {
          switch (options.model.properties[property].type) {
            case 'object':
              return (
                <ReferenceField
                  label={capitalizeFirstLetter(property)}
                  source={`${property}Id`}
                  reference={property}
                  key={idx}
                >
                  <TextField source="name" />
                </ReferenceField>
              );
            case 'array':
              return (
                <ReferenceManyField
                  label={capitalizeFirstLetter(property)}
                  reference={property.slice(0, -1)}
                  target={`${options.name}Id`}
                  key={idx}
                >
                  <SingleFieldList>
                    <ChipField
                      source={options.model.properties[property].display}
                    />
                  </SingleFieldList>
                </ReferenceManyField>
              );
            default:
              return (
                <TextField
                  source={property}
                  key={idx}
                  style={{ maxWidth: '200px' }}
                />
              );
          }
        })}
        <EditButton />
      </Datagrid>
    </List>
  );

  EntityList.displayName = `${capitalizeFirstLetter(options.name)}_LIST`;

  return EntityList;
};
