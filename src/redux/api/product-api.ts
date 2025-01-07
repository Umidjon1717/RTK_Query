import { api } from "./index"

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts:builder.query<any, string>({
        query:()=>'/product'
    })
  }),
  overrideExisting:false
})


export const { useGetProductsQuery } = productApi