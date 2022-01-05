import update from 'immutability-helper';

const GENRE = 'bookster-react-umfst/filters/genre';
const AUTHOR = 'bookster-react-umfst/filters/author';
const PUBLISHER = 'bookster-react-umfst/filters/publisher';

const CURRENTGENRE = 'bookster-react-umfst/filters/currentGenre';
const CURRENTAUTHOR = 'bookster-react-umfst/filters/currentAuthor';
const CURRENTPUBLISHER = 'bookster-react-umfst/filters/currentPublisher';

const DEFAULTCURRENTFILTER =
  'bookster-react-umfst/filters/defaultCurrentFilter';

const DEFAULT = 'bookster-react-umfst/filters/default';

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
    case CURRENTGENRE:
      return update(state, {
        options: {
          genres: {
            [action.payload]: {
              value: { $set: !state.options.genres[action.payload].value },
            },
          },
        },
        currentFilters: {
          genres: {
            $push: !state.options.genres[action.payload].value
              ? [state.options.genres[action.payload].option]
              : [],
            $splice: !state.options.genres[action.payload].value
              ? [[0, 0]]
              : [
                  [
                    state.currentFilters.genres.findIndex(
                      (element) =>
                        element === state.options.genres[action.payload].option
                    ),
                    1,
                  ],
                ],
          },
        },
      });
    case CURRENTAUTHOR:
      return update(state, {
        options: {
          authors: {
            [action.payload]: {
              value: { $set: !state.options.authors[action.payload].value },
            },
          },
        },
        currentFilters: {
          authors: {
            $push: !state.options.authors[action.payload].value
              ? [state.options.authors[action.payload].option]
              : [],
            $splice: !state.options.authors[action.payload].value
              ? [[0, 0]]
              : [
                  [
                    state.currentFilters.authors.findIndex(
                      (element) =>
                        element === state.options.authors[action.payload].option
                    ),
                    1,
                  ],
                ],
          },
        },
      });
    case CURRENTPUBLISHER:
      return update(state, {
        options: {
          publisher: {
            [action.payload]: {
              value: { $set: !state.options.publisher[action.payload].value },
            },
          },
        },
        currentFilters: {
          publisher: {
            $push: !state.options.publisher[action.payload].value
              ? [state.options.publisher[action.payload].option]
              : [],
            $splice: !state.options.publisher[action.payload].value
              ? [[0, 0]]
              : [
                  [
                    state.currentFilters.publisher.findIndex(
                      (element) =>
                        element ===
                        state.options.publisher[action.payload].option
                    ),
                    1,
                  ],
                ],
          },
        },
      });
    case DEFAULTCURRENTFILTER:
      return update(state, {
        options: {
          genres: {
            $apply: (genres) =>
              genres.map((element) => {
                return { option: element.option, value: false };
              }),
          },
          authors: {
            $apply: (authors) =>
              authors.map((element) => {
                return { option: element.option, value: false };
              }),
          },
          publisher: {
            $apply: (publisher) =>
              publisher.map((element) => {
                return { option: element.option, value: false };
              }),
          },
        },
        currentFilters: {
          genres: { $set: [] },
          authors: { $set: [] },
          publisher: { $set: [] },
        },
      });
    case DEFAULT:
      return initialState;

    default:
      return state;
  }
}

export const setOptions = (data, type) => {
  return {
    type: type === 'AUTHOR' ? AUTHOR : type === 'GENRE' ? GENRE : PUBLISHER,
    payload: data.map((element) => {
      return { option: element, value: false };
    }),
  };
};

export const setFilters = (id, type) => {
  return {
    type:
      type === 'AUTHOR'
        ? CURRENTAUTHOR
        : type === 'GENRE'
        ? CURRENTGENRE
        : CURRENTPUBLISHER,
    payload: id,
  };
};
export const setDefault = () => {
  return {
    type: DEFAULTCURRENTFILTER,
  };
};
export const clearFilters = () => {
  return {
    type: DEFAULT,
  };
};
