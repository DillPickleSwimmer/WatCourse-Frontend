import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from '../reducers';
import rootSaga from '../sagas'; 
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

// Returns the store instance
// It can also take initialState argument when provided
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware(); 
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store = {
        ...createStore(
            persistedReducer, 
            composeEnhancers(applyMiddleware(sagaMiddleware), applyMiddleware(thunk))
        ),
        runSaga: sagaMiddleware.run(rootSaga)
    };
    let persistor = persistStore(store);
    return { store, persistor };
};

export default configureStore;