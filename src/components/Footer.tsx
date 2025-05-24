import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Portfolio</h3>
            <p>Modern ve profesyonel portföy sitesi</p>
          </div>
          <div className="footer-section">
            <h3>Hızlı Erişim</h3>
            <ul>
              <li><a href="/">Ana Sayfa</a></li>
              <li><a href="/about">Hakkımda</a></li>
              <li><a href="/projects">Projeler</a></li>
              <li><a href="/contact">İletişim</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>İletişim</h3>
            <p>Email: info@example.com</p>
            <p>Telefon: +90 123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Portfolio. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
