import AuthorListForm from "@/app/components/admin/AuthorList";
import Axios from "@/utils/Axios";
import React from "react";

const getAuthors=async()=>{
  try {
    let {data}=await Axios.get('/author')
    return data.data
  } catch (error) {
    console.log(error.response);
  }
}

async function page() {
  const authors=await getAuthors()
  return (
    <div>
      <AuthorListForm authors={authors} />
    </div>
  );
}

export default page;
