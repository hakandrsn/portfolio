import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content" style={{ marginTop: '90px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
