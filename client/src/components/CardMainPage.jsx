import { Anek_Malayalam } from "next/font/google";

import Axios from "@/utils/Axios";
import Link from "next/link";
const notoSansMalayalam = Anek_Malayalam({ subsets: ["latin"] });

async function getData(name) {
  try {
    const res = await Axios.get(`/post/category/${name}`);
    return res.data.posts;
  } catch (error) {
    console.log(error.response);
  }
}
async function CardMainPage({ name }) {
  const posts = await getData(name);

  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 uppercase text-3xl lg:text-4xl tracking-tight font-extrabold hover:text-black text-red-900 ">
            {name}
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {posts?.length > 0 &&
            posts.map((item, key) => (
              <div
                key={key}
                className="max-w-sm bg-white border hover:bg-gray-100 group border-gray-200 rounded-lg shadow  "
              >
                <Link href={`/posts/${item.slug}`}>
                  <img
                    className="rounded-t-lg"
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      height: "200px",
                      width: "100%",
                    }}
                  />
                </Link>

                <div className="p-5">
                  <Link href={`/posts/${item.slug}`}>
                    <h5
                      className={`${notoSansMalayalam.className} font-bold mb-2 transition group-hover:text-red-500 text-red-800`}
                    >
                      {item.title.substring(0, 50)} ...
                    </h5>
                  </Link>
                  <p className={notoSansMalayalam.className}>
                    {item.description?.substring(0, 150)}...
                  </p>
                  <div className="flex mt-3 items-center">
                    <img src={item.author?.image} className="h-7 mr-2 rounded-full" alt="" />
                    <p
                      className={`${notoSansMalayalam.className} font-semibold text-gray-400`}
                    >
                      {item.author.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default CardMainPage;
