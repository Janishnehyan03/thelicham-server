import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import Link from "next/link";
import React from "react";

function PostsTable({ posts }) {
  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                        className="h-4 text-blue-700"
                      />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/edit-post/${post.slug}`}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="h-4 text-blue-700"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostsTable;
