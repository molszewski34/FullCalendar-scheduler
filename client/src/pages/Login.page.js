import { Button, TextField } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../contexts/user.context';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (formData) => {
    try {
      const user = await emailPasswordLogin(formData.email, formData.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      if (error.statusCode === 401) {
        alert('Invalid username/password. Try again!');
      } else {
        alert(error);
      }
    }
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace('?redirectTo=', '');
    navigate(redirectTo ? redirectTo : '/');
  };

  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: 'auto',
      }}
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <h1>Login</h1>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: 'Email is required' }}
        render={({ field }) => (
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...field}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: 'Password is required',
          maxLength: {
            value: 20,
            message: 'Password should not exceed 20 characters',
          },
        }}
        render={({ field }) => (
          <TextField
            label="Hasło"
            type="password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...field}
            style={{ marginBottom: '1rem' }}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Zaloguj
      </Button>
    </form>
  );
};

export default Login;
