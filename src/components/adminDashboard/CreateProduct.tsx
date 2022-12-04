import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/formField/InputField';
import { Product } from 'types/product';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { adminActions } from '../../features/admin/adminSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  input: {
    display: 'none',
  },

  paperStyle: {
    padding: 20,
    margin: '20px auto',
  },
}));

export function CreateProduct() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isCreating = useAppSelector((state) => state.admin.isCreating);

  const initialValue: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    image: '',
  };

  const handleSubmitForm = (formValue: Product) => {
    dispatch(adminActions.createNewProduct(formValue));
  };

  const schema = yup
    .object({
      name: yup.string().required('Please enter name.'),
      description: yup.string().required('Please enter description.'),
      price: yup
        .number()
        .required('Please enter a number.')
        .min(1000, 'Price must be at least 1000 VND'),
      image: yup.string().required('Please enter image URL.'),
    })
    .required();

  const { control, handleSubmit } = useForm<Product>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  return (
    <Box>
      <Paper elevation={10} className={classes.paperStyle}>
        <Typography align="center" variant="h3">
          Create New Product
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputField name="name" control={control} label="Name" />
          <InputField name="description" control={control} label="Description" />
          <InputField name="price" control={control} label="Price" type="number" />
          <InputField name="image" control={control} label="Image" />

          <Box mt={3} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              {isCreating && <CircularProgress size={16} color="secondary" />}&nbsp;Create
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
