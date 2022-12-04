import { Box, Button, CircularProgress, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/formField/InputField';
import { Product } from 'types/product';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import { adminActions } from '../../features/admin/adminSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

export interface RouteParams {
  _id: string;
}

export function UpdateProduct(props: RouteComponentProps<RouteParams>) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isUpdating = useAppSelector((state) => state.admin.isUpdating);
  const productList = useAppSelector((state) => state.admin.productList);

  const _id = props.match.params._id;
  const edittedProduct = productList.find((product) => product._id === _id) || ({} as Product);

  const initialValue: Partial<Product> = {
    name: edittedProduct.name,
    description: edittedProduct.description,
    price: edittedProduct.price,
    image: edittedProduct.image,
  };

  const handleSubmitForm = (formValue: Product) => {
    dispatch(adminActions.updateProduct({ ...formValue, _id }));
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
          Update Product
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputField name="name" control={control} label="Name" />
          <InputField name="description" control={control} label="Description" />
          <InputField name="price" control={control} label="Price" type="number" />
          <InputField name="image" control={control} label="Image" />

          <Box mt={3} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              {isUpdating && <CircularProgress size={16} color="secondary" />}&nbsp;Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
