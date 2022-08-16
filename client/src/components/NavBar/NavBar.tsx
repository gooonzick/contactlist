import {
  AppBar, Button, Container, Toolbar, Typography,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';

const resetNavLinkStyle = { textDecoration: 'none' };

function NavBar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(signOut());
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'currentcolor' }}>
            <Typography
              variant="h6"
              noWrap
            >
              LOGO
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/mycontacts" style={resetNavLinkStyle}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Мои контакты
              </Button>
            </NavLink>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {user?.name ? (
              <NavLink to="/" style={resetNavLinkStyle}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={logOutHandler}>
                  Выйти
                </Button>
              </NavLink>
            )
              : (
                <NavLink to="/auth" style={resetNavLinkStyle}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    Авторизация
                  </Button>
                </NavLink>
              )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
