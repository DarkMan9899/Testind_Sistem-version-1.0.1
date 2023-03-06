import { createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const initState = {
    isAuth: false,
    userType: null,
    firstName: null,
    lastName: null,
    token: null
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
        {
            state = {
                isAuth: action.auth,
                userType: action.userType,
                firstName: action.firstName,
                lastName: action.lastName,
                token: action.token
            };
            return state;
        }
        case 'LOGOUT':
        {
            state = {
                isAuth: false,
                userType: null,
                firstName: null,
                lastName: null,
                token: null
            };
            return state
        }
        default: return state;
    }
}

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage: storage,
        stateReconciler: hardSet
    }, reducer);

const Store = createStore(persistedReducer);
const Persistor = persistStore(Store);

export { Store, Persistor }
