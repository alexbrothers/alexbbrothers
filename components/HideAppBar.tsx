import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Box, Container, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from "avataaars";

interface PageLink {
  name: string,
  link: string,
}

interface Props {
  children: React.ReactElement;
}

const pages: PageLink[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact",
    link: "/contact",
  }
]

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="fixed" component="header">
          <Container>
            <Toolbar sx={{
              display: "flex",
              justifyContent: {
                xs: "space-between",
                md: "flex-end",
              },
            }}>
              <Box component="nav" sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                justifyContent: "center",
                alignItems: "center",
                columnGap: "50px",
                "a": {
                  color: "white",
                  textDecoration: "none",
                },
                "a:hover": {
                  textDecoration: "underline",
                }
              }}>
                {pages.map(page => (
                  <Link key={page.name} href={page.link}>
                    <a>{page.name}</a>
                  </Link>
                ))}
              </Box>
              <Box sx={{
                display: {
                  xs: "flex",
                  md: "none",
                }
              }}>
                <Avatar
                  avatarStyle='Circle'
                  topType='ShortHairShortFlat'
                  accessoriesType='Prescription02'
                  hairColor='BrownDark'
                  facialHairType='BeardLight'
                  facialHairColor='BrownDark'
                  clotheType='Hoodie'
                  clotheColor='Blue03'
                  eyeType='Happy'
                  eyebrowType='Default'
                  mouthType='Smile'
                  skinColor='Light'
                  style={{width: '35px', height: '35px'}}
                />
              </Box>
              <Box sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <Box component="nav" sx={{
                    "a": {
                      color: "text.primary",
                      textDecoration: "none",
                    },
                    "a:hover": {
                      textDecoration: "underline",
                    }
                  }}>
                    {pages.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseNavMenu} sx={{
                        textAlign: "center"
                      }}>
                        <Link href={page.link}>
                          <a>{page.name}</a>
                        </Link>
                      </MenuItem>
                    ))}
                  </Box>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}