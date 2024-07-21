import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, InputBase, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip } from '@mui/material';
import { Search as SearchIcon, AccountCircle, PersonAdd, Settings, Logout } from '@mui/icons-material';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <a>Mi Logo</a>
            </Link>
          </Typography>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <InputBase
              placeholder="Buscar Cotizaciones, Títulos o Empresas"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: 'inherit',
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginRight: '1rem'
              }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
          <Tooltip title="Account settings">
            <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>{session?.user?.name?.charAt(0) || <AccountCircle />}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Link href="/mi-cuenta" passHref>
            <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer', marginRight: '1rem' }}>
              Mi Cuenta
            </Typography>
          </Link>
          <Link href="/portafolio" passHref>
            <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer', marginRight: '1rem' }}>
              Portafolio
            </Typography>
          </Link>
          <Link href="/operar" passHref>
            <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer', marginRight: '1rem' }}>
              Operar
            </Typography>
          </Link>
          <Link href="/cotizaciones" passHref>
            <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer', marginRight: '1rem' }}>
              Cotizaciones
            </Typography>
          </Link>
          <Link href="/herramientas" passHref>
            <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer', marginRight: '1rem' }}>
              Herramientas
            </Typography>
          </Link>
          <Link href="/estrategias-de-inversion" passHref>
            <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer', marginRight: '1rem' }}>
              Estrategias de Inversión
            </Typography>
          </Link>
          <Link href="/iol-academy" passHref>
            <Typography variant="body1" color="inherit" sx={{ cursor: 'pointer' }}>
              IOL Academy
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
