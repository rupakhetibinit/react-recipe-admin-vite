import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

const InputField = props => {
  const { label, leftAddon, ...restOfProps } = props;
  const [field, meta] = useField(props);

  return (
    <FormControl id={props.name} isInvalid={!!meta.error && !!meta.touched}>
      {label && (
        <FormLabel mb="1" htmlFor={props.name}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {leftAddon && <InputLeftAddon bg="purple.50" children={leftAddon} />}
        <Input focusBorderColor="purple.500" {...field} {...restOfProps} />
      </InputGroup>
      {meta.error && meta.touched && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default InputField;
