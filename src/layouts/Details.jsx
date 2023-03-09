import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DetailsLayout = () => {
  return (
    <div className="flex gap-5 items-start">
      <>
        <Sidebar />
        <Outlet />
      </>
    </div>
  );
};

export default DetailsLayout;
