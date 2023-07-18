import data from "@/public/dummydata.json";
import Axios from "@/utils/Axios";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faPen, faTimeline, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Noto_Serif_Malayalam } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PostContent from "../PostContent";

const notoSansMalayalam = Noto_Serif_Malayalam({ subsets: ["latin"] });

// export async function generateMetadata({name}) {
//   return {
//     title: `${decodeURIComponent(name)} | Thelicham Monthly`,
//   };
// }
export async function generateMetadata({ params }) {
  // fetch data
  const { data } = await Axios.get(`/post/${params.name}`);

  return {
    title: `${data.data.post.title} | Thelicham Monthly`,
    description: data.data?.post?.description,
  };
}
async function getData(name) {
  try {
    const res = await Axios.get(`/post/${name}`);
    return res.data.data.post;
  } catch (error) {
    console.log(error.response);
  }
}
export default async function RepoPage({ params: { name } }) {
  const post = await getData(name);
  const wordsPerMinute = 200;

  // Calculate the number of words based on character count
  const wordCount = post.detailHtml.trim().split(/\s+/).length;

  // Calculate the reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return (
    <>
      <Head>
        <title>{post?.title} | Thelicham Monthly</title>
        <meta name="description" content={post.description} />
      </Head>
      <div>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white ">
          <article className="max-w-3xl px-6 py-24 mx-auto space-y-12  ">
            <div className="w-full  mx-auto space-y-4 text-center">
              <h1
                className={`text-4xl font-bold text-red-800 leading-tight md:text-5xl ${notoSansMalayalam.className}`}
              >
                {post?.title}
              </h1>
              <Image
                // src={"https://res.cloudinary.com/df690pfy3/image/upload/v1687671789/iimxlibprzn8nqj6masi.jpg"}
                src={post?.thumbnail}
                alt={post.title}
                className="w-full rounded-[20px]"
                height={400}
                width={400}
              />
              <div className="flex justify-center flex-1 text-center">
                {post.categories.map((item, key) => (
                  <Link key={key} href={`/category/${item.name}`}>
                    <p className="text-xs text-red-700 hover:text-red-300 font-semibold tracking-wider uppercase">
                      #{item?.name} |
                    </p>
                  </Link>
                ))}
              </div>
              <p className="text-sm ">
                <FontAwesomeIcon icon={faPen} className="text-gray-500 mr-2" />
                <a
                  rel="noopener noreferrer"
                  href="#"
                  target="_blank"
                  className="underline dark:text-violet-400"
                >
                  <span className="mr-3">{post.author?.name}</span>
                </a>
              </p>
              <div className="flex justify-around">
                <p>
                  <FontAwesomeIcon icon={faCalendar} className="h-4 " />{" "}
                  {moment(post.createdAt).format("DD MMM YYYY")}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} className="h-4" />{" "}
                  {readingTimeMinutes} Mins Read{" "}
                </p>
              </div>
            </div>

            <div className={notoSansMalayalam.className}>
              <PostContent details={post.detailHtml} />
            </div>
            <div>
              <div className="flex flex-col items-center justify-center">
                <img
                  style={{ borderRadius: "9999px" }}
                  className=" w-20   rounded-full"
                  src={post.author.image}
                  alt=""
                />

                <h4
                  className={`${notoSansMalayalam.className} text-lg font-semibold`}
                >
                  {post.author.name}
                </h4>
              </div>
              <div className="flex justify-center pt-4 space-x-4 align-center">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="GitHub"
                  className="p-2 rounded-md  hover:dark:text-violet-400"
                >
                  <img
                    src="/social-media/github.svg"
                    alt="GitHub"
                    className="w-4 h-4 fill-current"
                  />
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Dribble"
                  className="p-2 rounded-md  hover:dark:text-violet-400"
                >
                  <img
                    src="/social-media/dribble.svg"
                    alt="Dribble"
                    className="w-4 h-4 fill-current"
                  />
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-md  hover:dark:text-violet-400"
                >
                  <img
                    src="/social-media/twitter.svg"
                    alt="Twitter"
                    className="w-4 h-4 fill-current"
                  />
                </a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label="Email"
                  className="p-2 rounded-md  hover:dark:text-violet-400"
                >
                  <img
                    src="/social-media/email.svg"
                    alt="Email"
                    className="w-4 h-4 fill-current"
                  />
                </a>
              </div>
            </div>
          </article>
        </main>
        <aside
          aria-label="Related articles"
          className="py-8 lg:py-24 bg-gray-50 "
        >
          <div className="px-4 mx-auto max-w-screen-xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 ">
              Related articles
            </h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {data.map((item, key) => (
                <article key={key} className="max-w-xs">
                  <a href="#">
                    <img
                      src={item.image}
                      className="mb-5 rounded-lg"
                      alt="Image 1"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 ">
                    <a href="#" className={notoSansMalayalam.className}>
                      {item.title}
                    </a>
                  </h2>
                  <p className="mb-4 font-light text-gray-500 ">
                    {item.author}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
