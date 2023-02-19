import Head from 'next/head';
import styles from '@/styles/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>HandS</title>
        <meta name="description" content="HandS Dashboard" />
      </Head>
      <main className={styles.main}>
        <div className={styles.about}></div>
        <img src="/images/under_construction.png" className={styles.img}></img>
        <p>Page in Progress</p>
      </main>
    </>
  )
}
