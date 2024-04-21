'use client'
import React from "react";
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Login.module.css';

export default function Login() {
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
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button type="submit" className={styles.signInButton}>Sign In</button>
        </form>

        <p className={styles.signUpLink}>
          Don't have an account?{' '}
          <Link href="/signup">
            Sign Up
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        This is your login page footer.
      </footer>
    </div>
  );
}
