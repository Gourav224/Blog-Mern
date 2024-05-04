import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/conf.js";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);

  // useEffect(() => {
    
  // }, [status]);
  // const fetchPosts = async () => {
  //   try {
  //     const postsData = await appwriteService.getAllPost([]);
  //     if (postsData) {
  //       setPosts(postsData.documents);
  //     }
  //     else{
  //     setPosts([]);

  //     }
  //   } catch (error) {
  //     setPosts([]);
  //     console.error("Error fetching posts:", error);
  //   }
  // };
  // if (status) {
  //   fetchPosts();
  // } else {
  //   setPosts([]);
  // }
  // console.log(status)
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
}

export default AllPosts;
