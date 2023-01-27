import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import showReducer from './reducers/showReducer';
import mySaga from './sagas/shows';

const reducer = combineReducers({
  shows: showReducer,
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mySaga);

export type State = ReturnType<typeof reducer>;

export default store;

// 1. make space  in state for new data there are two way
//a. add new reducer(s)  and define state
//b. add keys to existing state in reducer(s)

// 2. define actions and action creators

// create mapDispatchToProps and accordingly add props to components.

// note->when mapDispatchProps use-> later saga will also con=me in picture

//3 dispatch actions

//4 add switch case for reducer

////after that step u cad do testing of redux action testing step

//5 add selectors

//6 mapStateToProps
