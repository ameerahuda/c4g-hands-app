import Head from 'next/head';
import styles from '@/styles/About.module.css';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Head>
        <title>HandS</title>
        <meta name="description" content="HandS Dashboard" />
      </Head>
      <main className={styles.main}>
        <div className={styles.about}></div>
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
