import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="container px-20 pb-5">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
