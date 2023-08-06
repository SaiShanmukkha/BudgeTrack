import styles from "../../../../styles/Login.module.css"
import common from "../../../../styles/Common.module.css"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import Head from "next/head"
import { useState, useEffect } from "react"

export default function Login(){
    const { data: session, status} = useSession();
    const router = useRouter();
    const [siForm, setSiForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/home",)
            toast.info("Already Logged in. Redirecting to /home")
        }
    });

    const handleSignIn = async (e) => {
        e.preventDefault();
        signIn("credentials", {...siForm, redirect: false}).then((callback) => {
            if (callback?.error) {
                toast.error(callback.error)
            }

            if(callback?.ok && !callback?.error) {
                toast.success('Logged in successfully!')
            }
        } )
    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        signIn("google")
    }

    const handleGithubSignIn = (e) => {
        e.preventDefault();
        signIn("github")
    }

    return (
        <>
            <Head>
                <title>BudgeTrack | Login</title>
                <meta name="description" content="All Expenses Data at One Place" />
            </Head>
            <main className={`${common.container}`}>
                <div className={styles.mainContent}>
                    <div className={styles.header}>
                        <h1 className={styles.welcomeHeader}>BudgeTrack Login Page!</h1>
                        <p className={styles.paraContent}>Sign in to your account to effortlessly manage your finances and keep your expenses in check. Our intuitive and user-friendly platform helps you stay on top of your budget, track your spending, and achieve your financial goals with ease.</p>
                    </div>                

                    <div className={styles.signInForm}>
                        <div className={styles.signInFormHeader}>
                            <h2>Login with Email & Password</h2>
                        </div>
                        <form onSubmit={handleSignIn}>
                            <div className={`${styles.formGroup}`}>
                                <label className={styles.formLabel}>Email ID</label>
                                <input value={siForm.email} required onChange={(e)=>setSiForm({...siForm, email:e.target.value})} type="email" className={`${styles.inputField}`} />
                            </div>
                            <div className={`${styles.formGroup}`}>
                                <label className={styles.formLabel}>Password</label>
                                <input value={siForm.password} required onChange={(e)=>setSiForm({...siForm, password:e.target.value})} type="password" className={`${styles.inputField}`} />                            
                            </div>
                            <button type="submit" className={styles.submitBtn} >Login</button>
                        </form>

                        <hr />

                        <div className={styles.socialAuth}>
                            <p>-------------- or Login using below options ---------------</p>
                            <button className={`${styles.socialBtn} ${styles.googleBtn}`} onClick={handleGoogleSignIn} >Google</button>
                            <button className={`${styles.socialBtn} ${styles.githubBtn}`} onClick={handleGithubSignIn} >Github</button>
                        </div>
                    </div>


                    <div>
                        <p className={styles.signupLink}>Don&apos;t have an account? <Link className={styles.linktoSignUp} href={"/auth/signup"}>Sign Up</Link></p>
                    </div>
                </div>
            </main>
        </>
    );
}

