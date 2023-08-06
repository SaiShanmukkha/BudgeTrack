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

{
  /*
const [session, loading] = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return children
  }
  
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
  */
}

export default MyApp;
