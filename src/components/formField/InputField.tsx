import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField(props: InputFieldProps) {
  const { name, control, label, ...inputProps } = props;
  const {
    field: { value, onBlur, onChange, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <TextField
      variant="outlined"
      label={label}
      margin="normal"
      fullWidth
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
