const booksInitialState = [];
let nextState = [];

const booksReducer = (state = booksInitialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, {
        title: action.title,
        author: 'Anonymous',
        id: action.id,
        progress: Math.ceil(Math.random() * 99),
        currentChapter: Math.ceil(Math.random() * 20),
        category: action.category,
      }];
    case 'REMOVE_BOOK':
      return state.filter((book) => book.id !== action.id);
    case 'FETCH_BOOK':
      nextState = [];
      Object.entries(action.payload.data).forEach((item) => {
        const currentBook = {
          ...item[1][0],
          id: parseInt(item[0].replace('item', ''), 10),
          author: 'Anonymous',
          progress: Math.ceil(Math.random() * 99),
          currentChapter: Math.ceil(Math.random() * 20),
        };
        nextState.push(currentBook);
      });
      return nextState;
    default:
      return state;
  }
};

export default booksReducer;
