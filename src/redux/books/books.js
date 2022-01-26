const booksInitialState = [];
const nextState = [];

const booksReducer = (state = booksInitialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, {
        title: action.title,
        author: 'Anonymous',
        id: action.id,
        progress: Math.floor(Math.random() * 100),
        currentChapter: Math.floor(Math.random() * 20),
        category: action.category,
      }];
    case 'REMOVE_BOOK':
      return state.filter((book) => book.id !== action.id);
    case 'FETCH_BOOK':
      Object.entries(action.payload.data).forEach((item) => {
        const currentBook = {
          ...item[1][0],
          id: parseInt(item[0].replace('item', ''), 10),
          author: 'Anonymous',
          progress: Math.floor(Math.random() * 100),
          currentChapter: Math.floor(Math.random() * 20),
        };
        nextState.push(currentBook);
      });
      return nextState;
    default:
      return state;
  }
};

export default booksReducer;
