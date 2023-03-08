import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoadingContext } from '../context/Loading';

const Header = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <header className="py-4 mb-4 border-b-2 flex justify-between items-center px-4">
      <Link className="logo font-bold text-blue-600" to="/">
        Podcaster
      </Link>
      {isLoading ? (
        <div className="header-loading w-4 h-4 border-r-2 border-blue-900 rounded-full animate-spin"></div>
      ) : null}
    </header>
  );
};

export default Header;
