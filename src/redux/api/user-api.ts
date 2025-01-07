import { IUser, IUserForm } from "../../types";
import { api } from "./index";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], any>({
      query: () => "/users",
      providesTags: ["Blogs"],
    }),
    createUser: builder.mutation<IUser, IUserForm>({
      query: (body) => ({
        url: `/user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteUser: builder.mutation<IUser, any>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateUser: builder.mutation<IUser, { id: string; data: IUserForm }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
