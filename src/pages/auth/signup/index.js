import styles from "../../../../styles/SignUp.module.css"
import common from "../../../../styles/Common.module.css"
import Link from "next/link"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SignUp(){
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        name: "",
        password:"",
        confirmPassword: ""
    });

    const registerUser = async (e)=>{
        e.preventDefault();
        if(data.password === data.confirmPassword){
            const response = await axios.post('/api/register',data);
            if(response.status == 200){
                setData({
                    email: "",
                    name: "",
                    password:"",
                    confirmPassword: ""
                })
                toast.success("User Registered successfully.");
                toast.info("Redreting to login page");
                setTimeout(()=>{
                    router.push("/auth/login");
                }, 2000);
            }else{
                toast.error("Failed to register due to error: " + response.data.message)
            }
        }else{
            toast.error("Passwords doesn't match.");
        }
    }

    return (
        <>
            <Head>
                <title>BudgeTrack | Sign Up</title>
                <meta name="description" content="All Expenses Data at One Place" />
            </Head>
            <main className={`${common.container}`}>
                <div className={styles.mainContent}>

                    <div className={styles.headText}>
                        <h1 className={styles.welcomeHeader}>BugeTrack SignUp Page!</h1>
                        <p className={styles.paraContent}>Take charge of your finances and embark on a journey to financial freedom with our powerful expense management platform. Sign up today to start tracking your expenses, setting budgets, and achieving your financial goals like never before!</p>  
                    </div>

                    <div className={styles.signUpFormContainer}>
                        <div className={styles.signUpFormHeader}>
                            <h2>Register using Email & Password</h2>
                        </div>

                        <div className={styles.signUpForm}>
                            <form onSubmit={registerUser}>
                                <div className={`${styles.formGroup}`}>
                                    <label className={styles.formLabel}>User Name</label>
                                    <input value={data.name} required onChange={(e)=>setData({...data, name:e.target.value})} type="text" name="user" className={`${styles.inputField}`} />
                                </div>
                                <div className={`${styles.formGroup}`}>
                                    <label className={styles.formLabel}>Email ID</label>
                                    <input value={data.email} required onChange={(e)=>setData({...data, email:e.target.value})} type="email" className={`${styles.inputField}`} />
                                </div>
                                <div className={`${styles.formGroup}`}>
                                    <label className={styles.formLabel}>Password</label>
                                    <input value={data.password} required onChange={(e)=>setData({...data, password:e.target.value})} type="password" className={`${styles.inputField}`} />                            
                                </div>
                                <div className={`${styles.formGroup}`}>
                                    <label className={styles.formLabel}>Confirm Password</label>
                                    <input value={data.confirmPassword} required onChange={(e)=>setData({...data, confirmPassword:e.target.value})} type="password" className={`${styles.inputField}`} />                            
                                </div>
                                <button type="submit" className={styles.submitBtn} >Register</button>
                            </form>
                        </div>

                        <hr />

                        <div className={styles.socialAuth}>
                            <p>-------------- or register using below options ---------------</p>
                            <button className={`${styles.socialBtn} ${styles.googleBtn}`} onclick={()=>{signIn("google")}} >Google</button>
                            <button className={`${styles.socialBtn} ${styles.githubBtn}`} onClick={()=>{signIn("github")}} >Github</button>
                        </div>

                    </div>
                    
                    <div>
                        <p className={styles.signupLink}>Already had an account? <Link className={styles.linktoSignIn} href={"/auth/login"}>Log In</Link></p>
                    </div>

                </div>
            </main>
        </>
    );
}