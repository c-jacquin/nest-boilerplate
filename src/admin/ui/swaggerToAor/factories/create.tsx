import { Create, SimpleForm, TextInput } from 'admin-on-rest';
import React from 'react';

import { capitalizeFirstLetter } from '../../helpers/string';
import { SwaggerAorOptions } from '../interfaces';

export const formCreateFactory = (options: SwaggerAorOptions) => {
  const EntityCreate: React.SFC<any> = props => (
    <Create {...props}>
      <SimpleForm>
        {Object.keys(options.model.properties).map((property, idx) => {
          switch (options.model.properties[property].type) {
            case 'object':
              return false;
            // return (
            //   <ReferenceInput
            //     label={capitalizeFirstLetter(property)}
            //     source={`${property}Id`}
            //     reference={property}
            //     key={idx}
            //   >
            //     <SelectInput
            //       optionText={options.model.properties[property].display}
            //     />
            //   </ReferenceInput>
            // );
            case 'array':
              return false;
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
    </Create>
  );

  EntityCreate.displayName = `${capitalizeFirstLetter(options.name)}_CREATE`;

  return EntityCreate;
};
