import { createStore, combineReducers } from 'redux';

// Define initial state
const initialState = {
  newUser: {
    id: 0
  }
};

// Define reducers
const newUserReducer = (state = initialState.newUser, action) => {
  switch (action.type) {
    case 'NEW_USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Combine all reducers
const rootReducer = combineReducers({
  newUser: newUserReducer
});

// Create Redux store
const store = createStore(rootReducer);

export default store;
