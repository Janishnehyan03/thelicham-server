import Axios from "@/utils/Axios";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Anek_Malayalam } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonAnimation from "./Skelton";

const notoSansMalayalam = Anek_Malayalam({ subsets: ["latin"] });

async function getData() {
  try {
    const res = await Axios.get("/post");
    return res.data.data;
  } catch (error) {
    console.log(error.response);
  }
}

async function TopPosts() {
  // const [posts, setPosts] = useState([]);

  const posts = await getData();
  return (
    <div>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-red-900 hover:text-black ">
              Top Posts
            </h2>
          </div>
          {/* {loading && <SkeletonAnimation />} */}

          <div className="grid gap-8 lg:grid-cols-2">
            {posts.map((item, key) => (
              <article
                key={key}
                className="p-6 group hover:cursor-pointer bg-white rounded-lg border border-gray-200 shadow-md  "
              >
                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "20px",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    alt={item.title}
                    src={item.thumbnail}
                    width={10}
                    height={0}
                    style={{ width: "100%", height: 250, borderRadius: 8 }} // optional
                  />
                </div>
                <div className="flex  justify-between items-center mb-5 text-gray-500">
                  <div>
                    {item.categories.map((category, ind) => (
                      <span
                        key={ind}
                        className="bg-gray-300 text-primary-800 text-xs font-medium  items-center px-2 mr-2 py-1 rounded-[20px]"
                      >
                        #{category.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm">
                    {moment
                      .utc(item.createdAt)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-red-900 transition group-hover:text-red-400 ">
                  <Link
                    href={`/posts/${item.slug}`}
                    className={notoSansMalayalam.className}
                  >
                    {item.title}
                  </Link>
                </h2>

                <p className={notoSansMalayalam.className}>
                  {item.description?.substring(0, 200) +
                    (item.description && item.description.length > 200
                      ? "..."
                      : "")}
                </p>
                <div className="flex justify-between mt-3 items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={item.author?.image}
                      alt="Jese Leos avatar"
                    />
                    <span className={notoSansMalayalam.className}>
                      {item.author?.name}
                    </span>
                  </div>
                  <Link
                    href={`/posts/${item.slug}`}
                    className="inline-flex  items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Read more
                    <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopPosts;
