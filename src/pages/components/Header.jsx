import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import style from '../home/page.module.css';
import PropTypes from 'prop-types';

// Memoized navigation items to prevent unnecessary re-renders
const NavItems = memo(({ handleNavigation, handleMenuBtn }) => {
  const navItems = useMemo(() => [
    { id: 'home', target: '#hero', label: 'Home' },
    { id: 'articles', path: '/article', label: 'Articles' },
    { id: 'events', target: '#events-section', label: 'Events' },
    { id: 'martyrs', target: '#martyrs-section', label: 'Martyrs' },
    { id: 'quotes', target: '#quote-section', label: 'Quotes' }
  ], []);
  NavItems.displayName = 'NavItems';
  NavItems.propTypes = {
    handleNavigation:PropTypes.any, handleMenuBtn: PropTypes.any, 
  };
  return (
    <>
      {navItems.map((item) => (
        <li key={item.id} className={style["nav-item"]}>
          {item.path ? (
            <Link to={item.path} onClick={handleMenuBtn}>
              <h2>{item.label}</h2>
            </Link>
          ) : (
            <button
              onClick={() => {
                handleNavigation(item.target);
                handleMenuBtn();
              }}
              aria-label={`Scroll to ${item.label}`}
            >
              <h2>{item.label}</h2>
            </button>
          )}
        </li>
      ))}
    </>
  );
});

function Header() {
  const [menuSvg, setMenuSvg] = useState(faBars);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Memoized menu toggle handler
  const handleMenuBtn = useCallback(() => {
    setMenuSvg(prev => (prev === faBars ? faXmark : faBars));
    setIsActive(prev => !prev);
  }, []);

  // Optimized navigation handler with proper cleanup
  const handleNavigation = useCallback((targetSection) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }

    const scrollToSection = () => {
      const section = targetSection === '#hero' 
        ? document.documentElement 
        : document.querySelector(targetSection);
      
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const timer = setTimeout(scrollToSection, 50);
    return () => clearTimeout(timer);
  }, [navigate, location.pathname]);

  // Close menu on route change
  useEffect(() => {
    setIsActive(false);
    setMenuSvg(faBars);
  }, [location.pathname]);

  return (
    <header aria-label="Main navigation">
      <div className={style.navbar}>
        <div className={style.container}>
          <div className={style["site-logo"]}>
            <button 
              aria-label="Scroll to top"
              onClick={() => handleNavigation('#hero')}
            >
              <p className={style.logo}>Algerian History</p>
            </button>
          </div>
          <button
            className={style["menu-toggle"]}
            aria-label="Toggle navigation menu"
            onClick={handleMenuBtn}
            aria-expanded={isActive}
          >
            <FontAwesomeIcon 
              icon={menuSvg} 
              key={menuSvg.iconName}
              aria-hidden="true"
            />
          </button>
        </div>
        <nav aria-label="Primary navigation">
          <ul 
            className={`${style["nav-list"]} ${isActive ? style.active : ""}`}
            role="menubar"
          >
            <NavItems 
              handleNavigation={handleNavigation}
              handleMenuBtn={handleMenuBtn}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);