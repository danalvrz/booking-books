import React, { useEffect, useState } from 'react';
import Header from './Header';
import store from '../redux/configureStore';

const ADD_BOOK = { type: 'ADD_BOOK', title: '', category: '' };
const REMOVE_BOOK = { type: 'REMOVE_BOOK', id: 0 };
const FETCH_BOOK = { type: 'FETCH_BOOK', payload: [] };

const baseUrl = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kHXXub8OPr6PqC5APwrM/books';

const deleteBook = (id) => async () => {
  store.dispatch({ ...REMOVE_BOOK, id });
  const response = await fetch(`${baseUrl}/item${id}`, {
    method: 'DELETE',
  });
  return response;
};

const addBook = (title, category, id) => async () => {
  const body = JSON.stringify({
    item_id: `item${id}`,
    title: `${title}`,
    category: `${category}`,
  });
  store.dispatch({
    ...ADD_BOOK, title, category, id,
  });
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  return response;
};

const eventRemoveBook = (id) => {
  store.dispatch(deleteBook(id));
};

const eventAddBook = (title, category, id) => {
  store.dispatch(addBook(title, category, id));
};

const Books = () => {
  let titleInput = '';
  let categoryInput = '';
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(baseUrl, { method: 'GET' })
        .then((response) => response.json()
          .then((data) => store.dispatch({ ...FETCH_BOOK, payload: { data } })));
      setBooks(store.getState().books);
    };
    fetchData();
  }, books);

  function BookList() {
    const list = [];
    store.getState().books.forEach((book) => list.push(
      <li key={book.id}>
        {book.title}
        <br />
        {book.author}
        <br />
        <button type="button" onClick={() => { eventRemoveBook(book.id); }}>Remove</button>
      </li>,
    ));
    return list;
  }

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
        <button type="button" onClick={() => { eventAddBook(titleInput.value, categoryInput.value, Math.floor(Math.random() * 10000)); titleInput.value = ''; }}>Add book</button>
      </section>
    </div>
  );
};

export default Books;
