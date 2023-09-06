import '@/styles/globals.css'
import NavBar from '../components/navbar.jsx';
import FooBar from '@/src/components/FooBar';
import Notify from "../components/Notify";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import common from "../../styles/Common.module.css";
import Loader from '../components/Loader.jsx';
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps: {session, ...pageProps} }) { 
  return (
    <ThemeProvider enableSystem={false}>
      <SessionProvider session={session}>
        <SWRConfig value={{
            revalidateIfStale: false,
            revalidateOnFocus: false,
          }}>
          <NavBar />
          <Notify />
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth> ):
            <Component {...pageProps} />
          }
          <FooBar />
        </SWRConfig>
      </SessionProvider>
    </ThemeProvider>
  );
}

function Auth({ children }) {
  const { session, status } = useSession({ required: true })
  if (status === "loading") {
    return (
      <main className={common.container}>
        <Loader />
      </main>
    );
  } 
  return children;
}

export default MyApp;
