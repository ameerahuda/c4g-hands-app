import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Image from 'next/image';

export default function Home() {
  	return (
		<>
			<Head>
				<title>HandS</title>
				<meta name="description" content="HandS Dashboard" />
			</Head>
			<main className={styles.main}>
				<div className={styles.bgImgContainer}>
					<img src="/images/united_way_staff.png" height={100} width={100} className={styles.bgImg} alt="United Way Staff" />
				</div>
				<div className={styles.header}>
					<p className={styles.title}>Helping Families</p>
					<p className={styles.subtitle}>Communities thrive together</p>
				</div>
				<div className={styles.info}>
					<span className={styles.infoSection}>
						<p className={styles.infoTitle}>What We Do</p>
						<p className={styles.infoSubtitle}>United Way of Greater Atlanta connects teams of people, companies, nonprofit partners, government agencies, and community groups to work together to identify and break down barriers within the community through program development, strategic investments and community service.</p>
						<Image
							src="/images/community.png"
							alt="What We Do"
							width={100}
							height={100}
							priority
							className={styles.infoImg}
						/>
					</span>
					<span className={styles.infoSection}>
						<p className={styles.infoTitle}>Our Mission</p>
						<p className={styles.infoSubtitle}>To bring together people and resources to drive sustainable and equitable improvements in the well-being of half a million lives across Greater Atlanta.</p>
						<Image
							src="/images/improvements.png"
							alt="Our Mission"
							width={100}
							height={100}
							priority
							className={styles.infoImg}
						/>
					</span>
					<span className={styles.infoSection}>
						<p className={styles.infoTitle}>Join the Movement</p>
						<p className={styles.infoSubtitle}>Change sparks when people of different strengths come together for a united cause. To transform more lives of children and families across Greater Atlanta, we provide a platform to give, advocate and volunteer — united.</p>
						<Image
							src="/images/hands_together.png"
							alt="Join the Movement"
							width={100}
							height={100}
							priority
							className={styles.infoImg}
						/>
					</span>

						
				</div>
				<div className={styles.documentation}>
					<p className={styles.infoTitle}>User Manual</p>
					<span className={styles.documentationLinks}>
						<a
							href="/files/P3_HandS_UserDocumentation.pdf"
							alt="alt text"
							target="_blank"
							rel="noopener noreferrer"
						>P3_HandS_UserDocumentation.pdf</a>
						<a
							href="/files/P3_HandS_UserDocumentation.docx"
							alt="alt text"
							target="_blank"
							rel="noopener noreferrer"
						>P3_HandS_UserDocumentation.docx</a>
					</span>
				</div>
			</main>
		</>
  	)
}
