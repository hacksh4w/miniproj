import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/Signup.module.css';

export default function SignUp() {
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

        <form className={styles.form}>
          <input type="text" placeholder="Full Name" className={styles.input} />
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
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
