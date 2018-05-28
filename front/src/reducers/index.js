import { combineReducers } from 'redux';
import notes from "./notes";
import auth from "./auth";


const typeApp = combineReducers({
  notes, auth,
})

export default typeApp;
