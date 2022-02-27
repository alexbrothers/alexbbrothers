import '../styles/global.css'
import { AppProps } from 'next/app'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/material';
import HideAppBar from '../components/HideAppBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HideAppBar />
      <Container maxWidth="xl">
      <Component {...pageProps} />
      </Container>
    </>
  )
}
