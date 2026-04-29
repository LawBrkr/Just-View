import NavbarClient from "./NavbarClient";
import styles from "../page.module.css";
import navStyles from "./Navbar.module.css";
import type esMessages from "../../messages/es.json";

type NavDict = (typeof esMessages)["nav"];

interface NavbarShellProps {
  dict: NavDict;
  lang: string;
}

export default function NavbarShell({ dict, lang }: NavbarShellProps) {
  return (
    // Initial state = hero (transparent, white text). NavbarClient syncs
    // dynamic classes after hydration via getElementById.
    <nav id="main-nav" className={`${styles.nav} ${navStyles.navHero}`}>
      <div className={`${styles.navInner} container`}>
        {/* Logo in SSR HTML — browser can paint this as LCP immediately */}
        <a href="#hero" id="nav-logo" className={`${styles.logo} ${navStyles.logo}`}>
          SIGNALIA
        </a>
        <NavbarClient dict={dict} lang={lang} />
      </div>
    </nav>
  );
}
