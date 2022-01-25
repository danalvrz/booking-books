const booksInitialState = [];

const booksReducer = (state = booksInitialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, {
        title: action.title, author: 'Anonymous', id: Math.floor(Math.random() * 10000), progress: Math.floor(Math.random() * 100), currentChapter: Math.floor(Math.random() * 20), category: action.category,
      }];
    case 'REMOVE_BOOK':
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};

export default booksReducer;
