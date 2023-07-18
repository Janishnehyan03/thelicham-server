import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EditCategory from "./EditCategory";

function CategoryTable({ categories, getCategories }) {
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openEditPopup = (category) => {
    setSelectedCategory(category);
    setEditPopupVisible(true);
  };

  const closeEditPopup = () => {
    setEditPopupVisible(false);
  };

  return (
    <div className="relative overflow-x-auto rounded-lg">
      {editPopupVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <EditCategory
            selectedCategory={selectedCategory}
            subCategories={selectedCategory.subCategories}
            onClose={closeEditPopup}
          />
        </div>
      )}

      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Created
            </th> */}
            <th scope="col" className="px-6 py-3">
              Sub Categories
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
          {categories?.length > 0 &&
            categories?.map((category, index) => (
              <tr key={index} className="bg-white border-2">
                <th
                  scope="row"
                  className="px-6 py-4  "
                >
                  <p className="font-medium text-gray-900"> {category?.name}</p>
                </th>
                {/* <td className="px-6 py-4">
                  {moment(category.createdAt).format("DD/MM/yyyy")}
                </td> */}
                <td className="px-6 py-4">
                  <div className="grid grid-cols-3">
                    {category?.subCategories.map((item, ind) => (
                      <p
                        key={ind}
                        className="bg-gray-300 my-2 text-center text-gray-800 shadow-lg text-primary-800 text-xs font-medium  items-center px-2 mr-2 py-2 rounded-[20px]"
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="h-4 text-blue-700 cursor-pointer"
                    onClick={() => openEditPopup(category)}
                  />
                </td>
                <td className="px-6 py-4">
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="h-4 text-red-700"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
