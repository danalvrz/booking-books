import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import Categories from './components/Categories';

function App() {
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
