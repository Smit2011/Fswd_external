import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Avatar,
  Container
} from '@mui/material';
import { AccountCircle, Event as EventIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  return (
    <Box sx={{
      background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
      py: 2,
      px: 0,
      boxShadow: '0 4px 24px 0 rgba(24,90,157,0.10)',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      mb: 4
    }}>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{
          borderRadius: 6,
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 2px 12px 0 rgba(24,90,157,0.08)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44, mr: 1 }}>
              <EventIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 900,
                letterSpacing: 2,
                textDecoration: 'none',
                color: 'primary.dark',
                textShadow: '0 2px 8px rgba(67,206,162,0.12)',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.2s',
                '&:hover': { color: 'secondary.main' }
              }}
            >
              College Events
            </Typography>
          </Box>

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/events/create"
                sx={{
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 3,
                  boxShadow: 2,
                  textTransform: 'none',
                  fontSize: 16
                }}
              >
                Create Event
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ ml: 1 }}
              >
                <AccountCircle sx={{ fontSize: 36, color: 'primary.dark' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{ sx: { background: '#fff', color: '#222' } }}
              >
                <MenuItem disabled sx={{ color: '#888' }}>
                  {user.name}
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: '#222' }}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/login"
                sx={{ fontWeight: 700, borderRadius: 3, px: 3, textTransform: 'none', fontSize: 16 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/register"
                sx={{ fontWeight: 700, borderRadius: 3, px: 3, textTransform: 'none', fontSize: 16 }}
              >
                Register
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Navbar; 