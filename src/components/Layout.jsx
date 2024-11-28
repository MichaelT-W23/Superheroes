import NavBar from './NavBar.jsx';

const Layout = ({ children }) => {

  return (
    <>
      <NavBar />
      
      {children}
    </>
  );
};

export default Layout;