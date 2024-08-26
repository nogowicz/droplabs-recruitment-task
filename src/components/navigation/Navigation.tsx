import { NavLink } from 'react-router-dom';
import styles from './navigation.module.scss';
export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">
        <img src="/vite.svg" alt="logo" />
      </NavLink>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__link} ${styles['nav__link--active']}`
                : styles.nav__link
            }
          >
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? `${styles.nav__link} ${styles['nav__link--active']}`
                : styles.nav__link
            }
          >
            Products
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
