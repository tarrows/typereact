import { combineReducers } from 'redux';
import notes from "./notes";


const typeApp = combineReducers({
  notes,
})

export default typeApp;
