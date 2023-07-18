"use client";
import React, { useEffect, useState } from "react";
import Axios from "@/utils/Axios";

function EditCategory({ onClose, subCategories, selectedCategory }) {
  const [category, setCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");
  const [selectedCategoryToAdd, setSelectedCategoryToAdd] = useState("");

  const getCategory = async () => {
    try {
      const { data } = await Axios.get(`/category/${selectedCategory._id}`);
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await Axios.get("/category");
      console.log(data);
      setCategories(data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCategoryNameChange = (event) => {
    setCategory((prevCategory) => ({
      ...prevCategory,
      name: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const subCategoryIds = category.subCategories.map(
        (subCategory) => subCategory._id
      );

      const response = await Axios.patch(`/category/${category._id}`, {
        name: category.name,
        subcategoryIds: subCategoryIds,
      });

      console.log("Category updated:", response.data);

      onClose();
    } catch (error) {
      console.log(error.response);
      console.error("Error updating category:", error);
    }
  };

  const handleAddSubCategory = async () => {
    if (newSubCategory.trim() === "") {
      return;
    }

    const subCategory = {
      _id: Date.now().toString(),
      name: newSubCategory,
      category: selectedCategoryToAdd,
    };

    setCategory((prevCategory) => ({
      ...prevCategory,
      subCategories: [...prevCategory.subCategories, subCategory],
    }));

    setNewSubCategory("");
    await Axios.post("/category", { name: newSubCategory });
    getCategories();
  };

  useEffect(() => {
    getCategory();
    getCategories();
  }, []);

  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category Name:
          </label>
          <input
            id="categoryName"
            type="text"
            value={category?.name}
            onChange={handleCategoryNameChange}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-center font-bold uppercase mt-2">Sub Categories</p>
          <div className="grid grid-cols-3 gap-2">
            {category &&
              category.subCategories.map((item, key) => (
                <p
                  className="bg-gray-200 p-2 my-1 rounded-full text-center cursor-pointer"
                  key={key}
                  onClick={() => handleSubCategoryClick(item)}
                >
                  {item.name}
                </p>
              ))}
          </div>
          <div className="flex items-center mt-2">
            <select
              value={selectedCategoryToAdd}
              onChange={(e) => setSelectedCategoryToAdd(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories?.length > 0 &&
                categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <input
              type="text"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New Subcategory"
            />
            <button
              type="button"
              onClick={handleAddSubCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
