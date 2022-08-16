import { Box, Button, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';
import {
  SigninRequest, SignupRequest,
} from '../../redux/api/api';

function SignUpForm(props: {
  form: SigninRequest & SignupRequest,
  inputHandler: ChangeEventHandler<HTMLInputElement>,
  signUpHandler: () => Promise<void>
}) {
  const { form, inputHandler, signUpHandler } = props;
  return (
    <Box>
      <TextField
        sx={{ width: '100%' }}
        variant="standard"
        label="Имя"
        margin="normal"
        type="text"
        name="username"
        value={form.username}
        onChange={inputHandler}
        required
      />
      <TextField
        sx={{ width: '100%' }}
        variant="standard"
        label="Email"
        margin="normal"
        type="email"
        name="email"
        value={form.email}
        onChange={inputHandler}
        required
      />
      <TextField
        sx={{ width: '100%' }}
        variant="standard"
        label="Пароль"
        margin="normal"
        type="password"
        name="password"
        value={form.password}
        onChange={inputHandler}
        required
      />
      <Button
        sx={{ alignSelf: 'self-start', marginTop: '0.5rem' }}
        variant="contained"
        onClick={() => {
          signUpHandler();
        }}
      >
        Зарегестрироваться
      </Button>
    </Box>
  );
}

export default SignUpForm;
