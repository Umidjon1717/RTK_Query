import { FormEvent, useState } from "react";
import { useGetBlogsQuery } from "../redux/api/blog-api";
import { IUser, IUserForm } from "../types";
import { useCreateUserMutation, useDeleteUserMutation } from "../redux/api/user-api";

const Home = () => {
  const { data: blogs, isLoading, isError } = useGetBlogsQuery({});
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [createBlog, { isLoading: isCreating }] = useCreateUserMutation();

  const [error, setError] = useState<string | null>(null);

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
    } catch (err) {
      setError("Failed to delete the blog. Please try again.");
    }
  };

  const handleCreateBlog = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: IUserForm = Object.fromEntries(formData) as unknown as IUserForm;

    try {
      await createBlog(data).unwrap();
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Failed to create the blog. Please try again.");
    }
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading blogs...</p>;
  if (isError) return <p className="text-center text-red-600">Failed to load blogs. Please refresh the page.</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Blog Management</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Create Blog Form */}
      <form
        onSubmit={handleCreateBlog}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mb-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create a New Blog</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isCreating}
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-gray-300"
        >
          {isCreating ? "Creating..." : "Create Blog"}
        </button>
      </form>

      <hr className="my-6" />

      {/* Blog List */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Blogs</h2>
      {blogs?.length ? (
        <div className="space-y-6">
          {blogs.map((blog: IUser) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
            >
              <h3 className="text-xl font-semibold text-gray-800">{blog.name}</h3>
              <p className="text-gray-600">Age: {blog.age}</p>
              <p className="text-gray-600">Gender: {blog.gender}</p>
              <p className="text-gray-600">Profession: {blog.profession}</p>
              <button
                onClick={() => handleDeleteBlog(blog.id)}
                disabled={isDeleting}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-gray-300"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs available.</p>
      )}
    </div>
  );
};

export default Home;
