import { combineReducers } from 'redux';
import booksReducer from './books/books';
import categoriesReducer from './categories/categories';

const rootReducer = combineReducers({
    booksReducer: booksReducer,
    categorriesReducer: categoriesReducer,
});

export default rootReducer;
