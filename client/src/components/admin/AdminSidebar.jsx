"use client";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faPen,
  faPowerOff,
  faTableList,
  faTools,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

async function AdminSidebar({ children }) {
  const path = usePathname();
  const isLinkActive = (href) => {
    return path === href;
  };

  return (
    <div className="bg-gray-200">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                className={`flex items-center p-2 text-gray-900 group rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isLinkActive("/") ? "bg-white" : ""
                }`}
              >
                <FontAwesomeIcon className="h-6" icon={faHome} />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard"
                className={`flex items-center p-2 text-gray-900 group rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isLinkActive("/admin/dashboard") ? "bg-white" : ""
                }`}
              >
                <div
                  className={` ${
                    isLinkActive("/admin/dashboard") ? "text-black group-hover:text-white" : ""
                  }`}
                >
                  <FontAwesomeIcon className="h-6" icon={faTools} />
                  <span className="ml-3">Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/upload-post"
                className={`flex items-center p-2 text-gray-900 group rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isLinkActive("/admin/upload-post") ? "bg-white" : ""
                }`}
              >
                <div
                  className={` ${
                    isLinkActive("/admin/upload-post") ? "text-black group-hover:text-white" : ""
                  }`}
                >
                  <FontAwesomeIcon className="h-6" icon={faPen} />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    New Post
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/category"
                className={`flex items-center p-2 text-gray-900 group rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isLinkActive("/admin/category") ? "bg-white" : ""
                }`}
              >
                <div
                  className={` ${
                    isLinkActive("/admin/category") ? "text-black group-hover:text-white" : ""
                  }`}
                >
                  <FontAwesomeIcon className="h-6" icon={faTableList} />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Categories
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/author"
                className={`flex items-center p-2 text-gray-900 group rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isLinkActive("/admin/author") ? "bg-white" : ""
                }`}
              >
                <div
                  className={` ${
                    isLinkActive("/admin/author") ? "text-black group-hover:text-white" : ""
                  }`}
                >
                  <FontAwesomeIcon className="h-6" icon={faUser} />

                  <span className="flex-1 ml-3 whitespace-nowrap">Authors</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/library"
                className={`flex items-center p-2 text-gray-900 group rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isLinkActive("/admin/library") ? "bg-white" : ""
                }`}
              >
                <div
                  className={` ${
                    isLinkActive("/admin/library") ? "text-black group-hover:text-white" : ""
                  }`}
                >
                  <FontAwesomeIcon className="h-6" icon={faImage} />

                  <span className="flex-1 ml-3 whitespace-nowrap">Library</span>
                </div>
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className={`flex items-center p-2 text-red-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isLinkActive("#") ? "bg-white" : ""
                }`}
              >
                <FontAwesomeIcon className="h-6" icon={faPowerOff} />

                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 ml-40">{children}</div>
    </div>
  );
}

export default AdminSidebar;
