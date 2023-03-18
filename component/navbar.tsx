import Link from "next/link";
import styles from "@/styles/navbar.module.css";
// import localFont from 'next/font/local';

// const myFont  = localFont({src:'../public/myfont'});

const navbar = () => {
  return (
    <>
      <div className={styles.navBar}>
        <Link className={styles.title} href="/about">
          Legend Blogs
        </Link>
        <div className={styles.options}>
          <Link className={`${styles.navBtnHome} ${styles.navBtn}`} href="/">
            Home
          </Link>
          <Link className={`${styles.navBtnRandom} ${styles.navBtn}`} href="/">
            Random
          </Link>
          <Link
            className={`${styles.navBtnAbout} ${styles.navBtn}`}
            href="/about"
          >
            About
          </Link>
        </div>
        <div className={styles.search}>
          <div className={`${styles.rec1} ${styles.rec2}`}>
            <div>What's on your Mind ?</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default navbar;
