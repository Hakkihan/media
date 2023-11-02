import { configureStore } from "@reduxjs/toolkit";
import { usersReducer2 } from "./slices/usersSlice";
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from "./apis/photosApi";


export const store = configureStore({
    reducer: {
        users35: usersReducer2,
         [albumsApi.reducerPath] : albumsApi.reducer, // equivalent to albums89: albumsApi.reducer, 
         [photosApi.reducerPath] : photosApi.reducer
    },
    middleware: (getDefaultMiddleware) => { //need to add this to get the api working nicely with the store
        return getDefaultMiddleware().concat(albumsApi.middleware).concat(photosApi.middleware); 
    }

});

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsApi';
export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } from './apis/photosApi';


