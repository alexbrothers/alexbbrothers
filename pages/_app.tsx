import { AppProps } from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline } from '@mui/material';
import HideAppBar from '../components/HideAppBar';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HideAppBar />
      <Container>
      <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  )
}
