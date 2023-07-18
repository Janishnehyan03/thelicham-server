import data from "@/public/dummydata.json";
import { Anek_Malayalam } from "next/font/google";
import Image from "next/image";

const notoSansMalayalam = Anek_Malayalam({ subsets: ["latin"] });

function Cover() {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold hover:text-black text-red-900">
            Cover
          </h2>
        </div>

        <div className="content flex items-center">
          <Image
            src={"/cover.jpg"}
            width={"350"}
            style={{ borderRadius: 10 }}
            height={"276"}
          />

          <div className="sections  flex flex-wrap ml-4">
            <article  className="max-w-2xl p-1 mx-3 bg-gray-100 rounded-lg flex items-center mb-4">
              <a href="#">
                <div
                  className="img h-32 w-32 rounded-lg"
                  style={{
                    background: `url(https://images.unsplash.com/photo-1682687981974-c5ef2111640c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60)`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </a>
              <div className="details ml-4">
                <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900">
                  <a href="#" className={notoSansMalayalam.className}>
                    ഔലിയാപ്പേടി: ഭീതിയുടെ ഖുർആനിക തത്വവിചാരങ്ങൾ
                  </a>
                </h2>
                <p className="font-light text-gray-500">ഷമീർ കെ.എസ്</p>
              </div>
            </article>

            {data.slice(0, 4).map((item, key) => (
              <article key={key} className="max-w-xs p-1 bg-gray-100 mx-3 rounded-lg flex items-center mb-4">
                <a href="#">
                  <div
                    className="img h-32 w-32 rounded-lg"
                    style={{
                      background: `url(${item.image})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </a>
                <div className="details ml-4">
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900">
                    <a href="#" className={notoSansMalayalam.className}>
                      {item.title}
                    </a>
                  </h2>
                  <p className="font-light text-gray-500">{item.author}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cover;
