import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({

    reducerPath: 'albums89',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:3005',
        fetchFn: async (...args) => { 
            //remove for production code
            await pause(1500); 
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    // return [{type: 'Album', id: album.userId }];
                    return [{ type: 'Album' , id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    };
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) =>{
                    // return [{type: 'Album', id: user.id }]
                    return [{ type: 'UserOfAlbums' , id: user.id }];
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    };
                }
            }),
            fetchAlbums: builder.query({ //this line could be either builder.query or builder.mutation. The name fetchAlbums allows us to use the specific albumsApi.useFetchAlbumsQuery()
                providesTags: (result, error, user) => { //the third arg argument is whatever you've passed to your hook
                    // return [{type: 'Album', id: user.id}]
                    const tags = result.map(album => {
                        return { type: 'Album', id: album.id }
                    });
                    tags.push({ type: 'UserOfAlbums', id: user.id });
                    return tags;
                },
                query: (user) => {
                    return {
                        url: '/albums', //this is the path
                        params: {
                            userId: user.id, //takes the user.id object and uses it as a key
                        },
                        method: 'GET' //method for the request is a get
                    };
                }
            })
        };
    }

});

// export const  { useFetchAlbumsQuery } = albumsApi;
export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
