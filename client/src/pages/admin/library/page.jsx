import ImageLibrary from "@/app/components/admin/ImageLibrary";
import React from "react";

export const metadata = {
  title: "Image Library | THELICHAM MONTHLY",
  description: "THELICHAM MONTHLY- DARUL HUDA ISLAMIC UNIVERSITY",
  keywords: "web development, web design, html, css",
};
function page() {
  return (
    <div>
      <ImageLibrary />
    </div>
  );
}

export default page;
