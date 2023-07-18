"use client";
import Axios from "@/utils/Axios";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function ImageLibrary() {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [modelShow, setModelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [imagesData, setImagesData] = useState([]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    const uploadPromises = files.map((file) => {
      return setFileToBase(file);
    });

    Promise.all(uploadPromises)
      .then((uploadedImages) => {
        setImagesData(uploadedImages);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const setFileToBase = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const formData = new FormData();
    // formData.append("images", thumbnails);
    try {
      let response = await Axios.post("/image/upload", { images: imagesData });
      setModelShow(false);
      getImages()
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;

    const imagePreviews = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePreviews)
      .then((results) => {
        setPreviewImages(results);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const handleCopyLink = (link, index) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
  };

  const getImages = async () => {
    try {
      let { data } = await Axios.get("/image");
      setImages(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <h1 className="text-center font-bold text-red-900 text-2xl my-3">
        Image Gallery
      </h1>
      <div className="text-center ">
        <button
          onClick={() => setModelShow(true)}
          className="text-center bg-green-500 px-3 py-1 rounded text-white font-semibold hover:bg-green-700 transition "
        >
          Upload
        </button>
      </div>
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {modelShow && (
          <div className="relative p-4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="col-span-full">
              <label className="block text-sm font-medium uppercase my-3 leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {previewImages.length > 0 && (
                    <>
                      {previewImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Preview ${index + 1}`}
                          style={{
                            maxWidth: "100%",
                            marginTop: "10px",
                            width: 500,
                            height: 300,
                          }}
                        />
                      ))}
                    </>
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={(e) => {
                          handleImage(e);
                          handleImageChange(e);
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {loading ? (
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Processing...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Create
                </button>
              )}
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={()=>setModelShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {images.length > 0 ? (
          images.map((item, index) => (
            <div
              style={{
                background: `url(${item.url})`,
                backgroundSize: "cover",
              }}
              className="group h-64 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-5">
                <button
                  className={`bg-gray-800 hidden transition hover:cursor-pointer group-hover:flex text-white rounded-full p-2 hover:bg-gray-600 ${
                    copiedIndex === index ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleCopyLink(item.url, index)}
                  disabled={copiedIndex === index}
                >
                  {copiedIndex === index ? "Copied" : "COPY"}{" "}
                  <FontAwesomeIcon icon={faCopy} className="ml-3" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            role="status"
            className="flex-1 h-screen items-center text-red-600 justify-center flex"
          >
            <FontAwesomeIcon
              icon={faCircle}
              className="animate-spin h-4 mr-2"
            />
            <p>loading...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ImageLibrary;
