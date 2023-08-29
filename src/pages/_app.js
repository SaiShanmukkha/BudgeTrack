import '@/styles/globals.css'
import NavBar from '../components/navbar.jsx';
import FooBar from '@/src/components/FooBar';
import Notify from "../components/Notify"
import { SessionProvider, useSession, signIn } from "next-auth/react"
import common from "../../styles/Common.module.css"
import Loader from '../components/Loader.jsx';

function MyApp({ Component, pageProps: {session, ...pageProps} }) { 
  return (
    <SessionProvider session={session}>
      <NavBar />
      <Notify />
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth> ):
        <Component {...pageProps} />
      }
      <FooBar />
    </SessionProvider>
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
