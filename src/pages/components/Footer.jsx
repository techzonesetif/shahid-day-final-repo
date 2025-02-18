import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import style from '../home/page.module.css';
import PropTypes from 'prop-types';

const MemoizedFooterLink = memo(function FooterLink({ to, children, isExternal = false }) {
  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={style.content}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={style.content}>
      {children}
    </Link>
  );
});
MemoizedFooterLink.propTypes = {
  to:PropTypes.any, children: PropTypes.any, isExternal: PropTypes.any, 
};
const FooterSection = memo(function FooterSection({ title, links }) {
  return (
    <ul>
      <li className={style.header}>{title}</li>
      {links.map((link) => (
        <li key={link.text}>
          <MemoizedFooterLink to={link.to} isExternal={link.isExternal}>
            {link.text}
          </MemoizedFooterLink>
        </li>
      ))}
    </ul>
  );
});
FooterSection.propTypes = {
  title:PropTypes.any, links: PropTypes.any, 
  };
function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  
  const footerLinks = useMemo(() => ({
    pages: [
      { to: '/article', text: 'Articles' },
      { to: '#events-section', text: 'Events' },
      { to: '#martyr-section', text: 'Martyrs' },
      { to: '#quote-section', text: 'Quotes' }
    ],
    social: [
      { to: 'https://www.instagram.com/techzone._.club', text: 'Instagram', isExternal: true },
      { to: 'https://www.facebook.com/people/TechZone-club/', text: 'Facebook', isExternal: true },
      { to: 'https://discord.com/invite/zwmjCPDDzN', text: 'Discord', isExternal: true }
    ],
    legal: [
      { to: '/terms', text: 'Terms and conditions' },
      { to: '/privacy', text: 'Privacy policy' },
      { to: '/contact', text: 'Contact' }
    ]
  }), []);

  return (
    <footer>
      <div className={style["footer-top"]}>
        <div className={style["footer-left"]}>
          <Link to="/" className={style["logo-footer"]}>
            Algerian History
          </Link>
          <div className={style["footer-address"]}>
            <p>University Farhat Abbas 1, Setif</p>
            <p>Faculty of sciences</p>
            <div className={style["fac-links"]}>
              <FontAwesomeIcon icon={faFacebook} />
              <MemoizedFooterLink to="https://facebook.com/yourpage" isExternal>
                Visit our page
              </MemoizedFooterLink>
            </div>
            <div className={style["fac-links"]}>
              <FontAwesomeIcon icon={faEnvelope} />
              <MemoizedFooterLink to="mailto:contact@example.com">
                Check our email
              </MemoizedFooterLink>
            </div>
          </div>
        </div>
        <div className={style["footer-right"]}>
          <FooterSection title="Pages" links={footerLinks.pages} />
          <FooterSection title="Follow us" links={footerLinks.social} />
          <FooterSection title="Legal" links={footerLinks.legal} />
        </div>
      </div>
      <hr className={style["footer-divider"]} />
      <p className={style["rights"]}>
        ©{currentYear}{' '}
        <MemoizedFooterLink to="https://linktr.ee/techzone._.club" isExternal className={style.club}>
          TechZone
        </MemoizedFooterLink>
        , All Rights Reserved.
      </p>
    </footer>
  );
}

export default memo(Footer);