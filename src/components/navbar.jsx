import styles from '@/styles/NavBar.module.css'
import common from '@/styles/Common.module.css'
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data:session, status, update} = useSession();
  return (  
      <div className={common.container}>
        <div className={styles.navBar}>
          <Link href="/"><h1 className={styles.title}><Image alt='Logo' src="/favicon.ico" width={"32"} height={"32"} style={{marginRight: "10px"}} />BudgeTrack</h1></Link>
          <div className={styles.menu}>
            <ul>
              {
                session?
                  <>
                    <li>
                      <Link href="/home" className={{cursor: "pointer"}}>Home</Link>
                    </li> 
                    <li>
                      <Link href="/overview" className={{cursor: "pointer"}}>Overview</Link>
                    </li>
                    <li>
                      <button className={styles.signOutBtn} onClick={() => signOut()}>Sign Out</button>
                    </li>
                  </> :
                  <>
                    <li>
                      <Link href="/auth/login" className={{cursor: "pointer"}}>Login</Link>
                    </li>
                    <li>
                      <button className={styles.signUpBtn}><Link href="/auth/signup">Sign Up</Link></button>
                    </li>
                  </>
              }
            </ul>
          </div>
        </div>
      </div>
  )
}
