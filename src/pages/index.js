import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Home() {
  	return (
		<>
			<Head>
				<title>HandS</title>
				<meta name="description" content="HandS Dashboard" />
			</Head>
			<main className={styles.main}>
				<div className={styles.bgImgContainer}><img src="/images/united_way_staff.png" className={styles.bgImg}></img></div>
				<div className={styles.title}>
					Housing and Savings Dashboard
				</div>
				<div className={styles.info}>
					<span className={styles.infoSection}>
						<p className={styles.infoTitle}>What We Do</p>
						<p className={styles.infoSubtitle}>United Way of Greater Atlanta connects teams of people, companies, nonprofit partners, government agencies, and community groups to work together to identify and break down barriers within the community through program development, strategic investments and community service.</p>
						<img src="/images/community.png" className={styles.infoImg}></img>
					</span>
					<span className={styles.infoSection}>
						<p className={styles.infoTitle}>Our Mission</p>
						<p className={styles.infoSubtitle}>To bring together people and resources to drive sustainable and equitable improvements in the well-being of half a million lives across Greater Atlanta.</p>
						<img src="/images/improvements.png" className={styles.infoImg}></img>
					</span>
					<span className={styles.infoSection}>
						<p className={styles.infoTitle}>Join the Movement</p>
						<p className={styles.infoSubtitle}>Change sparks when people of different strengths come together for a united cause. To transform more lives of children and families across Greater Atlanta, we provide a platform to give, advocate and volunteer — united.</p>
						<img src="/images/hands_together.png" className={styles.infoImg}></img>
					</span>
				</div>
			</main>
		</>
  	)
}
