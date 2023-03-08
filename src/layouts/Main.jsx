import { Outlet } from 'react-router-dom';

import LoadingProvider from '../context/Loading';

import Header from '../components/Header';

const MainLayout = () => {
  return (
    <LoadingProvider>
      <div className="container px-20 pb-5">
        <Header />
        <Outlet />
      </div>
    </LoadingProvider>
  );
};

export default MainLayout;
