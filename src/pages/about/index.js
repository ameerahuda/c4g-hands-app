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
				<div className={styles.bgImgContainer}>
					<img src="/images/united_way_staff.png" height={100} width={100} className={styles.bgImg} alt="United Way Staff" />
				</div>
		<div className={styles.header}>
			<p className={styles.title}>Helping Families</p>
			<p className={styles.subtitle}>Communities thrive together</p>
		</div>
		<div className={styles.info}>
			<span className={styles.infoSection}>
      <br></br>
      <br></br>
      <br></br>
            
				<p className={styles.infoTitle}>About us</p>
				<p className={styles.infoSubtitle}>Our goal is to assist homeless families find housing and have an emergency savings. Using a direct cash transfer model we incentivize families to find housing and save funds.</p>
				<p className={styles.infoSubtitle}>Every month families get $500 to assist them in reaching the goals ( housing and saving). The database and portal will allow to track the progress, be the place where they interact and help them achieve goals. </p>
			    <p className={styles.infoSubtitle}>Portal should be able to provide options to the users/familial households to be able to track goals, see their progress toward graduation, provide updates on their spending amounts, upload receipts, and also be able to communicate with others in the same partner program. </p>
			    <p className={styles.infoSubtitle}>On the other hand, United Way and partner organizations should be able to perform admin related activities, manage household families, add partners, manage requirements per partner, generate reports etc. </p>
			</span>
		</div>
      </main>
    </>
  )
}
