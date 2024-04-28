"use client"
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/Login.module.css';
import {useRouter} from 'next/navigation'
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://kyioaeboxgtgzbtypztn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5aW9hZWJveGd0Z3pidHlwenRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwOTgwNTQsImV4cCI6MjAyOTY3NDA1NH0.0KmR9sAOwZwinkPhFK1ecn7OSb7gi3XIM3ct6ikPrZA')
const Login = () => {
  const router = useRouter()
  const [Email,setEmail] = useState('')
  const [Pass,setPass]=useState('')
  const handleSignIn = async()=>{
    try {
      console.log("hi")
      console.log(Email)
      console.log(Pass)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: Email,
        password: Pass,
      });
      if (data.user) { 
        console.log(data)
        router.push('/home');
      }
    } catch (error) {
      console.error('Sign in error:', error.message);
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login to access your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Login to Your Account
        </h1>

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} value={Email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className={styles.input} value={Pass} onChange={(e)=>setPass(e.target.value)} />
          
            <button type="button" className={styles.signInButton} onClick={handleSignIn}>Sign In</button>
          
        </form>

        <p className={styles.signUpLink}>
          Don't have an account?{' '}
          <Link href="/signup">
            Sign Up
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        EH
      </footer>
    </div>
  );
};

export default Login;
