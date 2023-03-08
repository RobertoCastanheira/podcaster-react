import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DetailsLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default DetailsLayout;
