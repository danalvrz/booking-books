import React from 'react';
import Header from './Header';
import store from '../redux/configureStore';

const ADD_BOOK = { type: 'ADD_BOOK', title: '', category: '' };
const REMOVE_BOOK = { type: 'REMOVE_BOOK', id: 0 };

const baseUrl = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/kHXXub8OPr6PqC5APwrM/books';

document.body.classList.add('bg-slate-50');

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
  if (title !== '') {
    store.dispatch(addBook(title, category, id));
  }
};

const Books = () => {
  let titleInput = '';
  let categoryInput = '';

  function BookList() {
    const list = [];
    store.getState().books.forEach((book) => list.push(
      <li key={book.id} className="border rounded my-5 bg-white h-44 pl-7 pt-8 flex container">
        <section className="w-1/2">
          <span className="font-Montserrat font-bold text-slate-500">{book.category.charAt(0).toUpperCase() + book.category.slice(1)}</span>
          <br />
          <span className="font-Roboto font-bold text-black text-2xl mt-12 mb-0">{book.title.charAt(0).toUpperCase() + book.title.slice(1)}</span>
          <br />
          <span className="font-Roboto font-light text-base text-sky-600 mt-0 mb-10">{book.author}</span>
          <br />
          <button type="button" className="font-Roboto font-light text-base text-sky-600 mt-4">Comment</button>
          <span className="border-l-[1px] rounded my-5 mx-5" />
          <button type="button" onClick={() => { eventRemoveBook(book.id); }} className="font-Roboto font-light text-base text-sky-600 mt-0">Remove</button>
          <span className="border-l-[1px] rounded my-5 mx-5" />
          <button type="button" className="font-Roboto font-light text-base text-sky-600 mt-0">Edit</button>
        </section>
        <section className="container flex w-7/12 mr-10">

          <div className="container w-1/3 mt-3">
            <svg className="w-full h-25 mr-0">
              <circle
                className="text-gray-300"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
                r="35"
                cx="45"
                cy="45"
              />
              <circle
                className="text-sky-600"
                strokeWidth="5"
                strokeLinecap="round"
                stroke="currentColor"
                strokeDasharray={`${book.progress * 2.1}, 220`}
                fill="transparent"
                r="35"
                cx="45"
                cy="45"
              />
            </svg>
          </div>
          <div className="mt-7">
            <div className="container font-Montserrat font-norma text-3xl">
              {book.progress}
              %
              <p className="container font-Montserrat font-norma text-sm text-slate-400 m-0 h-1">
                Completed
              </p>
            </div>
          </div>

          <span className="border-l-[1px] rounded my-5 mx-16" />
          <div className="container w-full">
            <p className="font-Roboto text-slate-400 text-sm">CURRENT CHAPTER</p>
            <p className="font-Roboto text-black text-base mt-2">
              Chapter
              {' '}
              {book.currentChapter}
            </p>
            <button
              className="border font-Roboto rounded  h-8 bg-sky-600 text-white text-xs font-light px-5 tracking-[.15em] w-7/12 mt-7"
              type="button"
            >
              UPDATE PROGRESS

            </button>
          </div>
        </section>
      </li>,
    ));
    return list;
  }

  return (
    <div>
      <Header />
      <section className="homeContainer container">
        <ul id="fullListContainer" className="w-full ml-20">
          <BookList />
        </ul>
        <section className="addContainer container w-full ml-20 border-t pt-8 mt-10">
          <h2 className="homeTitle text-xl font-bold font-Montserrat text-slate-400 pb-4"> ADD NEW BOOK</h2>
          <input
            className="h-12 w-7/12 border rounded mr-6 pl-4"
            type="text"
            placeholder="Book title"
            ref={(node) => {
              titleInput = node;
            }}
          />
          <select
            className="h-12 w-2/12 border rounded mr-6 text-slate-400 px-4"
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
          <button
            className="border font-Roboto rounded  h-12 bg-sky-600 text-white text-xs font-bold px-5 tracking-[.15em] w-2/12"
            type="button"
            onClick={() => { eventAddBook(titleInput.value, categoryInput.value, Math.floor(Math.random() * 10000)); titleInput.value = ''; }}
          >
            ADD BOOK

          </button>
        </section>
      </section>
    </div>
  );
};

export default Books;
