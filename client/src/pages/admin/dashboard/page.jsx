import PostsTable from "@/app/components/admin/PostsTable";
import Axios from "@/utils/Axios";

const getPosts = async () => {
  try {
    let { data } = await Axios.get("/post");
    return data.data;
  } catch (error) {
    console.log(error.response);
  }
};
async function page() {
  const posts = await getPosts();
  return (
    <main className="p-6">
      <PostsTable posts={posts} />
    </main>
  );
}

export default page;
