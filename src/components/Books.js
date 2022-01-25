import React from 'react';
import Header from './Header';
import store from '../redux/configureStore';

const ADD_BOOK = { type: 'ADD_BOOK', title: '', category: '' };
const REMOVE_BOOK = { type: 'REMOVE_BOOK', id: 0 };

const BookList = () => {
  const list = [];
  store.getState().books.forEach((book) => list.push(
    <li key={book.id}>
      {book.title}
      <br />
      {book.author}
      <br />
      <button type="button" onClick={() => { store.dispatch({ ...REMOVE_BOOK, id: book.id }); }}>Remove</button>
    </li>,
  ));
  return list;
};

const Books = () => {
  let titleInput = '';
  let categoryInput = '';
  return (
    <div>
      <Header />
      <section className="homeContainer">
        <h2 className="homeTitle">Books!</h2>
        <ul>
          <BookList />
        </ul>
        <input
          type="text"
          placeholder="Book title"
          ref={(node) => {
            titleInput = node;
          }}
        />
        <select
          name="categories"
          id="categories"
          ref={(node) => {
            categoryInput = node;
          }}
        >
          <option value="horror">Horror</option>
          <option value="scifi">Sci-Fi</option>
          <option value="fantasy">Fantasy</option>
          <option value="non-fiction">Non-fiction</option>
        </select>
        <button type="button" onClick={() => { store.dispatch({ ...ADD_BOOK, title: titleInput.value, category: categoryInput.value }); titleInput.value = ''; }}>Add book</button>
      </section>
    </div>
  );
};

export default Books;
