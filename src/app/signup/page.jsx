'use client' 
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/Signup.module.css';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabase.js'; 
import { useToast } from '@chakra-ui/react';
;

export default function SignUp() {
  
  const router = useRouter();
  const toast = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      toast({
        title: `check email for verification`,
        status: "info",
        isClosable: true,
        position: "top",
      });
    console.log(user)
      if (error) {
        throw error;
      }
      //update user profile data after sign-up
   //   await supabase.from('profiles').update({ full_name: fullName }).eq('id', user.id);
      router.push('/login');
    } catch (error) {
      console.error('Sign up error:', error.message);
      toast({
        title: 'Signup Error',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
    });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up Page</title>
        <meta name="description" content="Create a new account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create a New Account
        </h1>

        <form className={styles.form} onSubmit={handleSignUp}>
          <input type="text" placeholder="Full Name" className={styles.input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder="Email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className={styles.signUpButton}>Sign Up</button>
        </form>

        <p className={styles.loginLink}>
          Already have an account?{' '}
          <Link href="/login">
            Login
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        EH
      </footer>
    </div>
  );
}
