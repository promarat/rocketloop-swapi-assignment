import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home';
import Character from './pages/Character';
import NotFound from './pages/NotFound';
import { setFilms, setSpecies } from './store/actions/swActions';

import './App.css';

const App = (props) => {
  const { setFilms, setSpecies } = props;

  useEffect(() => {
    setFilms();
    setSpecies();
  }, [setFilms, setSpecies]);

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

const mapDispatchToProps = {
  setFilms,
  setSpecies,
}
export default connect(null, mapDispatchToProps)(App);

