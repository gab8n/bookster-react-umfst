const GENRE = 'bookster-react-umfst/filters/genre';
const AUTHOR = 'bookster-react-umfst/filters/author';
const PUBLISHER = 'bookster-react-umfst/filters/publisher';
const initialState = {
  options: {
    genres: [],
    authors: [],
    publisher: [],
  },
  currentFilters: {
    genres: [],
    authors: [],
    publisher: [],
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GENRE:
      return {
        ...state,
        options: {
          ...state.options,
          genres: action.payload,
        },
      };
    case AUTHOR:
      return {
        ...state,
        options: {
          ...state.options,
          authors: action.payload,
        },
      };
    case PUBLISHER:
      return {
        ...state,
        options: {
          ...state.options,
          publisher: action.payload,
        },
      };
    default:
      return state;
  }
}

export const setGenreOptions = (data) => {
  return {
    type: GENRE,
    payload: data.map((element) => {
      return { option: element, value: false };
    }),
  };
};
export const setAuthorOptions = (data) => {
  return {
    type: AUTHOR,
    payload: data.map((element) => {
      return { option: element, value: false };
    }),
  };
};

export const setPublisherOptions = (data) => {
  return {
    type: PUBLISHER,
    payload: data.map((element) => {
      return { option: element, value: false };
    }),
  };
};
