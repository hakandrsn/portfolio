import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  const [codeString, setCodeString] = useState('<dev/>');
  
  // Sayfa başlıklarını ve yollarını tanımlıyoruz
  const pages = [
    { path: '/', title: 'Ana Sayfa' },
    { path: '/projects', title: 'Projects' },
    { path: '/contact', title: 'İletişim' },
    { path: '/profile', title: 'Profil' }
  ];
  
  // Kod animasyonu için efekt
  useEffect(() => {
    const codeStrings = ['<dev/>', '<code/>', '<web/>', '{code}'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % codeStrings.length;
      setCodeString(codeStrings[index]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // En uzun başlığı bulalım
  const longestTitle = pages.reduce((longest, current) => 
    current.title.length > longest.length ? current.title : longest, '');
  
  // Şu anki aktif sayfayı buluyoruz
  const activePage = pages.find(page => page.path === location.pathname) || pages[0];
  
  // Aktif olmayan sayfaları filtreliyoruz
  const inactivePages = pages.filter(page => page.path !== location.pathname);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-name">Hakan Dursun <span className="code-tag">{codeString}</span></div>
          <div className="navbar-divider"></div>
          <div className="navbar-active-page" data-longest-title={longestTitle}>{activePage.title}</div>
        </div>
        
        <div className="navbar-right">
          <ul className="navbar-menu">
            {inactivePages.map((page) => (
              <li key={page.path} className="navbar-item">
                <NavLink to={page.path}>
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
