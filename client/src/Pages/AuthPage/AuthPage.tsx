import { Box, Tab, Tabs } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import {
  ChangeEvent, SyntheticEvent, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import TabPanel from '../../components/TabPanel/TabPanel';
import { CustomError } from '../../models/CustomError';
import {
  SigninRequest, SignupRequest, useSignInMutation, useSignUpMutation,
} from '../../redux/api/auth.api';

import { showError } from '../../redux/slices/errorSlice';
import { setCredentials } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';

const mainBoxSx = {
  width: '60vh',
  minHeight: '40vh',
  maxHeight: 'max-content',
  margin: '10vh auto',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.3)',
};

function AuthPage() {
  const dispatch = useDispatch();
  const userInState = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState < SignupRequest & SigninRequest >({
    email: '',
    password: '',
    username: '',
  });

  const [signIn, { error: signInError }] = useSignInMutation();
  const [signUp, { error: signUpError }] = useSignUpMutation();

  const signUpHandler = async ():Promise<void> => {
    try {
      const user = await signUp(formData).unwrap();
      dispatch(setCredentials(user));
      localStorage.setItem('user', JSON.stringify(user.user));
      sessionStorage.setItem('token', user.token);
      navigate('/mycontacts');
    } catch (error) {
      if (error instanceof Error) {
        dispatch(showError(error.message));
      }
    }
  };

  const signInHandler = async (): Promise<void> => {
    try {
      const user = await signIn(formData).unwrap();
      dispatch(setCredentials(user));
      localStorage.setItem('user', JSON.stringify(user.user));
      sessionStorage.setItem('token', user.token);
      navigate('/mycontacts');
    } catch (error) {
      if (error instanceof Error) {
        dispatch(showError(error.message));
      }
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData(
      (prev: SigninRequest & SignupRequest) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const tabChangeHandler = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (signInError) {
      dispatch(showError((signInError as CustomError).data.errorMessage));
    }
    if (signUpError) {
      dispatch(showError((signInError as CustomError).data.errorMessage));
    }
  }, [signInError, signUpError]);

  if (userInState && userInState.name) return <Navigate to="/myContacts" />;

  return (
    <>
      <Box sx={mainBoxSx}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={tabChangeHandler}>
            <Tab label="Вход" />
            <Tab label="Регистрация" />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <LogInForm form={formData} inputHandler={inputHandler} logInHandler={signInHandler} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SignUpForm form={formData} inputHandler={inputHandler} signUpHandler={signUpHandler} />
        </TabPanel>
      </Box>
      <ErrorModal />
    </>
  );
}

export default AuthPage;
