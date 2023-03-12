import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import authSlice from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "auth",
    version: 1,
    storage,
    blacklist: [authApi.reducerPath],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
