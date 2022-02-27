import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Box, Container } from '@mui/material';
import Link from 'next/link';

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
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar position="fixed">
          <Container>
            <Toolbar sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}>
              <Box sx={{
                display: "flex",
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
                  <Link href={page.link}>
                    <a>{page.name}</a>
                  </Link>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}