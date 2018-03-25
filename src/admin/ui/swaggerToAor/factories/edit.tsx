import {
  Edit,
  // ReferenceArrayInput,
  ReferenceInput,
  // SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'admin-on-rest';
import * as React from 'react';

import { capitalizeFirstLetter } from '../../helpers/string';
import { SwaggerAorOptions } from '../interfaces';

export const formEditFactory = (options: SwaggerAorOptions) => {
  const EntityEdit: React.SFC<any> = props => (
    <Edit {...props}>
      <SimpleForm>
        {Object.keys(options.model.properties).map((property, idx) => {
          switch (options.model.properties[property].type) {
            case 'object':
              return (
                <ReferenceInput
                  label={capitalizeFirstLetter(property)}
                  source={`${property}Id`}
                  reference={property}
                  key={idx}
                >
                  <SelectInput
                    optionValue="id"
                    optionText={options.model.properties[property].display}
                  />
                </ReferenceInput>
              );
            case 'array':
              return false;
            // console.log(options.name);
            // return (
            //   <ReferenceArrayInput
            //     label={capitalizeFirstLetter(property)}
            //     reference={property.slice(0, -1)}
            //     source={`${options.name}Id`}
            //     key={idx}
            //   >
            //     <SelectArrayInput optionText="role.name" />
            //   </ReferenceArrayInput>
            // );
            default:
              return <TextInput source={property} key={idx} />;
          }
        })}
      </SimpleForm>
    </Edit>
  );

  EntityEdit.displayName = `${capitalizeFirstLetter(options.name)}_EDIT`;

  return EntityEdit;
};
