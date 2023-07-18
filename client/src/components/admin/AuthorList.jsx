"use client";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function AuthorList({ authors }) {
  return (
    <div className="relative overflow-x-auto rounded-lg m-4">
      <Link
        href={`/admin/author/add`}
        className="inline-flex w-full mb-4 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
      >
        Create New
      </Link>
      <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Email
            </th> */}
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Joined
            </th> */}
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {authors?.length > 0 &&
            authors.map((author, index) => (
              <tr key={index} className="bg-white dark:bg-gray-800">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img src={author?.image} className="h-20 w-20 rounded-full" alt={author.name} />
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {author.name}
                </td>
                {/* <td className="px-6 py-4">{author.email}</td> */}
                <td className="px-6 py-4">{author.username}</td>
                {/* <td className="px-6 py-4">
                  {moment(author.joined).format("DD/MM/yyyy")}
                </td> */}
                <td className="px-6 py-4">
                  <Link href={`/edit-author/${author.id}`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="h-4 text-blue-700 cursor-pointer"
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

export default AuthorList;
