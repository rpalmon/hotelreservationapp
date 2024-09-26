"use client"; // This is a client component 👈🏽
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';

const pages = [
    { name: 'Home', href: '/' },

];
const drawerWidth = 240;
const ResponsiveAppBar = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigation = (page) => {
        window.location.href = page.href;
    };

    const setLocation = (location) => {
        window.location.href = location;
    }

    return (
        <React.Fragment>
            <AppBar position="sticky"
            style={{
                //remove the white border around the appbar
                
            }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            size="large"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleToggleDrawer}
                            color="inherit"
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.01rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                justifyContent: 'center',
                            }}
                        >
                           Hotel Reservation
                        </Typography>
                        {/* Desktop Navigation Buttons */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => handleNavigation(page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* Responsive Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleToggleDrawer}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}                
            >
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {pages.map((page) => (
                        <MenuItem
                            key={page.name}
                            onClick={() => {
                                handleNavigation(page);
                                handleToggleDrawer();
                            }}
                        >
                            {page.name}
                        </MenuItem>
                    ))}


                </Box>
            </Drawer>
        </React.Fragment>
    );
};

export default ResponsiveAppBar;