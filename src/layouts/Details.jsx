import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingContext } from '../context/Loading';
import Sidebar from '../components/Sidebar';

const DetailsLayout = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <div className="flex gap-5 items-start">
      {isLoading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="header-loading w-10 h-10 border-r-2 border-blue-900 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <Sidebar />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default DetailsLayout;
