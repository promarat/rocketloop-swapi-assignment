import Header from '../components/Header';

const AppLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default AppLayout;
