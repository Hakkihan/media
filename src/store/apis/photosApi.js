import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005/'        
    }),
    endpoints(builder) {
        return {            
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id }
                    });
                    tags.push({ type: 'AlbumOfPhotos' , id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method: 'GET',
                    };
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [ { type: 'AlbumOfPhotos', id: album.id }];
                },
                query: (album) => {
                    return {
                        method: 'POST',
                        url: '/photos' ,
                        body: {
                            albumId: album.id ,
                            url: faker.image.abstract(150, 150, true) //the true argument makes sure that the photo is always random
                        },
                        
                    };
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }];
                },
                query: (photo) => {
                    return {
                        method: 'DELETE',
                        url: `/photos/${photo.id}`
                    };
                }
            }),
        }
    },


});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;

export { photosApi };

