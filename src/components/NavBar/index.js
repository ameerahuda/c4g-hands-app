import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/NavBar.module.css';
import { useStateContext } from '@/context/context';

export default function NavBar() {
    const { pathname } = useRouter();
    const [active, setActive] = useState(pathname);
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    const {
        isAuthenticated,
        user,
        logout
    } = useStateContext();

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
                {!isAuthenticated &&
                    <li className={`${styles.navItem} ${active === '/signin' && styles.active}`}>
                        <Link className={styles.link} href="/signin" onClick={() => {setActive('/signin'); setHamburgerMenu(false)}}>Sign in</Link>
                    </li>
                }
                {isAuthenticated &&
                    <>
                        <li className={`${styles.navItem} ${active === '/profile' && styles.active}`}>
                            <Link className={styles.link} href="/profile" onClick={() => {setActive('/profile'); setHamburgerMenu(false)}}>My Profile</Link>
                        </li>
                        {user?.user_type === 'UnitedWay Staff' &&
                            <li className={`${styles.navItem} ${active === '/admin/partners' && styles.active}`}>
                                <Link className={styles.link} href="/admin/partners" onClick={() => {setActive('/admin/partners'); setHamburgerMenu(false)}}>View Partners</Link>
                            </li>
                        }
                        <li className={`${styles.navItem}`}>
                            <Link className={styles.link} href="/signin" onClick={() => {logout(); setActive('/signin'); setHamburgerMenu(false)}}>Sign out</Link>
                        </li>
                    </>
                }
            </ul>
            <div className={`${styles.hamburger} ${hamburgerMenu && styles.hamburgerMenuActive}`} onClick={() => setHamburgerMenu(!hamburgerMenu)}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
        </header>
    )
}