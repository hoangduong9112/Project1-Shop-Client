import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/formField/InputField';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UserCredentials } from 'types/userCredentials';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {},
  paperStyle: {
    padding: 20,
    minHeight: '70vh',
    maxWidth: 280,
    margin: '20px auto',
  },
}));

const schema = yup
  .object({
    userName: yup.string().required('Please enter name.'),
    password: yup
      .string()
      .min(3, 'Password must have at least 3 characters')
      .required('Please enter password.'),
  })
  .required();

export function Login() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);

  const initialValue: UserCredentials = {
    userName: '',
    password: '',
  };

  const handleSubmitForm = (formValue: UserCredentials) => {
    dispatch(authActions.login(formValue));
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserCredentials>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  return (
    <Box>
      <Paper elevation={10} className={classes.paperStyle}>
        <Typography align="center" variant="h3">
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputField name="userName" control={control} label="User Name" />
          <InputField name="password" control={control} label="Password" type="password" />
          {error.errorMessage && <Alert severity="error">{error.errorMessage}</Alert>}
          <Box mt={3} textAlign="center">
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting && <CircularProgress size={16} color="secondary" />}&nbsp;Log In
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
