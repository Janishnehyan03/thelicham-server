"use client";

import { Anek_Malayalam } from "next/font/google";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import data from "@/public/dummydata.json";
import Image from "next/image";

const notoSansMalayalam = Anek_Malayalam({ subsets: ["latin"] });
function Slider() {
  return (
    <section className="bg-white my-10">
      <Swiper
        spaceBetween={50}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {data.map((item, key) => (
          <SwiperSlide key={key}>
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 2xl:py-16 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1
                  className={`${notoSansMalayalam.className} text-red-900`}
                  style={{ fontWeight: "bold", fontSize: 30, marginBottom: 3 }}
                >
                  {item.title}
                </h1>
                <p className={notoSansMalayalam.className+ ' text-sm 2xl:text-base'}>
                  അതിനുള്ള ഒരു മാർഗം Black is Myself ന്റെ രചനയെ ഒരു ആത്മ രചനയുടെ
                  മാതൃകയാക്കുകയാണ്.“Haino’s approach is eclectic, borrowing
                  techniques from everything from Noh theater to Troubadour
                  singing.” ഹൈനോവിന്റെ സമീപനം എടുക്കാവുന്നതൊക്കെ വിവിധ
                  സ്രോതസ്സുകളിൽ നിന്നും എടുക്കുക എന്നതാണ് – ജപ്പാനീസ്
                  തിയേറ്ററിന്റെയും ഫ്രാൻസിലെ നാടോടി ഗായക സംഘത്തിന്റെയും സ്വാധീനം
                  അതിൽക്കാണാം. അവതാരകനിൽ അതെന്ത് മാറ്റമാണുണ്ടാക്കുക. “individual
                  performer is dissolved into a meshwork of tones – voice,
                  space, and instrument variously existing in consonance and
                  dissonance with each other. ” സ്വരങ്ങളുടെ ഒരു
                  വലക്കണ്ണിയിലേക്ക് അയാൾ ലയിച്ചു ചേരും -ശബ്ദം, സ്ഥലം, അടുത്തും
                  അകന്നും പ്രതിപ്രവർത്തിക്കുന്ന വാദ്യോപകരണങ്ങളുടെ മേളം.
                </p>
              </div>
              <div className="lg:mt-0 lg:col-span-5 lg:flex">
                <Image
                  height={400}
                  width={400}
                  className="rounded-[10px] ml-7"
                  src={item.image}
                  alt="mockup"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Slider;
