import { createStore, combineReducers } from 'redux';
import Reducer from './Redux/Reducer/Reducer';


const rootReducer = combineReducers(
{
     Moviereducer: Reducer,
     
   
}
);
const configureStore = () => {
return createStore(rootReducer);
}
export default configureStore;
