import { AppProps } from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, CssBaseline } from '@mui/material';
import HideAppBar from '../components/HideAppBar';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {

  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const googleAnalyticsTag = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTag}`}
      />
      <Script strategy="lazyOnload">
        {
          `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${googleAnalyticsTag}');
          `
        }
      </Script>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HideAppBar />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  )
}
