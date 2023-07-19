import Axios from "../../utils/Axios";
import PostTable from "../../components/admin/PostsTable";
import { useEffect, useState } from "react";

function DashBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

  const getPosts = async () => {
    try {
      let { data } = await Axios.get("/post");
      console.log(data);
      setPosts(data.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error.response);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="p-6">
      {loading ? (
        <p>Loading...</p> // Show loading message or spinner while fetching data
      ) : (
        <PostTable posts={posts} />
      )}
    </main>
  );
}

export default DashBoard;
