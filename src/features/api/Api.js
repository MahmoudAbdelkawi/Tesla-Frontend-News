import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://newsapi.org/v2'}),
    endpoints: (builder) => ({
        getAllData : builder.query({
            query: () => '/everything?q=tesla&apiKey=71603a87269c451b8ce7706ea41037f1',
        }),
        getLatestData : builder.query({
            query: () => `/everything?q=tesla&sortBy=publishedAt&apiKey=71603a87269c451b8ce7706ea41037f1`,
        }),
        
        
    }),
});    


export const {useGetAllDataQuery , useGetLatestDataQuery  } = apiSlice;