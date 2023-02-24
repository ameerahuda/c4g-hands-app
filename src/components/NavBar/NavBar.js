import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/NavBar.module.css';

export default function NavBar() {
    const { pathname } = useRouter();
    const [active, setActive] = useState(pathname);
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    return (
        <header className={styles.navbar}>
            <Link className={styles.logoLink} href="/" onClick={() => {setActive('/'); setHamburgerMenu(false)}}>
                <Image
                    src="/icons/icon192.png"
                    alt="United Way Logo"
                    width={70}
                    height={70}
                    priority
                />
                <p>Housing and Savings Dashboard</p>
            </Link>
            <ul className={`${styles.navMenu} ${hamburgerMenu && styles.hamburgerMenuActive}`}>
                <li className={`${styles.navItem} ${active === '/' && styles.active}`}>
                    <Link className={styles.link} href="/" onClick={() => {setActive('/'); setHamburgerMenu(false)}}>Home</Link>
                </li>
                <li className={`${styles.navItem} ${active === '/about' && styles.active}`}>
                    <Link className={styles.link} href="/about" onClick={() => {setActive('/about'); setHamburgerMenu(false)}}>About</Link>
                </li>
                <li className={`${styles.navItem} ${active === '/signin' && styles.active}`}>
                    <Link className={styles.link} href="/signin" onClick={() => {setActive('/signin'); setHamburgerMenu(false)}}>Sign in</Link>
                </li>
            </ul>
            <div className={`${styles.hamburger} ${hamburgerMenu && styles.hamburgerMenuActive}`} onClick={() => setHamburgerMenu(!hamburgerMenu)}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
        </header>
    )
}