import LOGO from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="h-[80px] relative flex items-center justify-center">
      <img src={LOGO} alt="" className="absolute left-4 top-4 h-[40px]" />
      <h1>Frontend coding assignment using Star Wars API</h1>
    </header>
  );
}

export default Header;
