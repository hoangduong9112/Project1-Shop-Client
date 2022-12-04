import { FormHelperText, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: number | string;
}
export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField(props: RadioGroupFieldProps) {
  const { name, control, label, disabled, options } = props;
  const {
    field: { value, onBlur, onChange },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl disabled={disabled} margin="normal" component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>

      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        <Grid container>
          {options.map((option) => (
            <Grid item xs={6}>
              <FormControlLabel
                value={option.value}
                key={option.value}
                control={<Radio />}
                label={option.label}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
