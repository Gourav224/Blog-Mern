import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import AppwriteService from "../appwrite/conf";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [posts, setposts] = useState([]);
  const status = useSelector((state) => state.auth.status);

  // useEffect(() => {
  //   AppwriteService.getAllPost().then((posts) => {
  //     if (posts) {
  //       setposts(posts.documents);
  //     }
  //   });
  // }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {status
                  ? "Nothing to show here."
                  : "Please log in to view the posts"}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
