import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Input } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/formField/InputField';
import { Product, ProductParams } from 'types/product';
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

  const [images, setImages] = React.useState([]);

  const onChange = (e: any) => {
    setImages(e.target.files);
  };

  const initialValue: Partial<ProductParams> = {
    name: '',
    description: '',
    price: 0,
  };

  const handleSubmitForm = (formValue: ProductParams) => {
    dispatch(
      adminActions.createNewProduct({
        ...formValue,
        image: images[0],
      })
    );
  };

  const schema = yup
    .object({
      name: yup.string().required('Please enter name.'),
      description: yup.string().required('Please enter description.'),
      price: yup
        .number()
        .required('Please enter a number.')
        .min(1000, 'Price must be at least 1000 VND'),
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
        <form>
          <InputField name="name" control={control} label="Name" />
          <InputField name="description" control={control} label="Description" />
          <InputField name="price" control={control} label="Price" type="number" />

          <Box>
            <Input type="file" name="image" onChange={onChange} />
          </Box>

          <Box mt={3} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleSubmitForm)}
            >
              {isCreating && <CircularProgress size={16} color="secondary" />}&nbsp;Create
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
