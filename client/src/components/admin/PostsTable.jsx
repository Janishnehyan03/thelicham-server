import { faEdit, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../utils/Axios";

function PostsTable() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

  const getPosts = async () => {
    try {
      let { data } = await Axios.get("/post");
      setPosts(data.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error.response);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  const deletePost = async (e, slug) => {
    if (window.confirm("Do you want to delete the post")) {
      e.preventDefault();
      try {
        let response = await Axios.delete(`/post/${slug}`);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  return (
    <div className="relative flex-1  rounded-lg">
      <button className="bg-gray-200  px-3 py-1 text-gray-900 m-3 rounded-lg">
        <Link to={"/create-post"}>Create New Post</Link>
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full m-4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {posts?.length > 0 &&
              posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {post?.title.substring(0, 35)}...
                    </th>
                    <td className="px-6 py-4">{post?.author?.name}</td>
                    <td className="px-6 py-4">
                      {moment(post.createdAt).format("DD/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      {post.categories.map((item, ind) => (
                        <p
                          key={ind}
                          className="bg-gray-600 text-white text-center p-2 rounded-[20px] m-2"
                        >
                          {item.name}
                        </p>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <a target="_blank" href={`/posts/${post.slug}`}>
                        <FontAwesomeIcon
                          icon={faEye}
                          className="h-4 cursor-pointer text-gray-100"
                        />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/edit-post/${post.slug}`}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="h-4 cursor-pointer text-blue-700"
                        />
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={(e) => deletePost(e, post.slug)}
                        className="h-4 cursor-pointer text-red-600"
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PostsTable;
