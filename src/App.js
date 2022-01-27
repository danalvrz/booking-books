import './App.css';
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import Categories from './components/Categories';
import store from './redux/configureStore';

const FETCH_BOOK = { type: 'FETCH_BOOK', payload: [] };

const baseUrl = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kHXXub8OPr6PqC5APwrM/books';

function App() {
  useEffect(() => {
    const fetchData = () => {
      fetch(baseUrl, { method: 'GET' })
        .then((response) => response.json()
          .then((data) => store.dispatch({ ...FETCH_BOOK, payload: { data } })));
    };
    fetchData();
  }, []);
  return (

    <div className="App">
      <section className="App-bod">
        <Router>
          <Routes>
            <Route exact path="/" element={<Books />} />
            <Route path="/Categories" element={<Categories />} />
          </Routes>
        </Router>
      </section>
    </div>

  );
}

export default App;
