import { useState } from "react";
import { Box, Menu, IconButton, MenuItem, ListItemIcon, ListItemText, AppBar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import Toolbar from '@mui/material/Toolbar';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link } from 'react-router';

function NavMenu() {
    const [anchorMenu, setMenuOpen] = useState(null);
    const [anchorUserMenu, setUserMenuOpen] = useState(null);

    const menuOpen = (e) => { setMenuOpen(e.currentTarget); }
    const menuClose = () => { setMenuOpen(null); }

    const userMenuOpen = (e) => { setUserMenuOpen(e.currentTarget); }
    const userMenuClose = () => { setUserMenuOpen(null); }

    return (
        <Box>
            {/* päävalikko */}
            <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)}
                onClose={menuClose}>
                <MenuItem component={Link} to='/'>
                    <ListItemIcon><ShowChartIcon /></ListItemIcon>
                    <ListItemText primary='Front' />
                </MenuItem>
                <MenuItem component={Link} to='/add'>
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText primary='Add Workout' />
                </MenuItem>
                <MenuItem component={Link} to='/workouts'>
                    <ListItemIcon><ArticleOutlinedIcon /></ListItemIcon>
                    <ListItemText primary='Workouts' />
                </MenuItem>
            </Menu>

            {/* käyttäjävalikko */}
            <Menu anchorEl={anchorUserMenu} open={Boolean(anchorUserMenu)} onClose={userMenuClose}>
                <MenuItem onClick={userMenuClose}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Profile" />
                </MenuItem>
                <MenuItem onClick={userMenuClose}>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </MenuItem>
                <MenuItem onClick={userMenuClose}>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary="Info" />
                </MenuItem>
                <MenuItem onClick={userMenuClose}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Log Out" />
                </MenuItem>
            </Menu>

            {/* yläpalkki */}
            <AppBar position='static'>
                <Toolbar>
                    <IconButton onClick={menuOpen} color="inherit"><MenuIcon /></IconButton>
                    <Link to="/">
                        <Box
                            component="img"
                            src="pictures/STRONK_white.png"
                            alt="Logo"
                            sx={{ height: 40, ml: 1, mr: 1 }}
                        />
                    </Link>
                    <Typography variant='h5' sx={{ flexGrow: 1, textAlign: 'left' }}>STRONK</Typography>
                    <IconButton onClick={userMenuOpen} color='inherit'><AccountCircleIcon /></IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavMenu;