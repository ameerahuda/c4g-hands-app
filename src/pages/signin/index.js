import Head from 'next/head';
import styles from '@/styles/SignIn.module.css';
import Image from 'next/image';

export default function Signin() {
  return (
    <>
      <Head>
        <title>HandS</title>
        <meta name="description" content="HandS Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.signin}></div>
        <Image
            src="/images/under_construction.png"
            alt="Page in Progress"
            width={150}
            height={150}
            priority
        />
        <p>Page in Progress</p>
      </main>
    </>
  )
}
