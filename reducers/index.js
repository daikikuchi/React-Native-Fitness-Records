import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions';

function entries(state = {}, action) {
  switch (action.type) {
    // I take all those entries and just add them to our current state.
    case RECEIVE_ENTRIES:
      return {
        ...state,
        ...action.entries
      };
    case ADD_ENTRY:
      return {
        ...state,
        ...action.entry
      };
    default:
      return state;
  }
}

export default entries;
