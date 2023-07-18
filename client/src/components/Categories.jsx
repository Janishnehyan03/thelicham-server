"use client";
import { useParams } from "next/navigation";
import { Anek_Malayalam } from "next/font/google";
import data from "@/public/dummydata.json";
import Axios from "@/utils/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const notoSansMalayalam = Anek_Malayalam({ subsets: ["latin"] });

async function Categories() {
  const params = useParams();
  const name = params.name;
  const getCategory = async () => {
    try {
      let { data } = await Axios.get(`/category/name/${name}`);
      return data;
    } catch (error) {
      console.log(error.response);
    }
  };
  const category = await getCategory();
  return (
    <div>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto  text-start lg:mb-16 mb-8">
            <h1 className="ml-2 font-bold text-red-700 text-2xl">
              {name.toUpperCase()} /{" "}
            </h1>
            <div className="flex flex-wrap">
              {category?.subCategories?.map((item, key) => (
                <Link href={`/category/${item?.name}`}>
                  <p
                    className="mx-2 font-bold hover:text-red-900 hover:cursor-pointer"
                    key={key}
                  >
                    {item.name} <span className="text-red-500">|</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {data.map((item, key) => (
              <article
                key={key}
                className="p-6 group hover:cursor-pointer bg-white rounded-lg border border-gray-200 shadow-md  "
              >
                <div className="flex  justify-between items-center mb-5 text-gray-500">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
                    <svg
                      className="mr-1 w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Tutorial
                  </span>
                  <span className="text-sm">14 days ago</span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-red-900 transition group-hover:text-red-400 ">
                  <a href="#" className={notoSansMalayalam.className}>
                    {item.title}
                  </a>
                </h2>
                <p className={notoSansMalayalam.className}>
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-7 h-7 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="Jese Leos avatar"
                    />
                    <span className="font-medium ">Jese Leos</span>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary-600  hover:underline"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
