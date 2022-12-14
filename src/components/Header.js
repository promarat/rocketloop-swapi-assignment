import { Link } from 'react-router-dom';
import LOGO from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="h-[80px] relative flex items-center justify-center">
      <Link to="/">
        <img src={LOGO} alt="" className="absolute left-4 top-4 h-[40px]" />
      </Link>
      <h1 className="text-[2rem]">Star Wars API frontend assignment</h1>
    </header>
  );
}

export default Header;
