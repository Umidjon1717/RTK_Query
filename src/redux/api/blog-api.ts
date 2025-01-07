import { api } from "."
import { IUser, IUserForm } from "../../types"

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs:builder.query<IUser[], any>({
        query:()=>'/user',
        providesTags:["Blogs"]
    }),
    deleteBlog:builder.mutation<IUser, string>({
        query:(id)=>({
            url:`/blogs/${id}`,
            method:"DELETE"
        }),
        invalidatesTags:["Blogs"]
    }),
    createBlog:builder.mutation<IUser, IUserForm>({
        query:(body)=>({
            url:`/blogs`,
            method:"POST",
            body
        }),
        invalidatesTags:["Blogs"]
    }),
    updateBlog:builder.mutation<IUser, any>({
        query:({id, body})=>({
            url:`/blogs/${id}`,
            method:"PUT",
            body
        }),
        invalidatesTags:["Blogs"]
    }),

  }),
  overrideExisting:false
})


export const { useGetBlogsQuery, useDeleteBlogMutation, useCreateBlogMutation } = blogApi