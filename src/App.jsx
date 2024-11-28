import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../src/components/Layout.jsx';

const App = () => {
  return (
    <Router basename="/Superheroes">
      <Layout>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Layout>
    </Router>
  );
};

export default App;
