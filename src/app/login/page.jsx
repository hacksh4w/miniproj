"use client"
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/Login.module.css';
import { useRouter } from 'next/navigation'
import { supabase } from '../../utils/supabase.js';
// import { login, signup } from './actions'  (this is from server le client, so use client eduthu kalayanam) 
// all the functions that are in the actions file, so ivide, button de avide
//      <button formAction={login}>Log in</button>
//      <button formAction={signup}>Sign up</button>
// ingane cheytha mathi 
import { useProfile } from '../../contexts/ProfileContext';
import { useToast } from '@chakra-ui/react';

export default function Login() {
  const router = useRouter()
  const toast = useToast({});
  const [email,setEmail] = useState('')
  const [pass,setPass]=useState('')
  const [UserID, setUSerID] = useState('')
  const { setProfileData } = useProfile();

  const handleSignIn = async()=>{
    try {
      console.log(email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      });
      if (error) throw error;

      if (data) {
          const { data: profileData, error: profileError } = await supabase
            .from('profile')
            .select('id, role')
            .eq('email', email)
            .single();
  
          if (profileError) throw profileError;
  
          if (profileData) {
            setProfileData(profileData);
            //console.log(profileData);
            //console.log(data.id);
            router.push('/home');
          }
      };
    } catch (error) {
      console.error('Sign in error:', error.message);
      toast({
        title: 'Signin Error',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
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
          <input type="email" placeholder="Email" className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" className={styles.input} value={pass} onChange={(e)=>setPass(e.target.value)} />
          
            <button type="button" className={styles.signInButton} onClick={handleSignIn}>Sign In</button>
          
        </form>

        <p className={styles.signUpLink}>
          Don't have an account?{' '}
          <Link href="/signup">
            Sign Up
          </Link>
        </p>
      </main>
    </div>
  );
};
