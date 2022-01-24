import React from 'react';
import Header from './Header';

const mockBook = {title: 'The Artist In The Machine', author: 'Arthur I. Miller', id: 0, progress: 50, currentChapter: 5, category: 'non-fiction'};
const BookList = () => {
  return (
<li>{mockBook.title}<br></br>{mockBook.author}<br></br><button type='button'>Remove</button></li>
  );

};
const Books = () => (
  <div>
    <Header />
    <section className="homeContainer">
      <h2 className="homeTitle">Books!</h2>
      <ul>
        <BookList />
      </ul>
      <input type="text" placeholder="Book title"></input>
      <select name="cars" id="cars">
        <option value="horror">Horror</option>
        <option value="scifi">Sci-Fi</option>
        <option value="fantasy">Fantasy</option>
        <option value="non-fiction">Non-fiction</option>
      </select>
      <button type="button">Add book</button>
    </section>
  </div>
);

export default Books;
